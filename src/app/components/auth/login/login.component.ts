import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { AuthService, LoginCredentials, AuthState } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() switchToReset = new EventEmitter<void>();

  credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  isSubmitting = false;
  showPassword = false;
  rememberMe = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      return;
    }

    this.isSubmitting = true;
    this.authService.clearError();

    this.authService.login(this.credentials).subscribe({
      next: (authState: AuthState) => {
        this.isSubmitting = false;
        if (authState.isAuthenticated) {
          this.loginSuccess.emit();
        }
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  onSocialLogin(provider: 'google' | 'facebook' | 'apple'): void {
    this.isSubmitting = true;
    
    this.authService.socialLogin(provider).subscribe({
      next: (authState: AuthState) => {
        this.isSubmitting = false;
        if (authState.isAuthenticated) {
          this.loginSuccess.emit();
        }
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSwitchToRegister(): void {
    this.switchToRegister.emit();
  }

  onSwitchToReset(): void {
    this.switchToReset.emit();
  }

  get errorMessage(): string | null {
    return this.authService.error;
  }

  get isLoading(): boolean {
    return this.authService.isLoading;
  }

  // Demo credentials helper
  fillDemoCredentials(): void {
    this.credentials = {
      email: 'john.doe@example.com',
      password: 'password123'
    };
  }
}
