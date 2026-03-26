import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { MusicDataService, Song } from './music-data.service';

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isBuffering: boolean;
}

export interface PlaybackMode {
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio: HTMLAudioElement;
  private audioStateSubject = new BehaviorSubject<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isMuted: false,
    isBuffering: false
  });

  private playbackModeSubject = new BehaviorSubject<PlaybackMode>({
    shuffle: false,
    repeat: 'none'
  });

  private currentSongIndexSubject = new BehaviorSubject<number>(0);
  private playlistSubject = new BehaviorSubject<Song[]>([]);
  private currentSongSubject = new BehaviorSubject<Song | null>(null);

  private timeUpdateInterval: any;

  public audioState$ = this.audioStateSubject.asObservable();
  public playbackMode$ = this.playbackModeSubject.asObservable();
  public currentSongIndex$ = this.currentSongIndexSubject.asObservable();
  public playlist$ = this.playlistSubject.asObservable();
  public currentSong$ = this.currentSongSubject.asObservable();

  constructor(
    private musicDataService: MusicDataService,
    private ngZone: NgZone
  ) {
    this.audio = new Audio();
    this.initializeAudio();
  }

  private initializeAudio(): void {
    // Audio event listeners
    this.audio.addEventListener('loadstart', () => this.setBuffering(true));
    this.audio.addEventListener('canplay', () => this.setBuffering(false));
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('timeupdate', () => this.updateCurrentTime());
    this.audio.addEventListener('ended', () => this.handleSongEnd());
    this.audio.addEventListener('error', (e) => this.handleError(e));

    // Set initial volume
    this.audio.volume = this.audioStateSubject.value.volume;
  }

  private setBuffering(isBuffering: boolean): void {
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, isBuffering });
  }

  private updateDuration(): void {
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, duration: this.audio.duration });
  }

  private updateCurrentTime(): void {
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, currentTime: this.audio.currentTime });
  }

  private handleSongEnd(): void {
    const mode = this.playbackModeSubject.value;
    
    if (mode.repeat === 'one') {
      this.playCurrent();
    } else if (mode.repeat === 'all' || this.currentSongIndexSubject.value < this.playlistSubject.value.length - 1) {
      this.playNext();
    } else {
      this.pause();
    }
  }

  private handleError(error: any): void {
    console.error('Audio error:', error);
    this.setBuffering(false);
    // Try to play next song
    this.playNext();
  }

  // Player Controls
  async loadSong(song: Song): Promise<void> {
    try {
      this.setBuffering(true);
      this.currentSongSubject.next(song);
      
      // For demo purposes, we'll use a placeholder audio URL
      // In a real app, you would use song.audioUrl
      const audioUrl = song.audioUrl || this.getDemoAudioUrl(song.id);
      
      this.audio.src = audioUrl;
      await this.audio.load();
      
      // Update music service
      this.musicDataService.playSong(song);
      
    } catch (error) {
      console.error('Error loading song:', error);
      this.setBuffering(false);
    }
  }

  private getDemoAudioUrl(songId: string): string {
    // In a real application, this would be the actual audio URL
    // For demo purposes, we'll simulate with a placeholder
    return `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiS2Oy9diMFl2z5JlQVBTGH0fPTgjMGHm7A7+OZURE`;
  }

  async play(): Promise<void> {
    try {
      await this.audio.play();
      const currentState = this.audioStateSubject.value;
      this.audioStateSubject.next({ ...currentState, isPlaying: true });
      this.startTimeUpdate();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  pause(): void {
    this.audio.pause();
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, isPlaying: false });
    this.stopTimeUpdate();
  }

  async playPause(): Promise<void> {
    if (this.audioStateSubject.value.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  async playCurrent(): Promise<void> {
    const currentSong = this.currentSongSubject.value;
    if (currentSong) {
      await this.loadSong(currentSong);
      await this.play();
    }
  }

  async playNext(): Promise<void> {
    const playlist = this.playlistSubject.value;
    const currentIndex = this.currentSongIndexSubject.value;
    const mode = this.playbackModeSubject.value;

    let nextIndex: number;

    if (mode.shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    if (nextIndex !== currentIndex || mode.repeat === 'all') {
      await this.playSongAtIndex(nextIndex);
    } else {
      this.pause();
    }
  }

  async playPrevious(): Promise<void> {
    const playlist = this.playlistSubject.value;
    const currentIndex = this.currentSongIndexSubject.value;
    const mode = this.playbackModeSubject.value;

    let prevIndex: number;

    if (mode.shuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }

    await this.playSongAtIndex(prevIndex);
  }

  async playSongAtIndex(index: number): Promise<void> {
    const playlist = this.playlistSubject.value;
    if (index >= 0 && index < playlist.length) {
      this.currentSongIndexSubject.next(index);
      await this.loadSong(playlist[index]);
      await this.play();
    }
  }

  // Seek Controls
  seekTo(time: number): void {
    this.audio.currentTime = time;
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, currentTime: time });
  }

  seekBy(seconds: number): void {
    const newTime = Math.max(0, Math.min(this.audio.duration, this.audio.currentTime + seconds));
    this.seekTo(newTime);
  }

  // Volume Controls
  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.audio.volume = clampedVolume;
    const currentState = this.audioStateSubject.value;
    this.audioStateSubject.next({ ...currentState, volume: clampedVolume, isMuted: false });
    this.musicDataService.setVolume(Math.round(clampedVolume * 100));
  }

  toggleMute(): void {
    const currentState = this.audioStateSubject.value;
    const newMutedState = !currentState.isMuted;
    
    this.audio.muted = newMutedState;
    this.audioStateSubject.next({ ...currentState, isMuted: newMutedState });
  }

  // Playback Mode Controls
  toggleShuffle(): void {
    const currentMode = this.playbackModeSubject.value;
    this.playbackModeSubject.next({ ...currentMode, shuffle: !currentMode.shuffle });
  }

  toggleRepeat(): void {
    const currentMode = this.playbackModeSubject.value;
    let newRepeat: 'none' | 'one' | 'all';

    if (currentMode.repeat === 'none') {
      newRepeat = 'one';
    } else if (currentMode.repeat === 'one') {
      newRepeat = 'all';
    } else {
      newRepeat = 'none';
    }

    this.playbackModeSubject.next({ ...currentMode, repeat: newRepeat });
  }

  // Playlist Management
  setPlaylist(playlist: Song[], startIndex: number = 0): void {
    this.playlistSubject.next(playlist);
    this.currentSongIndexSubject.next(startIndex);
  }

  addToQueue(song: Song): void {
    const currentPlaylist = [...this.playlistSubject.value];
    currentPlaylist.splice(this.currentSongIndexSubject.value + 1, 0, song);
    this.playlistSubject.next(currentPlaylist);
  }

  removeFromQueue(index: number): void {
    const currentPlaylist = [...this.playlistSubject.value];
    const currentIndex = this.currentSongIndexSubject.value;
    
    if (index !== currentIndex) {
      currentPlaylist.splice(index, 1);
      if (index < currentIndex) {
        this.currentSongIndexSubject.next(currentIndex - 1);
      }
      this.playlistSubject.next(currentPlaylist);
    }
  }

  clearQueue(): void {
    const currentSong = this.currentSongSubject.value;
    if (currentSong) {
      this.playlistSubject.next([currentSong]);
      this.currentSongIndexSubject.next(0);
    }
  }

  // Time Update
  private startTimeUpdate(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timeUpdateInterval = setInterval(() => {
        this.ngZone.run(() => {
          if (this.audioStateSubject.value.isPlaying) {
            this.updateCurrentTime();
          }
        });
      }, 1000);
    });
  }

  private stopTimeUpdate(): void {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
  }

  // Getters
  getCurrentState(): AudioState {
    return this.audioStateSubject.value;
  }

  getPlaybackMode(): PlaybackMode {
    return this.playbackModeSubject.value;
  }

  getCurrentSong(): Song | null {
    return this.currentSongSubject.value;
  }

  getPlaylist(): Song[] {
    return this.playlistSubject.value;
  }

  getCurrentSongIndex(): number {
    return this.currentSongIndexSubject.value;
  }

  // Utility Methods
  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  getProgressPercentage(): number {
    const state = this.audioStateSubject.value;
    if (state.duration === 0) return 0;
    return (state.currentTime / state.duration) * 100;
  }

  // Cleanup
  destroy(): void {
    this.stopTimeUpdate();
    this.audio.pause();
    this.audio.src = '';
  }
}
