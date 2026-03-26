import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  activeTab: 'all' | 'songs' | 'artists' | 'albums' | 'playlists' = 'all';
  
  searchResults = {
    all: [],
    songs: [],
    artists: [],
    albums: [],
    playlists: []
  };

  mockSongs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', duration: '3:54' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
    { id: 3, title: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming', duration: '3:29' },
    { id: 4, title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45' },
    { id: 5, title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50' }
  ];

  mockArtists = [
    { id: 1, name: 'Ed Sheeran', followers: '85.2M', image: 'pi-user' },
    { id: 2, name: 'The Weeknd', followers: '73.5M', image: 'pi-user' },
    { id: 3, name: 'Adele', followers: '68.1M', image: 'pi-user' },
    { id: 4, name: 'Arijit Singh', followers: '45.3M', image: 'pi-user' }
  ];

  mockAlbums = [
    { id: 1, name: 'Divide', artist: 'Ed Sheeran', year: 2017, songs: 12 },
    { id: 2, name: 'After Hours', artist: 'The Weeknd', year: 2020, songs: 14 },
    { id: 3, name: '21', artist: 'Adele', year: 2011, songs: 11 },
    { id: 4, name: 'Starboy', artist: 'The Weeknd', year: 2016, songs: 18 }
  ];

  mockPlaylists = [
    { id: 1, name: 'Top 50 Global', songs: 50, likes: '2.3M' },
    { id: 2, name: 'Chill Hits', songs: 75, likes: '1.8M' },
    { id: 3, name: 'Workout Mix', songs: 30, likes: '956K' },
    { id: 4, name: 'Romantic Hits', songs: 40, likes: '1.2M' }
  ];

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.clearResults();
      return;
    }

    const query = this.searchQuery.toLowerCase();
    
    this.searchResults.songs = this.mockSongs.filter(song => 
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );

    this.searchResults.artists = this.mockArtists.filter(artist => 
      artist.name.toLowerCase().includes(query)
    );

    this.searchResults.albums = this.mockAlbums.filter(album => 
      album.name.toLowerCase().includes(query) || 
      album.artist.toLowerCase().includes(query)
    );

    this.searchResults.playlists = this.mockPlaylists.filter(playlist => 
      playlist.name.toLowerCase().includes(query)
    );

    this.searchResults.all = [
      ...this.searchResults.songs.map(song => ({ ...song, type: 'song' })),
      ...this.searchResults.artists.map(artist => ({ ...artist, type: 'artist' })),
      ...this.searchResults.albums.map(album => ({ ...album, type: 'album' })),
      ...this.searchResults.playlists.map(playlist => ({ ...playlist, type: 'playlist' }))
    ];
  }

  clearResults() {
    this.searchResults = {
      all: [],
      songs: [],
      artists: [],
      albums: [],
      playlists: []
    };
  }

  switchTab(tab: 'all' | 'songs' | 'artists' | 'albums' | 'playlists') {
    this.activeTab = tab;
  }

  playSong(song: any) {
    console.log('Playing song:', song.title);
  }

  playAlbum(album: any) {
    console.log('Playing album:', album.name);
  }

  playPlaylist(playlist: any) {
    console.log('Playing playlist:', playlist.name);
  }

  followArtist(artist: any) {
    console.log('Following artist:', artist.name);
  }
}
