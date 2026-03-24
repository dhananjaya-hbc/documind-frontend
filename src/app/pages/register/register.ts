// src/app/pages/register/register.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';    // ← REAL service

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-md mx-auto px-4 py-20">
      <div class="bg-white rounded-2xl shadow-lg p-8">

        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
          <p class="text-gray-600 mt-2">Start asking questions about your documents</p>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div *ngIf="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>

        <!-- Register Form -->
        <form (ngSubmit)="onRegister()">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              [(ngModel)]="username"
              name="username"
              placeholder="john_doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     outline-none transition"
              required
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="john&#64;example.com"
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
              placeholder="••••••••  (min 6 characters)"
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
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-indigo-600 font-medium hover:text-indigo-700">
            Login
          </a>
        </p>

      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // ✅ REAL API CALL (replaces the old setTimeout fake)
    this.authService.register({
      email: this.email,
      username: this.username,
      password: this.password,
    }).subscribe({
      next: () => {
        this.successMessage = 'Account created! Redirecting to login...';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}