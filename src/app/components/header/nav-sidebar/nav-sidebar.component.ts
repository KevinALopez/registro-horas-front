import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-sidebar',
  imports: [RouterLink],
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
})
export class NavSidebarComponent {
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
