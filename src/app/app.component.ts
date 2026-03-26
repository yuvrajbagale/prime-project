import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthService, AuthState } from './services/auth.service';
import { AudioPlayerService } from './services/audio-player.service';
import { MusicDataService, Song } from './services/music-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TableModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    MainScreenComponent,
    MusicPlayerComponent,
    LoginComponent,
    UserProfileComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MelodyHub';
  isMobileMenuOpen = false;
  sidebarCollapsed = false;
  
  // Auth state
  isAuthenticated = false;
  currentUser: any = null;
  showLogin = false;
  showProfile = false;
  
  // Music player state (managed by AudioPlayerService)
  currentSong: Song | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 50;

  constructor(
    private authService: AuthService,
    private audioPlayerService: AudioPlayerService,
    private musicDataService: MusicDataService
  ) {}
  ngOnInit() {
    // Subscribe to auth state
    this.authService.authState$.subscribe((authState: AuthState) => {
      this.isAuthenticated = authState.isAuthenticated;
      this.currentUser = authState.user;
      this.showLogin = !authState.isAuthenticated;
      this.showProfile = false;
    });

    // Subscribe to audio player state
    this.audioPlayerService.currentSong$.subscribe(song => {
      this.currentSong = song;
    });

    this.audioPlayerService.audioState$.subscribe(state => {
      this.isPlaying = state.isPlaying;
      this.currentTime = state.currentTime;
      this.duration = state.duration;
      this.volume = state.volume * 100;
    });

    window.addEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
    window.addEventListener('sidebar-collapsed', this.onSidebarCollapsed.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
    window.removeEventListener('sidebar-collapsed', this.onSidebarCollapsed.bind(this));
    this.audioPlayerService.destroy();
  }

  // Auth methods
  onLoginSuccess(): void {
    this.showLogin = false;
  }

  showUserProfile(): void {
    this.showProfile = true;
    this.showLogin = false;
  }

  hideUserProfile(): void {
    this.showProfile = false;
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSidebarCollapsed(event: any) {
    this.sidebarCollapsed = event.detail.isCollapsed;
  }

  // Music player methods (delegated to AudioPlayerService)
  async playPause() {
    await this.audioPlayerService.playPause();
  }

  async playPrevious() {
    await this.audioPlayerService.playPrevious();
  }

  async playNext() {
    await this.audioPlayerService.playNext();
  }

  seek(position: number) {
    this.audioPlayerService.seekTo(position);
  }

  onVolumeChange(vol: number) {
    this.audioPlayerService.setVolume(vol / 100);
  }

  shuffle() {
    this.audioPlayerService.toggleShuffle();
  }

  repeat() {
    this.audioPlayerService.toggleRepeat();
  }

  like() {
    if (this.currentSong) {
      this.musicDataService.toggleFavorite(this.currentSong.id);
    }
  }

  toggleQueue() {
    console.log('Queue toggled');
  }

  // Method to be called from main screen
  async onSongSelected(song: Song) {
    await this.audioPlayerService.loadSong(song);
    await this.audioPlayerService.play();
  }
}
