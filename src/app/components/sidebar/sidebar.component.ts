import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  
  menuItems = [
    {
      label: 'Trending Songs',
      icon: 'pi pi-fire',
      routerLink: '/trending',
      badge: 'New'
    },
    {
      label: 'New Songs',
      icon: 'pi pi-plus-circle',
      routerLink: '/new-songs',
      badge: null
    },
    {
      label: 'Old Songs',
      icon: 'pi pi-clock',
      routerLink: '/old-songs',
      badge: null
    },
    {
      label: 'Album',
      icon: 'pi pi-disc',
      routerLink: '/albums',
      badge: null
    },
    {
      label: 'Radio',
      icon: 'pi pi-broadcast',
      routerLink: '/radio',
      badge: null
    },
    {
      label: 'My Music',
      icon: 'pi pi-heart',
      routerLink: '/my-music',
      badge: null
    },
    {
      label: 'Liked Songs',
      icon: 'pi pi-heart-fill',
      routerLink: '/liked-songs',
      badge: null
    },
    {
      label: 'History',
      icon: 'pi pi-history',
      routerLink: '/history',
      badge: null
    }
  ];

  musicCategories = [
    { name: 'Shades of Love', color: '#EC4899', routerLink: '/category/shades-of-love' },
    { name: 'Party', color: '#8B5CF6', routerLink: '/category/party' },
    { name: 'Romance', color: '#F59E0B', routerLink: '/category/romance' },
    { name: '90s & 2000s', color: '#10B981', routerLink: '/category/90s-2000s' },
    { name: 'Bhakti', color: '#F97316', routerLink: '/category/bhakti' },
    { name: 'Indie', color: '#6366F1', routerLink: '/category/indie' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar toggled, isCollapsed:', this.isCollapsed);
    const event = new CustomEvent('sidebar-collapsed', { 
      detail: { isCollapsed: this.isCollapsed } 
    });
    window.dispatchEvent(event);
  }

  isActive(route: string): boolean {
    return false;
  }
}
