// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment';

// ============================================
// INTERFACES (match your backend schemas)
// ============================================

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// ============================================
// AUTH SERVICE
// ============================================

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  // BehaviorSubject holds the current user (or null)
  // Any component can subscribe to this to react to auth changes
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // On app startup, if token exists, load user profile
    if (this.getToken()) {
      this.loadUser();
    }
  }

  // ---- API CALLS ----

  register(data: { email: string; username: string; password: string }): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        // Save token to localStorage
        localStorage.setItem('access_token', response.access_token);
        // Load user profile
        this.loadUser();
      })
    );
  }

  // ---- LOCAL METHODS ----

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  // ---- PRIVATE ----

  private loadUser(): void {
    this.http.get<UserResponse>(`${this.apiUrl}/me`).subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: () => {
        // Token expired or invalid — clean up
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
      }
    });
  }
}