// src/app/components/navbar/navbar.ts

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';     // ← REAL service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <!-- Logo -->
        <a routerLink="/" class="text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition no-underline">
          DocuMind
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-4">

          <!-- ✅ REACTIVE: subscribes to auth state using async pipe -->
          <ng-container *ngIf="currentUser$ | async as user; else desktopLoggedOut">
            <a routerLink="/documents"
               routerLinkActive="text-indigo-600 font-semibold"
               class="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 transition no-underline">
              📄 Documents
            </a>
            <span class="text-sm text-gray-500">
              👤 {{ user.username }}
            </span>
            <button
              (click)="logout()"
              class="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition">
              Logout
            </button>
          </ng-container>

          <ng-template #desktopLoggedOut>
            <a routerLink="/login"
               routerLinkActive="text-indigo-600"
               class="px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 transition no-underline">
              Login
            </a>
            <a routerLink="/register"
               class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition no-underline">
              Sign Up
            </a>
          </ng-template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          (click)="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-gray-600 hover:text-indigo-600">
          <span class="text-2xl">{{ mobileMenuOpen ? '✕' : '☰' }}</span>
        </button>

      </div>

      <!-- Mobile Menu -->
      <div *ngIf="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 px-4 py-4">

        <ng-container *ngIf="currentUser$ | async as user; else mobileLoggedOut">
          <a routerLink="/documents"
             (click)="mobileMenuOpen = false"
             class="block py-2 text-gray-600 hover:text-indigo-600 no-underline">
            📄 Documents
          </a>
          <span class="block py-2 text-sm text-gray-500">👤 {{ user.username }}</span>
          <button
            (click)="logout()"
            class="block py-2 text-red-600 hover:text-red-700">
            Logout
          </button>
        </ng-container>

        <ng-template #mobileLoggedOut>
          <a routerLink="/login"
             (click)="mobileMenuOpen = false"
             class="block py-2 text-gray-600 hover:text-indigo-600 no-underline">
            Login
          </a>
          <a routerLink="/register"
             (click)="mobileMenuOpen = false"
             class="block py-2 text-gray-600 hover:text-indigo-600 no-underline">
            Sign Up
          </a>
        </ng-template>

      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  mobileMenuOpen = false;
  currentUser$;     // ← Observable, used with async pipe in template

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    this.mobileMenuOpen = false;
  }
}