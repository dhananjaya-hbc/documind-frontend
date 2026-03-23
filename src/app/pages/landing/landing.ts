// src/app/pages/landing/landing.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero Section -->
    <div class="max-w-4xl mx-auto px-4 py-20 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Ask Questions About
        <span class="text-indigo-600"> Any Document</span>
      </h2>
      <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Upload a PDF and get AI-powered answers with source citations.
        Built with RAG technology.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a routerLink="/register"
           class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold
                  hover:bg-indigo-700 transition shadow-md hover:shadow-lg no-underline">
          Get Started Free →
        </a>
        <a routerLink="/login"
           class="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold
                  border-2 border-indigo-600 hover:bg-indigo-50 transition no-underline">
          Login
        </a>
      </div>
    </div>

    <!-- How It Works -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">
        How It Works
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="text-center">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">📄</span>
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">1. Upload PDF</h4>
          <p class="text-gray-600 text-sm">
            Upload any PDF document. We extract and process the text automatically.
          </p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🤖</span>
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">2. Ask Questions</h4>
          <p class="text-gray-600 text-sm">
            Ask any question about your document. AI finds the relevant sections.
          </p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">📍</span>
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-2">3. Get Citations</h4>
          <p class="text-gray-600 text-sm">
            Every answer includes source citations so you can verify the information.
          </p>
        </div>

      </div>
    </div>

    <!-- Tech Stack -->
    <div class="max-w-4xl mx-auto px-4 py-12 text-center">
      <h3 class="text-2xl font-bold text-gray-900 mb-8">Built With</h3>
      <div class="flex flex-wrap justify-center gap-3">
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Angular</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">FastAPI</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">PostgreSQL</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">ChromaDB</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Docker</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">RAG</span>
        <span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">Tailwind CSS</span>
      </div>
    </div>
  `,
  styles: []
})
export class LandingComponent {}