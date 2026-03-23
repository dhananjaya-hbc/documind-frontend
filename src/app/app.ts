// src/app/app.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ============================================
// TYPESCRIPT BASICS
// ============================================

// 1. TYPES — Tell TypeScript what kind of data
//    string = text
//    number = numbers
//    boolean = true/false
//    string[] = list of strings

// 2. INTERFACE — Define a shape of data
//    Like a BLUEPRINT for objects

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Document {
  id: string;
  title: string;
  status: 'processing' | 'ready' | 'failed';  // Only these 3 values!
  chunkCount: number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- ============================================ -->
    <!-- SECTION 1: Data Binding (showing data)       -->
    <!-- ============================================ -->
    <div class="container">
      <h1>🧠 {{ title }}</h1>
      <p>{{ description }}</p>
      <p>User count: {{ userCount }}</p>
      <p>Is logged in: {{ isLoggedIn }}</p>

      <hr>

      <!-- ============================================ -->
      <!-- SECTION 2: Event Binding (handling clicks)   -->
      <!-- ============================================ -->
      <h2>Event Binding</h2>
      <p>Counter: {{ counter }}</p>
      <button (click)="increment()">+1</button>
      <button (click)="decrement()">-1</button>
      <button (click)="reset()">Reset</button>

      <hr>

      <!-- ============================================ -->
      <!-- SECTION 3: Two-way Binding (forms)           -->
      <!-- ============================================ -->
      <h2>Two-way Binding</h2>
      <input
        [(ngModel)]="userName"
        placeholder="Type your name..."
      >
      <p>Hello, {{ userName || 'stranger' }}! 👋</p>

      <hr>

      <!-- ============================================ -->
      <!-- SECTION 4: *ngIf (show/hide)                 -->
      <!-- ============================================ -->
      <h2>Conditional Rendering (*ngIf)</h2>
      <button (click)="toggleLogin()">
        {{ isLoggedIn ? 'Logout' : 'Login' }}
      </button>

      <div *ngIf="isLoggedIn">
        <p style="color: green;">✅ Welcome back, {{ userName || 'User' }}!</p>
      </div>

      <div *ngIf="!isLoggedIn">
        <p style="color: red;">❌ Please log in.</p>
      </div>

      <hr>

      <!-- ============================================ -->
      <!-- SECTION 5: *ngFor (loops)                    -->
      <!-- ============================================ -->
      <h2>Lists (*ngFor)</h2>

      <h3>My Documents:</h3>
      <div *ngFor="let doc of documents" class="doc-card">
        <strong>📄 {{ doc.title }}</strong>
        <span [class]="'status ' + doc.status">
          {{ doc.status }}
        </span>
        <small>{{ doc.chunkCount }} chunks</small>
        <button (click)="deleteDocument(doc.id)">🗑️</button>
      </div>

      <p *ngIf="documents.length === 0">No documents yet.</p>

      <button (click)="addDocument()">+ Add Fake Document</button>

      <hr>

      <!-- ============================================ -->
      <!-- SECTION 6: Chat Messages                     -->
      <!-- ============================================ -->
      <h2>Chat Demo</h2>

      <div class="chat-container">
        <div
          *ngFor="let msg of messages"
          [class]="msg.isUser ? 'message user' : 'message ai'"
        >
          <strong>{{ msg.isUser ? 'You' : 'AI' }}:</strong>
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input">
        <input
          [(ngModel)]="newQuestion"
          placeholder="Ask a question..."
          (keyup.enter)="sendMessage()"
        >
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h1 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 5px;
    }

    h2 {
      color: #333;
      margin-top: 30px;
    }

    button {
      padding: 8px 16px;
      margin: 4px;
      border: none;
      border-radius: 6px;
      background-color: #4F46E5;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background-color: #4338CA;
    }

    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      width: 300px;
    }

    hr {
      margin: 30px 0;
      border: 1px solid #eee;
    }

    .doc-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      margin: 8px 0;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }

    .status.ready {
      background: #d4edda;
      color: #155724;
    }

    .status.processing {
      background: #fff3cd;
      color: #856404;
    }

    .status.failed {
      background: #f8d7da;
      color: #721c24;
    }

    .chat-container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      height: 300px;
      overflow-y: auto;
      background: #fafafa;
      margin-bottom: 12px;
    }

    .message {
      padding: 10px 14px;
      margin: 8px 0;
      border-radius: 12px;
      max-width: 80%;
    }

    .message.user {
      background: #4F46E5;
      color: white;
      margin-left: auto;
      text-align: right;
    }

    .message.ai {
      background: #e9ecef;
      color: #333;
    }

    .chat-input {
      display: flex;
      gap: 8px;
    }

    .chat-input input {
      flex: 1;
      width: auto;
    }
  `]
})
export class App {
  // ============================================
  // SECTION 1: Simple Data (Data Binding)
  // ============================================
  title: string = 'DocuMind';
  description: string = 'AI Document Q&A Platform';
  userCount: number = 42;
  isLoggedIn: boolean = false;

  // ============================================
  // SECTION 2: Counter (Event Binding)
  // ============================================
  counter: number = 0;

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    this.counter--;
  }

  reset(): void {
    this.counter = 0;
  }

  // ============================================
  // SECTION 3: Username (Two-way Binding)
  // ============================================
  userName: string = '';

  // ============================================
  // SECTION 4: Login Toggle (*ngIf)
  // ============================================
  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  // ============================================
  // SECTION 5: Documents List (*ngFor)
  // ============================================
  documents: Document[] = [
    {
      id: '1',
      title: 'Biology Textbook.pdf',
      status: 'ready',
      chunkCount: 45,
    },
    {
      id: '2',
      title: 'History Notes.pdf',
      status: 'processing',
      chunkCount: 0,
    },
  ];

  addDocument(): void {
    const newDoc: Document = {
      id: String(Date.now()),
      title: `Document ${this.documents.length + 1}.pdf`,
      status: 'ready',
      chunkCount: Math.floor(Math.random() * 50) + 5,
    };
    this.documents.push(newDoc);
  }

  deleteDocument(id: string): void {
    this.documents = this.documents.filter(doc => doc.id !== id);
  }

  // ============================================
  // SECTION 6: Chat Messages
  // ============================================
  messages: Message[] = [
    {
      text: 'Hello! Upload a document and ask me anything.',
      isUser: false,
      timestamp: new Date(),
    },
  ];

  newQuestion: string = '';

  sendMessage(): void {
    // Don't send empty messages
    if (!this.newQuestion.trim()) return;

    // Add user message
    this.messages.push({
      text: this.newQuestion,
      isUser: true,
      timestamp: new Date(),
    });

    // Simulate AI response (later we'll call real API)
    const question = this.newQuestion;
    this.newQuestion = '';  // Clear input

    // Fake AI response after 1 second
    setTimeout(() => {
      this.messages.push({
        text: `That's a great question about "${question}"! In a real app, I would search the document and give you an answer with citations.`,
        isUser: false,
        timestamp: new Date(),
      });
    }, 1000);
  }
}