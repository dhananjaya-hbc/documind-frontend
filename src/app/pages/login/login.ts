// src/app/pages/login/login.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-md mx-auto px-4 py-20">
      <div class="bg-white rounded-2xl shadow-lg p-8">

        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p class="text-gray-600 mt-2">Login to your account</p>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="onLogin()">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="john@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     outline-none transition"
              required
            >
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     outline-none transition"
              required
            >
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold
                   hover:bg-indigo-700 transition shadow-md
                   disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <a routerLink="/register" class="text-indigo-600 font-medium hover:text-indigo-700">
            Sign up
          </a>
        </p>

      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    // For now, fake login (we'll connect to API later)
    setTimeout(() => {
      if (this.email && this.password) {
        console.log('Login:', this.email);
        this.router.navigate(['/documents']);
      } else {
        this.errorMessage = 'Please fill in all fields.';
      }
      this.isLoading = false;
    }, 1000);
  }
}