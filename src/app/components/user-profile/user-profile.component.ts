import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MusicDataService, User } from '../../services/music-data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  isSubmitting = false;
  
  editForm: Partial<User> = {
    name: '',
    email: ''
  };

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  isChangingPassword = false;
  isSubmittingPassword = false;

  constructor(
    private authService: AuthService,
    private musicDataService: MusicDataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        this.editForm = {
          name: user.name,
          email: user.email
        };
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true;
    if (this.currentUser) {
      this.editForm = {
        name: this.currentUser.name,
        email: this.currentUser.email
      };
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.currentUser) {
      this.editForm = {
        name: this.currentUser.name,
        email: this.currentUser.email
      };
    }
  }

  saveProfile(): void {
    if (!this.currentUser || !this.editForm.name || !this.editForm.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields'
      });
      return;
    }

    this.isSubmitting = true;

    this.authService.updateProfile(this.editForm).subscribe({
      next: (authState) => {
        this.isSubmitting = false;
        if (authState.user) {
          this.currentUser = authState.user;
          this.isEditing = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile updated successfully'
          });
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile'
        });
      }
    });
  }

  enablePasswordChange(): void {
    this.isChangingPassword = true;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  cancelPasswordChange(): void {
    this.isChangingPassword = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  changePassword(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all password fields'
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'New passwords do not match'
      });
      return;
    }

    if (this.newPassword.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Password must be at least 6 characters long'
      });
      return;
    }

    this.isSubmittingPassword = true;

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: (result) => {
        this.isSubmittingPassword = false;
        if (result.success) {
          this.isChangingPassword = false;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password changed successfully'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: result.error || 'Failed to change password'
          });
        }
      },
      error: () => {
        this.isSubmittingPassword = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to change password'
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'You have been successfully logged out'
    });
  }

  get favoriteSongsCount(): number {
    return this.currentUser?.favoriteSongs.length || 0;
  }

  get playlistsCount(): number {
    return this.currentUser?.playlists.length || 0;
  }

  get followedArtistsCount(): number {
    return this.currentUser?.followedArtists.length || 0;
  }

  get membershipStatus(): string {
    return this.currentUser?.premium ? 'Premium' : 'Free';
  }

  get membershipColor(): string {
    return this.currentUser?.premium ? 'text-yellow-600' : 'text-gray-600';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
}
