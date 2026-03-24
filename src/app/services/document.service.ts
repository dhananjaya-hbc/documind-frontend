// src/app/services/document.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

// ============================================
// INTERFACES (match your backend schemas)
// ============================================

export interface DocumentResponse {
  id: string;
  title: string;
  filename: string;
  chunk_count: number;
  status: string;          // 'processing' | 'ready' | 'error'
  created_at: string;
}

export interface DocumentListResponse {
  documents: DocumentResponse[];
  total: number;
}

// ============================================
// DOCUMENT SERVICE
// ============================================

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) {}

  // POST /api/v1/documents/upload  (multipart form)
  upload(file: File): Observable<DocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DocumentResponse>(`${this.apiUrl}/upload`, formData);
  }

  // GET /api/v1/documents/
  list(): Observable<DocumentListResponse> {
    return this.http.get<DocumentListResponse>(this.apiUrl);
  }

  // GET /api/v1/documents/:id
  get(id: string): Observable<DocumentResponse> {
    return this.http.get<DocumentResponse>(`${this.apiUrl}/${id}`);
  }

  // DELETE /api/v1/documents/:id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}