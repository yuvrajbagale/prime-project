import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from './music-data.service';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
  });

  public authState$ = this.authStateSubject.asObservable();
  public currentUser$ = this.authStateSubject.pipe(
    map(state => state.user)
  );

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.authStateSubject.next({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null
        });
      } catch (error) {
        this.logout();
      }
    }
  }

  // Login
  login(credentials: LoginCredentials): Observable<AuthState> {
    this.setLoading(true);

    // Simulate API call
    return of(this.mockLogin(credentials)).pipe(
      delay(1500),
      map(result => {
        this.setLoading(false);
        
        if (result.success) {
          const authState: AuthState = {
            isAuthenticated: true,
            user: result.user!,
            isLoading: false,
            error: null
          };
          
          localStorage.setItem('authToken', result.token!);
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          this.authStateSubject.next(authState);
          
          return authState;
        } else {
          const errorState: AuthState = {
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: result.error || 'Login failed'
          };
          
          this.authStateSubject.next(errorState);
          return errorState;
        }
      })
    );
  }

  private mockLogin(credentials: LoginCredentials): { success: boolean; user?: User; token?: string; error?: string } {
    // Mock users database
    const users = [
      {
        email: 'john.doe@example.com',
        password: 'password123',
        userData: {
          id: 'user1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://picsum.photos/seed/john/100/100.jpg',
          premium: false,
          joinedDate: new Date('2022-08-15'),
          favoriteSongs: [],
          playlists: [],
          followedArtists: []
        }
      },
      {
        email: 'jane.smith@example.com',
        password: 'password123',
        userData: {
          id: 'user2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          avatar: 'https://picsum.photos/seed/jane/100/100.jpg',
          premium: true,
          joinedDate: new Date('2021-12-20'),
          favoriteSongs: [],
          playlists: [],
          followedArtists: []
        }
      },
      {
        email: 'admin@melodyhub.com',
        password: 'admin123',
        userData: {
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@melodyhub.com',
          avatar: 'https://picsum.photos/seed/admin/100/100.jpg',
          premium: true,
          joinedDate: new Date('2021-01-01'),
          favoriteSongs: [],
          playlists: [],
          followedArtists: []
        }
      }
    ];

    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      return {
        success: true,
        user: user.userData,
        token: this.generateMockToken(user.userData)
      };
    } else {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  }

  private generateMockToken(user: User): string {
    return btoa(JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }));
  }

  // Register
  register(data: RegisterData): Observable<AuthState> {
    this.setLoading(true);

    return of(this.mockRegister(data)).pipe(
      delay(1500),
      map(result => {
        this.setLoading(false);
        
        if (result.success) {
          const authState: AuthState = {
            isAuthenticated: true,
            user: result.user!,
            isLoading: false,
            error: null
          };
          
          localStorage.setItem('authToken', result.token!);
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          this.authStateSubject.next(authState);
          
          return authState;
        } else {
          const errorState: AuthState = {
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: result.error || 'Registration failed'
          };
          
          this.authStateSubject.next(errorState);
          return errorState;
        }
      })
    );
  }

  private mockRegister(data: RegisterData): { success: boolean; user?: User; token?: string; error?: string } {
    // Validation
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        error: 'Passwords do not match'
      };
    }

    if (data.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
    }

    // Check if email already exists
    const existingUsers = ['john.doe@example.com', 'jane.smith@example.com', 'admin@melodyhub.com'];
    if (existingUsers.includes(data.email)) {
      return {
        success: false,
        error: 'Email already registered'
      };
    }

    // Create new user
    const newUser: User = {
      id: 'user' + Date.now(),
      name: data.name,
      email: data.email,
      avatar: `https://picsum.photos/seed/${data.email}/100/100.jpg`,
      premium: false,
      joinedDate: new Date(),
      favoriteSongs: [],
      playlists: [],
      followedArtists: []
    };

    return {
      success: true,
      user: newUser,
      token: this.generateMockToken(newUser)
    };
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null
    });
  }

  // Update Profile
  updateProfile(updates: Partial<User>): Observable<AuthState> {
    const currentState = this.authStateSubject.value;
    
    if (!currentState.user) {
      return of(currentState);
    }

    const updatedUser = { ...currentState.user, ...updates };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const newAuthState: AuthState = {
      ...currentState,
      user: updatedUser
    };
    
    this.authStateSubject.next(newAuthState);
    
    return of(newAuthState).pipe(delay(500));
  }

  // Change Password
  changePassword(currentPassword: string, newPassword: string): Observable<{ success: boolean; error?: string }> {
    return of(this.mockChangePassword(currentPassword, newPassword)).pipe(
      delay(1000)
    );
  }

  private mockChangePassword(currentPassword: string, newPassword: string): { success: boolean; error?: string } {
    // In a real app, you would validate against the stored password
    if (currentPassword === 'password123') {
      if (newPassword.length < 6) {
        return {
          success: false,
          error: 'New password must be at least 6 characters long'
        };
      }
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Current password is incorrect'
      };
    }
  }

  // Reset Password
  resetPassword(email: string): Observable<{ success: boolean; message?: string; error?: string }> {
    return of(this.mockResetPassword(email)).pipe(
      delay(1500)
    );
  }

  private mockResetPassword(email: string): { success: boolean; message?: string; error?: string } {
    const validEmails = ['john.doe@example.com', 'jane.smith@example.com', 'admin@melodyhub.com'];
    
    if (validEmails.includes(email)) {
      return {
        success: true,
        message: 'Password reset link has been sent to your email'
      };
    } else {
      return {
        success: false,
        error: 'Email not found in our system'
      };
    }
  }

  // Helper Methods
  private setLoading(isLoading: boolean): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({ ...currentState, isLoading });
  }

  clearError(): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({ ...currentState, error: null });
  }

  // Getters
  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get isLoading(): boolean {
    return this.authStateSubject.value.isLoading;
  }

  get error(): string | null {
    return this.authStateSubject.value.error;
  }

  // Token validation
  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  // Social Login (Mock)
  socialLogin(provider: 'google' | 'facebook' | 'apple'): Observable<AuthState> {
    this.setLoading(true);

    return of(this.mockSocialLogin(provider)).pipe(
      delay(2000),
      map(result => {
        this.setLoading(false);
        
        if (result.success) {
          const authState: AuthState = {
            isAuthenticated: true,
            user: result.user!,
            isLoading: false,
            error: null
          };
          
          localStorage.setItem('authToken', result.token!);
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          this.authStateSubject.next(authState);
          
          return authState;
        } else {
          const errorState: AuthState = {
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: result.error || 'Social login failed'
          };
          
          this.authStateSubject.next(errorState);
          return errorState;
        }
      })
    );
  }

  private mockSocialLogin(provider: string): { success: boolean; user?: User; token?: string; error?: string } {
    const user: User = {
      id: 'social_' + Date.now(),
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `user.${provider}@example.com`,
      avatar: `https://picsum.photos/seed/${provider}/100/100.jpg`,
      premium: false,
      joinedDate: new Date(),
      favoriteSongs: [],
      playlists: [],
      followedArtists: []
    };

    return {
      success: true,
      user,
      token: this.generateMockToken(user)
    };
  }
}
