import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavSidebarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  router = inject(Router);
  isNavSidebarOpen = false;

  logout() {
    localStorage.removeItem('store_token');
    this.router.navigateByUrl('/login');
  }

  openSideNavbar() {
    this.isNavSidebarOpen = true;
  }

  closeSideNavbar() {
    this.isNavSidebarOpen = false;
  }
}
