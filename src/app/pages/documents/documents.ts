// src/app/pages/documents/documents.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';
import { DocumentService, DocumentResponse } from '../../services/document.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">📄 My Documents</h2>
        <div>
          <!-- Hidden file input (triggered by button) -->
          <input
            type="file"
            accept=".pdf"
            #fileInput
            (change)="onFileSelected($event)"
            class="hidden"
          >
          <button
            (click)="fileInput.click()"
            [disabled]="isUploading"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 transition text-sm font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isUploading ? '⏳ Uploading...' : '+ Upload PDF' }}
          </button>
        </div>
      </div>

      <!-- Upload Error -->
      <div *ngIf="uploadError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
        <p class="text-red-600 text-sm">{{ uploadError }}</p>
        <button (click)="uploadError = ''" class="text-red-400 hover:text-red-600 text-sm">✕</button>
      </div>

      <!-- Upload Success -->
      <div *ngIf="uploadSuccess" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
        <p class="text-green-600 text-sm">{{ uploadSuccess }}</p>
        <button (click)="uploadSuccess = ''" class="text-green-400 hover:text-green-600 text-sm">✕</button>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="bg-white rounded-xl shadow-md p-8 text-center">
        <p class="text-gray-500">⏳ Loading documents...</p>
      </div>

      <!-- Load Error -->
      <div *ngIf="loadError" class="bg-white rounded-xl shadow-md p-8 text-center">
        <p class="text-4xl mb-4">⚠️</p>
        <p class="text-red-600 mb-4">{{ loadError }}</p>
        <button (click)="loadDocuments()"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
          Retry
        </button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && !loadError && documents.length === 0"
           class="bg-white rounded-xl shadow-md p-8 text-center">
        <p class="text-4xl mb-4">📭</p>
        <p class="text-gray-600">No documents yet. Upload your first PDF!</p>
      </div>

      <!-- Document List -->
      <div *ngIf="!isLoading && documents.length > 0" class="space-y-4">

        <div *ngFor="let doc of documents"
             class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

            <!-- Document Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 truncate">📄 {{ doc.title }}</h3>
              <p class="text-sm text-gray-500 mt-1 truncate">{{ doc.filename }}</p>

              <div class="flex flex-wrap items-center gap-3 mt-3">
                <!-- Status Badge -->
                <span [ngClass]="{
                  'bg-green-100 text-green-700': doc.status === 'ready',
                  'bg-yellow-100 text-yellow-700': doc.status === 'processing',
                  'bg-red-100 text-red-700': doc.status === 'error'
                }" class="px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ doc.status === 'ready' ? '✅ Ready' :
                     doc.status === 'processing' ? '⏳ Processing...' :
                     '❌ Error' }}
                </span>

                <span *ngIf="doc.chunk_count > 0" class="text-xs text-gray-400">
                  📦 {{ doc.chunk_count }} chunks
                </span>

                <span class="text-xs text-gray-400">
                  🕐 {{ doc.created_at | date:'short' }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 shrink-0">
              <a *ngIf="doc.status === 'ready'"
                 [routerLink]="['/chat', doc.id]"
                 class="px-4 py-2 bg-indigo-600 text-white rounded-lg
                        hover:bg-indigo-700 transition text-sm font-medium no-underline">
                💬 Chat
              </a>
              <span *ngIf="doc.status === 'processing'"
                    class="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed">
                💬 Chat
              </span>
              <button
                (click)="deleteDocument(doc)"
                class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm">
                🗑️
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  `,
  styles: []
})
export class DocumentsComponent implements OnInit, OnDestroy {

  documents: DocumentResponse[] = [];
  isLoading = true;
  isUploading = false;
  loadError = '';
  uploadError = '';
  uploadSuccess = '';

  private pollSub?: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  // ---- Load all documents ----
  loadDocuments(): void {
    this.isLoading = true;
    this.loadError = '';

    this.documentService.list().subscribe({
      next: (res) => {
        this.documents = res.documents;
        this.isLoading = false;
        this.startPollingIfNeeded();
      },
      error: (err) => {
        this.loadError = err.error?.detail || 'Failed to load documents.';
        this.isLoading = false;
      }
    });
  }

  // ---- Upload PDF ----
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Validate PDF
    if (file.type !== 'application/pdf') {
      this.uploadError = 'Please select a PDF file.';
      input.value = '';
      return;
    }

    this.uploadError = '';
    this.uploadSuccess = '';
    this.isUploading = true;

    this.documentService.upload(file).subscribe({
      next: (doc) => {
        this.uploadSuccess = `"${doc.title}" uploaded successfully! Processing...`;
        this.isUploading = false;
        input.value = '';         // Reset file input
        this.loadDocuments();     // Refresh list
      },
      error: (err) => {
        this.uploadError = err.error?.detail || 'Upload failed. Please try again.';
        this.isUploading = false;
        input.value = '';
      }
    });
  }

  // ---- Delete document ----
  deleteDocument(doc: DocumentResponse): void {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;

    this.documentService.delete(doc.id).subscribe({
      next: () => {
        this.documents = this.documents.filter(d => d.id !== doc.id);
      },
      error: (err) => {
        alert(err.error?.detail || 'Failed to delete document.');
      }
    });
  }

  // ---- Poll for processing documents ----
  // Checks every 5 seconds if any "processing" docs became "ready"
  private startPollingIfNeeded(): void {
    this.pollSub?.unsubscribe();

    const hasProcessing = this.documents.some(d => d.status === 'processing');
    if (!hasProcessing) return;

    this.pollSub = interval(5000).pipe(
      switchMap(() => this.documentService.list())
    ).subscribe({
      next: (res) => {
        this.documents = res.documents;
        const stillProcessing = this.documents.some(d => d.status === 'processing');
        if (!stillProcessing) {
          this.pollSub?.unsubscribe();   // Stop polling when all done
        }
      }
    });
  }
}