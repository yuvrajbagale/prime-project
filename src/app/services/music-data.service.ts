import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  durationString: string;
  genre: string;
  year: number;
  plays: number;
  albumArt: string;
  audioUrl?: string;
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  coverArt: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  totalDuration: number;
  songCount: number;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  year: number;
  songCount: number;
  duration: number;
  durationString: string;
  genre: string;
  coverArt: string;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  monthlyListeners: number;
  followers: number;
  image: string;
  bio: string;
  albums: Album[];
  isFollowed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  premium: boolean;
  joinedDate: Date;
  favoriteSongs: string[];
  playlists: string[];
  followedArtists: string[];
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  listeners: number;
  currentlyPlaying: string;
  logo: string;
  isLive: boolean;
}

export interface MoodCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  songCount: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(50);
  private playlistSubject = new BehaviorSubject<Song[]>([]);
  private favoriteSongsSubject = new BehaviorSubject<Set<string>>(new Set());
  private recentlyPlayedSubject = new BehaviorSubject<Song[]>([]);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentSong$ = this.currentSongSubject.asObservable();
  public isPlaying$ = this.isPlayingSubject.asObservable();
  public currentTime$ = this.currentTimeSubject.asObservable();
  public volume$ = this.volumeSubject.asObservable();
  public playlist$ = this.playlistSubject.asObservable();
  public favoriteSongs$ = this.favoriteSongsSubject.asObservable();
  public recentlyPlayed$ = this.recentlyPlayedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  private mockSongs: Song[] = [
    { 
      id: '1', 
      title: 'Kesariya', 
      artist: 'Arijit Singh',
      album: 'Brahmāstra',
      duration: 268,
      durationString: '4:28',
      genre: 'Bollywood',
      year: 2022,
      plays: 3200000000,
      albumArt: 'https://picsum.photos/seed/kesariya/300/300.jpg',
      audioUrl: 'https://example.com/audio/kesariya.mp3'
    },
    { 
      id: '2', 
      title: 'Shape of You', 
      artist: 'Ed Sheeran',
      album: 'Divide',
      duration: 233,
      durationString: '3:53',
      genre: 'Pop',
      year: 2017,
      plays: 3500000000,
      albumArt: 'https://picsum.photos/seed/shapeofyou/300/300.jpg',
      audioUrl: 'https://example.com/audio/shapeofyou.mp3'
    },
    { 
      id: '3', 
      title: 'Blinding Lights', 
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      durationString: '3:20',
      genre: 'Synth-pop',
      year: 2020,
      plays: 2800000000,
      albumArt: 'https://picsum.photos/seed/blindinglights/300/300.jpg',
      audioUrl: 'https://example.com/audio/blindinglights.mp3'
    },
    { 
      id: '4', 
      title: 'Chaand Baaliyan', 
      artist: 'Aditya A',
      album: 'Chaand Baaliyan',
      duration: 198,
      durationString: '3:18',
      genre: 'Indie Pop',
      year: 2023,
      plays: 850000000,
      albumArt: 'https://picsum.photos/seed/chaand/300/300.jpg',
      audioUrl: 'https://example.com/audio/chaand.mp3'
    },
    { 
      id: '5', 
      title: 'Dance Monkey', 
      artist: 'Tones and I',
      album: 'The Kids Are Coming',
      duration: 209,
      durationString: '3:29',
      genre: 'Electropop',
      year: 2019,
      plays: 2500000000,
      albumArt: 'https://picsum.photos/seed/dancemonkey/300/300.jpg',
      audioUrl: 'https://example.com/audio/dancemonkey.mp3'
    },
    { 
      id: '6', 
      title: 'Jhoome Jo Pathaan', 
      artist: 'Arijit Singh',
      album: 'Pathaan',
      duration: 205,
      durationString: '3:25',
      genre: 'Bollywood',
      year: 2023,
      plays: 1200000000,
      albumArt: 'https://picsum.photos/seed/jhoome/300/300.jpg',
      audioUrl: 'https://example.com/audio/jhoome.mp3'
    },
    { 
      id: '7', 
      title: 'Someone Like You', 
      artist: 'Adele',
      album: '21',
      duration: 285,
      durationString: '4:45',
      genre: 'Soul',
      year: 2011,
      plays: 2100000000,
      albumArt: 'https://picsum.photos/seed/someonelikeyou/300/300.jpg',
      audioUrl: 'https://example.com/audio/someonelikeyou.mp3'
    },
    { 
      id: '8', 
      title: 'Starboy', 
      artist: 'The Weeknd ft. Daft Punk',
      album: 'Starboy',
      duration: 230,
      durationString: '3:50',
      genre: 'R&B',
      year: 2016,
      plays: 1900000000,
      albumArt: 'https://picsum.photos/seed/starboy/300/300.jpg',
      audioUrl: 'https://example.com/audio/starboy.mp3'
    },
    { 
      id: '9', 
      title: 'Perfect', 
      artist: 'Ed Sheeran',
      album: 'Divide',
      duration: 263,
      durationString: '4:23',
      genre: 'Pop',
      year: 2017,
      plays: 2300000000,
      albumArt: 'https://picsum.photos/seed/perfect/300/300.jpg',
      audioUrl: 'https://example.com/audio/perfect.mp3'
    },
    { 
      id: '10', 
      title: 'O Maahi', 
      artist: 'Arijit Singh',
      album: 'Dunki',
      duration: 242,
      durationString: '4:02',
      genre: 'Bollywood',
      year: 2023,
      plays: 980000000,
      albumArt: 'https://picsum.photos/seed/omaahi/300/300.jpg',
      audioUrl: 'https://example.com/audio/omaahi.mp3'
    }
  ];

  private mockPlaylists: Playlist[] = [
    { 
      id: '1', 
      name: 'Top 50 Bollywood', 
      description: 'Hottest Bollywood tracks right now',
      songs: this.mockSongs.filter(s => s.genre === 'Bollywood').slice(0, 50),
      coverArt: 'https://picsum.photos/seed/bollywood50/300/300.jpg',
      isPublic: true,
      createdBy: 'MelodyHub',
      createdAt: new Date('2023-01-15'),
      totalDuration: 13500,
      songCount: 50
    },
    { 
      id: '2', 
      name: 'Romantic Hits', 
      description: 'Perfect songs for romantic moments',
      songs: this.mockSongs.filter(s => s.genre.includes('Pop') || s.genre === 'Soul').slice(0, 25),
      coverArt: 'https://picsum.photos/seed/romantic/300/300.jpg',
      isPublic: true,
      createdBy: 'MelodyHub',
      createdAt: new Date('2023-02-20'),
      totalDuration: 6900,
      songCount: 25
    },
    { 
      id: '3', 
      name: 'Workout Mix', 
      description: 'High energy tracks for your workout',
      songs: this.mockSongs.filter(s => s.genre === 'Electropop' || s.genre === 'Synth-pop').slice(0, 30),
      coverArt: 'https://picsum.photos/seed/workout/300/300.jpg',
      isPublic: true,
      createdBy: 'MelodyHub',
      createdAt: new Date('2023-03-10'),
      totalDuration: 7800,
      songCount: 30
    }
  ];

  private mockArtists: Artist[] = [
    { 
      id: '1', 
      name: 'Arijit Singh',
      genre: 'Bollywood',
      monthlyListeners: 45200000,
      followers: 2100000,
      image: 'https://picsum.photos/seed/arijit/200/200.jpg',
      bio: 'One of the most versatile and successful playback singers in Indian cinema.',
      albums: [],
      isFollowed: false
    },
    { 
      id: '2', 
      name: 'Ed Sheeran',
      genre: 'Pop',
      monthlyListeners: 82300000,
      followers: 45000000,
      image: 'https://picsum.photos/seed/ed sheeran/200/200.jpg',
      bio: 'English singer-songwriter known for his pop and acoustic-style music.',
      albums: [],
      isFollowed: false
    },
    { 
      id: '3', 
      name: 'The Weeknd',
      genre: 'R&B',
      monthlyListeners: 78900000,
      followers: 38000000,
      image: 'https://picsum.photos/seed/theweeknd/200/200.jpg',
      bio: 'Canadian singer, songwriter, and record producer known for his dark R&B music.',
      albums: [],
      isFollowed: false
    }
  ];

  private mockAlbums: Album[] = [
    { 
      id: '1', 
      name: 'Divide', 
      artist: 'Ed Sheeran',
      year: 2017,
      songCount: 12,
      duration: 2760,
      durationString: '46min',
      genre: 'Pop',
      coverArt: 'https://picsum.photos/seed/divide/300/300.jpg',
      songs: this.mockSongs.filter(s => s.artist === 'Ed Sheeran')
    },
    { 
      id: '2', 
      name: 'After Hours', 
      artist: 'The Weeknd',
      year: 2020,
      songCount: 14,
      duration: 3360,
      durationString: '56min',
      genre: 'R&B',
      coverArt: 'https://picsum.photos/seed/afterhours/300/300.jpg',
      songs: this.mockSongs.filter(s => s.artist === 'The Weeknd')
    }
  ];

  private mockRadioStations: RadioStation[] = [
    { 
      id: '1', 
      name: 'Radio Mirchi', 
      genre: 'Top Hits',
      listeners: 1200000,
      currentlyPlaying: 'Kesariya - Arijit Singh',
      logo: 'https://picsum.photos/seed/mirchi/200/200.jpg',
      isLive: true
    },
    { 
      id: '2', 
      name: 'Radio City', 
      genre: 'Bollywood',
      listeners: 980000,
      currentlyPlaying: 'Jhoome Jo Pathaan - Arijit Singh',
      logo: 'https://picsum.photos/seed/city/200/200.jpg',
      isLive: true
    }
  ];

  private mockMoodCategories: MoodCategory[] = [
    { 
      id: '1',
      name: 'Romance', 
      color: 'from-pink-400 to-red-500',
      icon: 'pi pi-heart',
      songCount: 1250,
      description: 'Love songs for every mood'
    },
    { 
      id: '2',
      name: 'Party', 
      color: 'from-purple-400 to-indigo-500',
      icon: 'pi pi-bolt',
      songCount: 890,
      description: 'High energy party tracks'
    },
    { 
      id: '3',
      name: 'Workout', 
      color: 'from-yellow-400 to-orange-500',
      icon: 'pi pi-sun',
      songCount: 420,
      description: 'Motivational workout music'
    }
  ];

  private mockUser: User = {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/seed/user/100/100.jpg',
    premium: false,
    joinedDate: new Date('2022-08-15'),
    favoriteSongs: [],
    playlists: [],
    followedArtists: []
  };

  constructor() {
    this.loadFromLocalStorage();
    this.initializeUser();
  }

  private loadFromLocalStorage(): void {
    const favorites = localStorage.getItem('favoriteSongs');
    const recentlyPlayed = localStorage.getItem('recentlyPlayed');
    const user = localStorage.getItem('currentUser');

    if (favorites) {
      this.favoriteSongsSubject.next(new Set(JSON.parse(favorites)));
    }

    if (recentlyPlayed) {
      const songs = JSON.parse(recentlyPlayed);
      this.recentlyPlayedSubject.next(songs);
    }

    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('favoriteSongs', JSON.stringify(Array.from(this.favoriteSongsSubject.value)));
    localStorage.setItem('recentlyPlayed', JSON.stringify(this.recentlyPlayedSubject.value));
    if (this.currentUserSubject.value) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
    }
  }

  private initializeUser(): void {
    if (!this.currentUserSubject.value) {
      this.currentUserSubject.next(this.mockUser);
    }
  }

  // Getters
  getTrendingSongs(): Observable<Song[]> {
    return of(this.mockSongs.sort((a, b) => b.plays - a.plays)).pipe(delay(500));
  }

  getPopularPlaylists(): Observable<Playlist[]> {
    return of(this.mockPlaylists).pipe(delay(500));
  }

  getRecommendedAlbums(): Observable<Album[]> {
    return of(this.mockAlbums).pipe(delay(500));
  }

  getPopularArtists(): Observable<Artist[]> {
    return of(this.mockArtists.sort((a, b) => b.monthlyListeners - a.monthlyListeners)).pipe(delay(500));
  }

  getRadioStations(): Observable<RadioStation[]> {
    return of(this.mockRadioStations).pipe(delay(500));
  }

  getMoodCategories(): Observable<MoodCategory[]> {
    return of(this.mockMoodCategories).pipe(delay(500));
  }

  searchSongs(query: string): Observable<Song[]> {
    const filtered = this.mockSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  searchArtists(query: string): Observable<Artist[]> {
    const filtered = this.mockArtists.filter(artist => 
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  searchAlbums(query: string): Observable<Album[]> {
    const filtered = this.mockAlbums.filter(album => 
      album.name.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  // Player Controls
  playSong(song: Song): void {
    this.currentSongSubject.next(song);
    this.isPlayingSubject.next(true);
    this.currentTimeSubject.next(0);
    this.addToRecentlyPlayed(song);
  }

  pauseSong(): void {
    this.isPlayingSubject.next(false);
  }

  resumeSong(): void {
    this.isPlayingSubject.next(true);
  }

  setCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
  }

  setVolume(volume: number): void {
    this.volumeSubject.next(volume);
  }

  // Favorites
  toggleFavorite(songId: string): void {
    const favorites = new Set(this.favoriteSongsSubject.value);
    if (favorites.has(songId)) {
      favorites.delete(songId);
    } else {
      favorites.add(songId);
    }
    this.favoriteSongsSubject.next(favorites);
    this.saveToLocalStorage();
  }

  isFavorite(songId: string): boolean {
    return this.favoriteSongsSubject.value.has(songId);
  }

  getFavoriteSongs(): Observable<Song[]> {
    const favoriteIds = Array.from(this.favoriteSongsSubject.value);
    const favoriteSongs = this.mockSongs.filter(song => favoriteIds.includes(song.id));
    return of(favoriteSongs);
  }

  // Recently Played
  addToRecentlyPlayed(song: Song): void {
    const recentlyPlayed = [...this.recentlyPlayedSubject.value];
    const existingIndex = recentlyPlayed.findIndex(s => s.id === song.id);
    
    if (existingIndex > -1) {
      recentlyPlayed.splice(existingIndex, 1);
    }
    
    recentlyPlayed.unshift(song);
    
    if (recentlyPlayed.length > 50) {
      recentlyPlayed.splice(50);
    }
    
    this.recentlyPlayedSubject.next(recentlyPlayed);
    this.saveToLocalStorage();
  }

  // Playlist Management
  createPlaylist(name: string, description: string): Playlist {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
      coverArt: 'https://picsum.photos/seed/playlist' + Date.now() + '/300/300.jpg',
      isPublic: false,
      createdBy: this.currentUserSubject.value?.name || 'User',
      createdAt: new Date(),
      totalDuration: 0,
      songCount: 0
    };
    
    this.mockPlaylists.push(newPlaylist);
    return newPlaylist;
  }

  addToPlaylist(playlistId: string, song: Song): void {
    const playlist = this.mockPlaylists.find(p => p.id === playlistId);
    if (playlist && !playlist.songs.find(s => s.id === song.id)) {
      playlist.songs.push(song);
      playlist.songCount = playlist.songs.length;
      playlist.totalDuration = playlist.songs.reduce((total, s) => total + s.duration, 0);
    }
  }

  removeFromPlaylist(playlistId: string, songId: string): void {
    const playlist = this.mockPlaylists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.songs = playlist.songs.filter(s => s.id !== songId);
      playlist.songCount = playlist.songs.length;
      playlist.totalDuration = playlist.songs.reduce((total, s) => total + s.duration, 0);
    }
  }

  deletePlaylist(playlistId: string): void {
    const index = this.mockPlaylists.findIndex(p => p.id === playlistId);
    if (index > -1) {
      this.mockPlaylists.splice(index, 1);
    }
  }

  // Artist Management
  followArtist(artistId: string): void {
    const artist = this.mockArtists.find(a => a.id === artistId);
    if (artist) {
      artist.isFollowed = true;
      const user = this.currentUserSubject.value;
      if (user && !user.followedArtists.includes(artistId)) {
        user.followedArtists.push(artistId);
        this.currentUserSubject.next(user);
        this.saveToLocalStorage();
      }
    }
  }

  unfollowArtist(artistId: string): void {
    const artist = this.mockArtists.find(a => a.id === artistId);
    if (artist) {
      artist.isFollowed = false;
      const user = this.currentUserSubject.value;
      if (user) {
        user.followedArtists = user.followedArtists.filter(id => id !== artistId);
        this.currentUserSubject.next(user);
        this.saveToLocalStorage();
      }
    }
  }

  // User Management
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  updateUserProfile(updates: Partial<User>): void {
    const user = this.currentUserSubject.value;
    if (user) {
      Object.assign(user, updates);
      this.currentUserSubject.next(user);
      this.saveToLocalStorage();
    }
  }

  // Recommendations
  getRecommendedSongs(): Observable<Song[]> {
    const user = this.currentUserSubject.value;
    if (!user) return of([]);
    
    const favoriteGenres = this.mockSongs
      .filter(song => user.favoriteSongs.includes(song.id))
      .map(song => song.genre);
    
    const recommended = this.mockSongs
      .filter(song => favoriteGenres.includes(song.genre) && !user.favoriteSongs.includes(song.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    return of(recommended).pipe(delay(500));
  }
}
