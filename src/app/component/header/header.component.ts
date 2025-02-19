import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isModalOpen = true;  // Forzar que el modal esté siempre abierto para pruebas

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    console.log("Cerrando sesión...");
  }
}
