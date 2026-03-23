// src/app/app.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>🧠 DocuMind</h1>
    <p>AI Document Q&A Platform</p>
  `,
  styles: [`
    h1 {
      text-align: center;
      margin-top: 100px;
      font-size: 3rem;
    }
    p {
      text-align: center;
      color: #666;
      font-size: 1.2rem;
    }
  `]
})
export class App {
  title = 'DocuMind';
}