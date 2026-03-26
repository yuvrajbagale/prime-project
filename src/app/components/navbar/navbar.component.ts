import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Browse',
      icon: 'pi pi-compass',
      routerLink: '/browse'
    },
    {
      label: 'Library',
      icon: 'pi pi-book',
      routerLink: '/library'
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    const event = new CustomEvent('toggle-sidebar');
    window.dispatchEvent(event);
  }

  showNotifications() {
    console.log('Show notifications');
  }

  showUserProfile() {
    console.log('Show user profile');
  }

  upgradeToPro() {
    console.log('Upgrade to Pro clicked');
  }
}
