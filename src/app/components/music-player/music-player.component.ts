import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {
  @Input() currentSong: any = null;
  @Input() isPlaying: boolean = false;
  @Input() currentTime: number = 0;
  @Input() duration: number = 0;
  @Input() volume: number = 50;
  
  @Output() playPause = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() seek = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();
  @Output() shuffle = new EventEmitter<void>();
  @Output() repeat = new EventEmitter<void>();

  isShuffled: boolean = false;
  repeatMode: 'none' | 'one' | 'all' = 'none';

  togglePlayPause() {
    this.playPause.emit();
  }

  playPrevious() {
    this.previous.emit();
  }

  playNext() {
    this.next.emit();
  }

  onSeek(event: any) {
    this.seek.emit(event.target.value);
  }

  onVolumeChange(event: any) {
    this.volumeChange.emit(event.target.value);
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    this.shuffle.emit();
  }

  toggleRepeat() {
    if (this.repeatMode === 'none') {
      this.repeatMode = 'one';
    } else if (this.repeatMode === 'one') {
      this.repeatMode = 'all';
    } else {
      this.repeatMode = 'none';
    }
    this.repeat.emit();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  getRepeatIcon(): string {
    switch (this.repeatMode) {
      case 'one':
        return 'pi pi-refresh';
      case 'all':
        return 'pi pi-refresh';
      default:
        return 'pi pi-refresh';
    }
  }
}
