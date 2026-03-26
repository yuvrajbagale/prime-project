import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlists = [
    {
      id: 1,
      name: 'My Favorite Songs',
      description: 'All my favorite tracks in one place',
      songCount: 25,
      duration: '1h 45m',
      isPublic: false,
      songs: [
        { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', duration: '3:54' },
        { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
        { id: 3, title: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming', duration: '3:29' }
      ]
    },
    {
      id: 2,
      name: 'Workout Mix',
      description: 'High energy songs for gym sessions',
      songCount: 30,
      duration: '2h 10m',
      isPublic: true,
      songs: [
        { id: 4, title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50' },
        { id: 5, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', duration: '4:30' }
      ]
    },
    {
      id: 3,
      name: 'Chill Vibes',
      description: 'Relaxing songs for evenings',
      songCount: 18,
      duration: '1h 15m',
      isPublic: false,
      songs: [
        { id: 6, title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45' }
      ]
    }
  ];

  selectedPlaylist: any = null;
  showCreateModal: boolean = false;
  newPlaylistName: string = '';
  newPlaylistDescription: string = '';
  newPlaylistIsPublic: boolean = false;

  selectPlaylist(playlist: any) {
    this.selectedPlaylist = playlist;
  }

  createPlaylist() {
    if (!this.newPlaylistName.trim()) return;

    const newPlaylist = {
      id: this.playlists.length + 1,
      name: this.newPlaylistName,
      description: this.newPlaylistDescription,
      songCount: 0,
      duration: '0m',
      isPublic: this.newPlaylistIsPublic,
      songs: []
    };

    this.playlists.unshift(newPlaylist);
    this.closeCreateModal();
  }

  deletePlaylist(playlistId: number) {
    this.playlists = this.playlists.filter(p => p.id !== playlistId);
    if (this.selectedPlaylist?.id === playlistId) {
      this.selectedPlaylist = null;
    }
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.newPlaylistName = '';
    this.newPlaylistDescription = '';
    this.newPlaylistIsPublic = false;
  }

  playSong(song: any) {
    console.log('Playing song:', song.title);
  }

  playPlaylist(playlist: any) {
    console.log('Playing playlist:', playlist.name);
  }

  removeFromPlaylist(playlistId: number, songId: number) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.songs = playlist.songs.filter(s => s.id !== songId);
      playlist.songCount = playlist.songs.length;
    }
  }

  togglePlaylistVisibility(playlistId: number) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.isPublic = !playlist.isPublic;
    }
  }
}
