import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    CardModule,
    InputTextModule,
    TableModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    MainScreenComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'component-layout';
  isMobileMenuOpen = false;

  ngOnInit() {
    window.addEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('toggle-sidebar', this.toggleMobileMenu.bind(this));
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
