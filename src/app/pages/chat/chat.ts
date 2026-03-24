// src/app/pages/chat/chat.ts

import {
  Component, OnInit, ViewChild,
  ElementRef, AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { DocumentService, DocumentResponse } from '../../services/document.service';

// ============================================
// UI interface for chat messages
// ============================================
interface ChatMessage {
  question: string;
  answer: string;
  sources: string[];
  isLoading?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-6 flex flex-col"
         style="height: calc(100vh - 140px);">

      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold text-gray-900">💬 Chat</h2>
          <p *ngIf="document" class="text-sm text-gray-500 truncate">
            📄 {{ document.title }}
          </p>
        </div>
        <a routerLink="/documents"
           class="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600
                  border border-gray-300 rounded-lg hover:border-indigo-300
                  transition no-underline shrink-0 ml-4">
          ← Back
        </a>
      </div>

      <!-- Chat Messages Container -->
      <div #chatContainer
           class="flex-1 overflow-y-auto bg-white rounded-xl shadow-md p-6 mb-4 space-y-6">

        <!-- Loading History -->
        <div *ngIf="isLoadingHistory" class="text-center py-12">
          <p class="text-gray-500">⏳ Loading chat history...</p>
        </div>

        <!-- Empty State (no messages yet) -->
        <div *ngIf="!isLoadingHistory && messages.length === 0"
             class="text-center py-12">
          <p class="text-4xl mb-4">🤖</p>
          <p class="text-gray-600 font-medium">Ask me anything about this document!</p>
          <p class="text-gray-400 text-sm mt-2">
            I'll find relevant information and cite my sources.
          </p>
        </div>

        <!-- Messages -->
        <div *ngFor="let msg of messages" class="space-y-3">

          <!-- User Question (right side, indigo) -->
          <div class="flex justify-end">
            <div class="bg-indigo-600 text-white px-4 py-3 rounded-2xl
                        rounded-br-md max-w-[80%] shadow-sm">
              <p class="text-sm">{{ msg.question }}</p>
            </div>
          </div>

          <!-- AI Answer (left side, gray) -->
          <div class="flex justify-start">
            <div class="bg-gray-50 text-gray-800 px-4 py-3 rounded-2xl
                        rounded-bl-md max-w-[80%] shadow-sm border border-gray-100">

              <!-- Loading dots -->
              <div *ngIf="msg.isLoading" class="flex items-center gap-2">
                <span class="animate-pulse text-lg">🤖</span>
                <span class="text-sm text-gray-500 animate-pulse">Thinking...</span>
              </div>

              <!-- Answer content -->
              <div *ngIf="!msg.isLoading">
                <p class="text-sm whitespace-pre-wrap leading-relaxed">{{ msg.answer }}</p>

                <!-- Sources -->
                <div *ngIf="msg.sources && msg.sources.length > 0"
                     class="mt-3 pt-3 border-t border-gray-200">
                  <p class="text-xs font-semibold text-gray-500 mb-2">📍 Sources:</p>
                  <div *ngFor="let source of msg.sources; let i = index"
                       class="bg-white rounded-lg p-2.5 mb-1.5 text-xs text-gray-600
                              border border-gray-200 leading-relaxed">
                    <span class="font-bold text-indigo-600">[{{ i + 1 }}]</span>
                    {{ source | slice:0:300 }}{{ source.length > 300 ? '...' : '' }}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <!-- Error Message -->
      <div *ngIf="errorMessage"
           class="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
        <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        <button (click)="errorMessage = ''" class="text-red-400 hover:text-red-600 text-sm">✕</button>
      </div>

      <!-- Input Area -->
      <div class="flex gap-3">
        <input
          type="text"
          [(ngModel)]="question"
          (keyup.enter)="askQuestion()"
          placeholder="Ask a question about this document..."
          [disabled]="isAsking"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-xl
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition disabled:opacity-50
                 disabled:cursor-not-allowed"
        >
        <button
          (click)="askQuestion()"
          [disabled]="isAsking || !question.trim()"
          class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold
                 hover:bg-indigo-700 transition shadow-md
                 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isAsking ? '⏳' : '➤' }}
        </button>
      </div>

    </div>
  `,
  styles: []
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  documentId = '';
  document: DocumentResponse | null = null;
  messages: ChatMessage[] = [];
  question = '';
  isAsking = false;
  isLoadingHistory = false;
  errorMessage = '';

  private shouldScroll = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private documentService: DocumentService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = params['id'] || '';
      this.loadDocument();
      this.loadHistory();
    });
  }

  // Auto-scroll to bottom when new messages appear
  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  // ---- Load document info ----
  loadDocument(): void {
    this.documentService.get(this.documentId).subscribe({
      next: (doc) => this.document = doc,
      error: () => {}   // Non-critical, just won't show title
    });
  }

  // ---- Load chat history ----
  loadHistory(): void {
    this.isLoadingHistory = true;

    this.chatService.getHistory(this.documentId).subscribe({
      next: (conversations) => {
        // Backend returns newest-first, reverse for chronological display
        this.messages = conversations.reverse().map(c => ({
          question: c.question,
          answer: c.answer,
          sources: this.parseSources(c.sources),
        }));
        this.isLoadingHistory = false;
        this.shouldScroll = true;
      },
      error: () => {
        this.isLoadingHistory = false;
      }
    });
  }

  // ---- Ask a question ----
  askQuestion(): void {
    const q = this.question.trim();
    if (!q || this.isAsking) return;

    this.errorMessage = '';
    this.isAsking = true;
    this.question = '';

    // Immediately add message with loading state
    const msg: ChatMessage = {
      question: q,
      answer: '',
      sources: [],
      isLoading: true
    };
    this.messages.push(msg);
    this.shouldScroll = true;

    // Call API
    this.chatService.askQuestion(this.documentId, q).subscribe({
      next: (response) => {
        msg.answer = response.answer;
        msg.sources = response.sources;
        msg.isLoading = false;
        this.isAsking = false;
        this.shouldScroll = true;
      },
      error: (err) => {
        msg.answer = 'Sorry, something went wrong. Please try again.';
        msg.isLoading = false;
        this.isAsking = false;
        this.errorMessage = err.error?.detail || 'Failed to get answer.';
      }
    });
  }

  // ---- Parse sources from JSON string ----
  // Backend stores sources as JSON string: '["chunk1", "chunk2"]'
  // We need to parse it into a string array
  private parseSources(sources: string | null): string[] {
    if (!sources) return [];
    try {
      const parsed = JSON.parse(sources);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  // ---- Scroll chat to bottom ----
  private scrollToBottom(): void {
    try {
      const el = this.chatContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }
}