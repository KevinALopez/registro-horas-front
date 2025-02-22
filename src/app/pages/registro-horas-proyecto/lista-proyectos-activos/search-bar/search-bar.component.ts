import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output() onInput = new EventEmitter<string>();

  handleInput($event: any) {
    this.onInput.emit($event.target.value);
  }
}
