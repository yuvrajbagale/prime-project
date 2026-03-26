import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TableModule, InputTextModule, FormsModule],
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent {
  searchValue = '';
  isSidebarCollapsed = false;
  
  @Output() songSelected = new EventEmitter<any>();
  
  trendingSongs = [
    { 
      id: 1, 
      title: 'Shape of You', 
      artist: 'Ed Sheeran',
      album: 'Divide',
      duration: '3:53',
      genre: 'Pop',
      year: 2017,
      plays: '3.2B',
      albumArt: 'https://picsum.photos/seed/shapeofyou/300/300.jpg'
    },
    { 
      id: 2, 
      title: 'Blinding Lights', 
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      genre: 'Synth-pop',
      year: 2020,
      plays: '2.8B',
      albumArt: 'https://picsum.photos/seed/blindinglights/300/300.jpg'
    },
    { 
      id: 3, 
      title: 'Dance Monkey', 
      artist: 'Tones and I',
      album: 'The Kids Are Coming',
      duration: '3:29',
      genre: 'Electropop',
      year: 2019,
      plays: '2.5B',
      albumArt: 'https://picsum.photos/seed/dancemonkey/300/300.jpg'
    },
    { 
      id: 4, 
      title: 'Someone Like You', 
      artist: 'Adele',
      album: '21',
      duration: '4:45',
      genre: 'Soul',
      year: 2011,
      plays: '2.1B',
      albumArt: 'https://picsum.photos/seed/someonelikeyou/300/300.jpg'
    },
    { 
      id: 5, 
      title: 'Starboy', 
      artist: 'The Weeknd ft. Daft Punk',
      album: 'Starboy',
      duration: '3:50',
      genre: 'R&B',
      year: 2016,
      plays: '1.9B',
      albumArt: 'https://picsum.photos/seed/starboy/300/300.jpg'
    },
    { 
      id: 6, 
      title: 'Perfect', 
      artist: 'Ed Sheeran',
      album: 'Divide',
      duration: '4:23',
      genre: 'Pop',
      year: 2017,
      plays: '2.3B',
      albumArt: 'https://picsum.photos/seed/perfect/300/300.jpg'
    }
  ];

  popularPlaylists = [
    { 
      id: 1, 
      name: 'Top 50 Bollywood', 
      songCount: 50,
      description: 'Hottest Bollywood tracks right now',
      duration: '3h 45min',
      coverArt: 'https://picsum.photos/seed/bollywood50/300/300.jpg',
      songs: [
        { title: 'Kesariya', artist: 'Arijit Singh', duration: '4:28' },
        { title: 'Jhoome Jo Pathaan', artist: 'Arijit Singh', duration: '3:25' },
        { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal', duration: '3:32' }
      ]
    },
    { 
      id: 2, 
      name: 'Romantic Hits', 
      songCount: 25,
      description: 'Perfect songs for romantic moments',
      duration: '1h 55min',
      coverArt: 'https://picsum.photos/seed/romantic/300/300.jpg',
      songs: [
        { title: 'Tum Hi Ho', artist: 'Arijit Singh', duration: '4:23' },
        { title: 'Mera Yaar', artist: 'A.R. Rahman', duration: '3:45' },
        { title: 'Sanam Re', artist: 'Arijit Singh', duration: '4:12' }
      ]
    },
    { 
      id: 3, 
      name: 'Workout Mix', 
      songCount: 30,
      description: 'High energy tracks for your workout',
      duration: '2h 10min',
      coverArt: 'https://picsum.photos/seed/workout/300/300.jpg',
      songs: [
        { title: 'Sauda Khara Khara', artist: 'Dhvani Bhanushali', duration: '3:15' },
        { title: 'Udd Jaa', artist: 'Diljit Dosanjh', duration: '3:28' },
        { title: 'Naa Ready', artist: 'Anirudh Ravichander', duration: '3:42' }
      ]
    },
    { 
      id: 4, 
      name: 'Chill Vibes', 
      songCount: 40,
      description: 'Relaxing tracks for unwinding',
      duration: '2h 45min',
      coverArt: 'https://picsum.photos/seed/chill/300/300.jpg',
      songs: [
        { title: 'Chaand Baaliyan', artist: 'Aditya A', duration: '3:18' },
        { title: 'Phir Aur Kya Chahiye', artist: 'Vishal Mishra', duration: '3:35' },
        { title: 'O Maahi', artist: 'Arijit Singh', duration: '4:02' }
      ]
    },
    { 
      id: 5, 
      name: 'Party Anthems', 
      songCount: 35,
      description: 'Ultimate party playlist',
      duration: '2h 30min',
      coverArt: 'https://picsum.photos/seed/party/300/300.jpg',
      songs: [
        { title: 'Lut Put Gaya', artist: 'Arijit Singh', duration: '3:28' },
        { title: 'Jamnapaar', artist: 'Divine', duration: '3:15' },
        { title: 'Tauba Tauba', artist: 'Karan Aujla', duration: '3:22' }
      ]
    }
  ];

  recommendedAlbums = [
    { 
      id: 1, 
      name: 'Divide', 
      artist: 'Ed Sheeran',
      year: 2017,
      songCount: 12,
      duration: '46min',
      genre: 'Pop',
      coverArt: 'https://picsum.photos/seed/divide/300/300.jpg',
      songs: ['Shape of You', 'Perfect', 'Galway Girl', 'Castle on the Hill']
    },
    { 
      id: 2, 
      name: 'After Hours', 
      artist: 'The Weeknd',
      year: 2020,
      songCount: 14,
      duration: '56min',
      genre: 'R&B',
      coverArt: 'https://picsum.photos/seed/afterhours/300/300.jpg',
      songs: ['Blinding Lights', 'Heartless', 'In Your Eyes', 'Save Your Tears']
    },
    { 
      id: 3, 
      name: '25', 
      artist: 'Adele',
      year: 2015,
      songCount: 11,
      duration: '48min',
      genre: 'Soul',
      coverArt: 'https://picsum.photos/seed/25album/300/300.jpg',
      songs: ['Hello', 'Someone Like You', 'When We Were Young', 'Send My Love']
    },
    { 
      id: 4, 
      name: 'Fine Line', 
      artist: 'Harry Styles',
      year: 2019,
      songCount: 12,
      duration: '47min',
      genre: 'Pop Rock',
      coverArt: 'https://picsum.photos/seed/fineLine/300/300.jpg',
      songs: ['Watermelon Sugar', 'Adore You', 'Lights Up', 'Falling']
    },
    { 
      id: 5, 
      name: 'Future Nostalgia', 
      artist: 'Dua Lipa',
      year: 2020,
      songCount: 11,
      duration: '37min',
      genre: 'Pop',
      coverArt: 'https://picsum.photos/seed/futurnostalgia/300/300.jpg',
      songs: ['Don\'t Start Now', 'Physical', 'Break My Heart', 'Levitating']
    },
    { 
      id: 6, 
      name: 'Positions', 
      artist: 'Ariana Grande',
      year: 2020,
      songCount: 14,
      duration: '41min',
      genre: 'R&B',
      coverArt: 'https://picsum.photos/seed/positions/300/300.jpg',
      songs: ['positions', '34+35', 'motive', 'off the table']
    }
  ];

  popularArtists = [
    { 
      id: 1, 
      name: 'Arijit Singh',
      genre: 'Bollywood',
      monthlyListeners: '45.2M',
      followers: '2.1M',
      image: 'https://picsum.photos/seed/arijit/200/200.jpg'
    },
    { 
      id: 2, 
      name: 'Neha Kakkar',
      genre: 'Bollywood',
      monthlyListeners: '38.7M',
      followers: '1.8M',
      image: 'https://picsum.photos/seed/neha/200/200.jpg'
    },
    { 
      id: 3, 
      name: 'Badshah',
      genre: 'Hip Hop',
      monthlyListeners: '32.1M',
      followers: '1.5M',
      image: 'https://picsum.photos/seed/badshah/200/200.jpg'
    },
    { 
      id: 4, 
      name: 'Shreya Ghoshal',
      genre: 'Classical',
      monthlyListeners: '29.8M',
      followers: '1.3M',
      image: 'https://picsum.photos/seed/shreya/200/200.jpg'
    },
    { 
      id: 5, 
      name: 'Honey Singh',
      genre: 'Hip Hop',
      monthlyListeners: '28.4M',
      followers: '1.2M',
      image: 'https://picsum.photos/seed/honey/200/200.jpg'
    },
    { 
      id: 6, 
      name: 'Sunidhi Chauhan',
      genre: 'Bollywood',
      monthlyListeners: '25.6M',
      followers: '1.1M',
      image: 'https://picsum.photos/seed/sunidhi/200/200.jpg'
    },
    { 
      id: 7, 
      name: 'Udit Narayan',
      genre: 'Classical',
      monthlyListeners: '22.3M',
      followers: '980K',
      image: 'https://picsum.photos/seed/udit/200/200.jpg'
    },
    { 
      id: 8, 
      name: 'Alka Yagnik',
      genre: 'Bollywood',
      monthlyListeners: '20.1M',
      followers: '890K',
      image: 'https://picsum.photos/seed/alka/200/200.jpg'
    }
  ];

  // Additional data for radio stations
  radioStations = [
    { 
      id: 1, 
      name: 'Radio Mirchi', 
      genre: 'Top Hits',
      listeners: '1.2M',
      currentlyPlaying: 'Kesariya - Arijit Singh',
      logo: 'https://picsum.photos/seed/mirchi/200/200.jpg'
    },
    { 
      id: 2, 
      name: 'Radio City', 
      genre: 'Bollywood',
      listeners: '980K',
      currentlyPlaying: 'Jhoome Jo Pathaan - Arijit Singh',
      logo: 'https://picsum.photos/seed/city/200/200.jpg'
    },
    { 
      id: 3, 
      name: 'Red FM', 
      genre: 'Mix',
      listeners: '850K',
      currentlyPlaying: 'Lut Put Gaya - Arijit Singh',
      logo: 'https://picsum.photos/seed/redfm/200/200.jpg'
    },
    { 
      id: 4, 
      name: 'FM Rainbow', 
      genre: 'Classic',
      listeners: '720K',
      currentlyPlaying: 'Tum Hi Ho - Arijit Singh',
      logo: 'https://picsum.photos/seed/rainbow/200/200.jpg'
    },
    { 
      id: 5, 
      name: 'Radio One', 
      genre: 'International',
      listeners: '650K',
      currentlyPlaying: 'Shape of You - Ed Sheeran',
      logo: 'https://picsum.photos/seed/radioone/200/200.jpg'
    }
  ];

  // Recently played songs
  recentlyPlayed = [
    { 
      id: 1, 
      title: 'Kesariya', 
      artist: 'Arijit Singh',
      album: 'Brahmāstra',
      duration: '4:28',
      playedAt: '2 hours ago',
      albumArt: 'https://picsum.photos/seed/kesariya/300/300.jpg'
    },
    { 
      id: 2, 
      title: 'Chaand Baaliyan', 
      artist: 'Aditya A',
      album: 'Chaand Baaliyan',
      duration: '3:18',
      playedAt: '5 hours ago',
      albumArt: 'https://picsum.photos/seed/chaand/300/300.jpg'
    },
    { 
      id: 3, 
      title: 'O Maahi', 
      artist: 'Arijit Singh',
      album: 'Dunki',
      duration: '4:02',
      playedAt: '1 day ago',
      albumArt: 'https://picsum.photos/seed/omaahi/300/300.jpg'
    }
  ];

  // Mood categories with more data
  moodCategories = [
    { 
      name: 'Romance', 
      color: 'from-pink-400 to-red-500',
      icon: 'pi pi-heart',
      songCount: 1250,
      description: 'Love songs for every mood'
    },
    { 
      name: 'Party', 
      color: 'from-purple-400 to-indigo-500',
      icon: 'pi pi-bolt',
      songCount: 890,
      description: 'High energy party tracks'
    },
    { 
      name: 'Bhakti', 
      color: 'from-green-400 to-blue-500',
      icon: 'pi pi-leaf',
      songCount: 650,
      description: 'Spiritual and devotional songs'
    },
    { 
      name: 'Workout', 
      color: 'from-yellow-400 to-orange-500',
      icon: 'pi pi-sun',
      songCount: 420,
      description: 'Motivational workout music'
    },
    { 
      name: 'Chill', 
      color: 'from-blue-400 to-purple-500',
      icon: 'pi pi-moon',
      songCount: 780,
      description: 'Relaxing and peaceful tracks'
    },
    { 
      name: 'Energy', 
      color: 'from-red-400 to-pink-500',
      icon: 'pi pi-fire',
      songCount: 920,
      description: 'Boost your energy levels'
    }
  ];

  // Current playing song (for demo)
  currentSong = {
    title: 'Kesariya',
    artist: 'Arijit Singh',
    album: 'Brahmāstra',
    duration: '4:28',
    currentTime: '1:23',
    albumArt: 'https://picsum.photos/seed/kesariya/300/300.jpg',
    isPlaying: true
  };

  ngOnInit() {
    window.addEventListener('sidebar-collapsed', this.handleSidebarCollapse.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('sidebar-collapsed', this.handleSidebarCollapse.bind(this));
  }

  handleSidebarCollapse(event: any) {
    this.isSidebarCollapsed = event.detail.isCollapsed;
  }

  getMainWidth(): string {
    return this.isSidebarCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 16rem)';
  }

  // Interactive methods
  playSong(song: any) {
    this.currentSong = {
      ...song,
      currentTime: '0:00',
      isPlaying: true
    };
    this.songSelected.emit(song);
    console.log('Playing:', song.title);
  }

  pauseSong() {
    this.currentSong.isPlaying = false;
    console.log('Paused:', this.currentSong.title);
  }

  likeSong(song: any) {
    console.log('Liked:', song.title);
  }

  addToPlaylist(song: any) {
    console.log('Added to playlist:', song.title);
  }

  shufflePlaylist(playlist: any) {
    console.log('Shuffled playlist:', playlist.name);
  }

  followArtist(artist: any) {
    console.log('Following artist:', artist.name);
  }
}
