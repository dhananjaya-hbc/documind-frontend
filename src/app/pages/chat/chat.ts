// src/app/pages/chat/chat.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">💬 Chat</h2>
      <p class="text-gray-600">Document ID: {{ documentId }}</p>

      <div class="bg-white rounded-xl shadow-md p-8 mt-4 text-center">
        <p class="text-4xl mb-4">🤖</p>
        <p class="text-gray-600">Chat interface coming soon!</p>
      </div>
    </div>
  `,
  styles: []
})
export class ChatComponent {
  documentId: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.documentId = params['id'] || '';
    });
  }
}