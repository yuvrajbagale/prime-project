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
    MusicPlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Gaana Clone';
  isMobileMenuOpen = false;
  sidebarCollapsed = false;

  ngOnInit() {
    window.addEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
    window.addEventListener('sidebar-collapsed', this.onSidebarCollapsed.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
    window.removeEventListener('sidebar-collapsed', this.onSidebarCollapsed.bind(this));
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSidebarCollapsed(event: any) {
    this.sidebarCollapsed = event.detail.isCollapsed;
  }
}
