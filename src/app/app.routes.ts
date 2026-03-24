// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DocumentsComponent } from './pages/documents/documents';
import { ChatComponent } from './pages/chat/chat';
import { authGuard } from './guards/auth.guard';    // ← ADD

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'documents', component: DocumentsComponent, canActivate: [authGuard] },   // ← PROTECTED
  { path: 'chat/:id', component: ChatComponent, canActivate: [authGuard] },          // ← PROTECTED
  { path: '**', redirectTo: '' },
];