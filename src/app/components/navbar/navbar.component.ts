import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { User } from '../../services/music-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, AvatarModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() currentUser: User | null = null;
  @Output() logout = new EventEmitter<void>();
  @Output() showProfile = new EventEmitter<void>();
  
  showUserMenu = false;
  
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => console.log('Navigate to Home')
    },
    {
      label: 'Browse',
      icon: 'pi pi-compass',
      command: () => console.log('Navigate to Browse')
    },
    {
      label: 'Library',
      icon: 'pi pi-book',
      command: () => console.log('Navigate to Library')
    }
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.showProfile.emit()
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => console.log('Navigate to Settings')
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout.emit()
    }
  ];


  toggleSidebar() {
    const event = new CustomEvent('toggle-sidebar');
    window.dispatchEvent(event);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  showNotifications() {
    console.log('Show notifications');
  }

  upgradeToPro() {
    console.log('Upgrade to Pro clicked');
  }
}
