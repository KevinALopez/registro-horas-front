import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() className: string = 'botonPro';
  @Input() text: string = 'Entrar';
  @Input() onClick!: () => void;
}
