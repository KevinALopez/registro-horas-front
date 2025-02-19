import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { TestingComponent } from './testing/testing.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent /* TestingComponent */,
    TestingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'registroHoras';
}
