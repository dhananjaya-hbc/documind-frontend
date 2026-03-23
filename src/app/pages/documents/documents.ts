// src/app/pages/documents/documents.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">📄 My Documents</h2>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg
                       hover:bg-indigo-700 transition text-sm font-medium">
          + Upload PDF
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-md p-8 text-center">
        <p class="text-4xl mb-4">📭</p>
        <p class="text-gray-600">No documents yet. Upload your first PDF!</p>
      </div>
    </div>
  `,
  styles: []
})
export class DocumentsComponent {}