import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-nav-sidebar',
  imports: [RouterLink],
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
})
export class NavSidebarComponent {
  router = inject(Router)
  usersService = inject(UsersService)
  @Input() displaySideNavbar = false;
  @Output() onCloseSideNavbar = new EventEmitter();
  @Output() onLogout = new EventEmitter();

  logout() {
    this.onLogout.emit();
  }

  closeSideNavbar() {
    this.displaySideNavbar = false;
    this.onCloseSideNavbar.emit();
  }
}
