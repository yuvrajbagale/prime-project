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
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
      badge: '5'
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      routerLink: '/analytics',
      badge: null
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/users',
      badge: '12'
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      routerLink: '/products',
      badge: null
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      routerLink: '/orders',
      badge: '3'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings',
      badge: null
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar toggled, isCollapsed:', this.isCollapsed);
    // Emit event to notify main screen
    const event = new CustomEvent('sidebar-collapsed', { 
      detail: { isCollapsed: this.isCollapsed } 
    });
    window.dispatchEvent(event);
  }

  isActive(route: string): boolean {
    // Simple active state check - you can enhance this with router
    return false;
  }
}
