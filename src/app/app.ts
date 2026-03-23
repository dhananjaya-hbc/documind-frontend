// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <!-- App Shell: Navbar + Content + Footer -->
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">

      <!-- Navbar (always visible) -->
      <app-navbar />

      <!-- Page Content (changes based on URL) -->
      <main class="flex-1">
        <router-outlet />
      </main>

      <!-- Footer (always visible) -->
      <footer class="bg-white border-t border-gray-200 py-6">
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