// src/app/services/chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

// ============================================
// INTERFACES (match your backend schemas)
// ============================================

export interface AnswerResponse {
  question: string;
  answer: string;
  sources: string[];
  document_id: string;
}

export interface ConversationResponse {
  id: string;
  question: string;
  answer: string;
  sources: string | null;    // JSON string from database
  created_at: string;
}

// ============================================
// CHAT SERVICE
// ============================================

@Injectable({ providedIn: 'root' })
export class ChatService {

  private apiUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {}

  // POST /api/v1/chat/:documentId/ask
  askQuestion(documentId: string, question: string): Observable<AnswerResponse> {
    return this.http.post<AnswerResponse>(
      `${this.apiUrl}/${documentId}/ask`,
      { question }
    );
  }

  // GET /api/v1/chat/:documentId/history
  getHistory(documentId: string): Observable<ConversationResponse[]> {
    return this.http.get<ConversationResponse[]>(
      `${this.apiUrl}/${documentId}/history`
    );
  }
}