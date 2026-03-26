import { Component } from '@angular/core';
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
  
  trendingSongs = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 3, title: 'Dance Monkey', artist: 'Tones and I' },
    { id: 4, title: 'Someone Like You', artist: 'Adele' },
    { id: 5, title: 'Starboy', artist: 'The Weeknd' },
    { id: 6, title: 'Perfect', artist: 'Ed Sheeran' }
  ];

  popularPlaylists = [
    { id: 1, name: 'Top 50 Bollywood', songCount: 50 },
    { id: 2, name: 'Romantic Hits', songCount: 25 },
    { id: 3, name: 'Workout Mix', songCount: 30 },
    { id: 4, name: 'Chill Vibes', songCount: 40 },
    { id: 5, name: 'Party Anthems', songCount: 35 }
  ];

  recommendedAlbums = [
    { id: 1, name: 'Divide', artist: 'Ed Sheeran' },
    { id: 2, name: 'After Hours', artist: 'The Weeknd' },
    { id: 3, name: '25', artist: 'Adele' },
    { id: 4, name: 'Fine Line', artist: 'Harry Styles' },
    { id: 5, name: 'Future Nostalgia', artist: 'Dua Lipa' },
    { id: 6, name: 'Positions', artist: 'Ariana Grande' }
  ];

  popularArtists = [
    { id: 1, name: 'Arijit Singh' },
    { id: 2, name: 'Neha Kakkar' },
    { id: 3, name: 'Badshah' },
    { id: 4, name: 'Shreya Ghoshal' },
    { id: 5, name: 'Honey Singh' },
    { id: 6, name: 'Sunidhi Chauhan' },
    { id: 7, name: 'Udit Narayan' },
    { id: 8, name: 'Alka Yagnik' }
  ];

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
}
