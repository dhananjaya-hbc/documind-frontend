// src/app/app.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <!-- Full screen centered layout -->
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

      <!-- Navigation Bar -->
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 class="text-2xl font-bold text-indigo-600">🧠 DocuMind</h1>
          <div class="flex gap-2">
            <button class="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 transition">
              Login
            </button>
            <button class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 class="text-5xl font-bold text-gray-900 mb-6">
          Ask Questions About
          <span class="text-indigo-600"> Any Document</span>
        </h2>
        <p class="text-xl text-gray-600 mb-10">
          Upload a PDF and get AI-powered answers with source citations.
          Built with RAG technology.
        </p>

        <!-- Upload Card -->
        <div class="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-8
                      hover:border-indigo-400 transition cursor-pointer">
            <p class="text-4xl mb-4">📄</p>
            <p class="text-lg font-medium text-gray-700">Drop your PDF here</p>
            <p class="text-sm text-gray-500 mt-2">or click to browse</p>
          </div>
          <button class="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl
                         font-semibold hover:bg-indigo-700 transition
                         shadow-md hover:shadow-lg">
            Upload & Process
          </button>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-6xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

          <!-- Feature 1 -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <p class="text-3xl mb-4">📄</p>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Upload PDF</h3>
            <p class="text-gray-600 text-sm">
              Upload any PDF document. We extract and process the text automatically.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <p class="text-3xl mb-4">🤖</p>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Ask Questions</h3>
            <p class="text-gray-600 text-sm">
              Ask any question about your document. AI finds the relevant sections.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <p class="text-3xl mb-4">📍</p>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Get Citations</h3>
            <p class="text-gray-600 text-sm">
              Every answer includes source citations so you can verify the information.
            </p>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 py-6 mt-20">
        <p class="text-center text-gray-500 text-sm">
          Built with Angular + FastAPI + RAG | © 2026 DocuMind
        </p>
      </footer>

    </div>
  `,
  styles: []
})
export class App {
  title = 'DocuMind';
}