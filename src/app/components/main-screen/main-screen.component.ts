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
  
  stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: 'pi pi-users', color: 'blue' },
    { title: 'Revenue', value: '$45,678', change: '+8%', icon: 'pi pi-dollar', color: 'green' },
    { title: 'Orders', value: '567', change: '+23%', icon: 'pi pi-shopping-cart', color: 'orange' },
    { title: 'Performance', value: '89%', change: '+5%', icon: 'pi pi-chart-line', color: 'purple' }
  ];

  recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created new order', time: '2 minutes ago', status: 'success' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '15 minutes ago', status: 'info' },
    { id: 3, user: 'Bob Johnson', action: 'Deleted product', time: '1 hour ago', status: 'warning' },
    { id: 4, user: 'Alice Brown', action: 'Added new user', time: '2 hours ago', status: 'success' }
  ];

  ngOnInit() {
    // Listen for sidebar collapse events
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
