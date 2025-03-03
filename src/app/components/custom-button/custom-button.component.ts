import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  imports: [MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css',
})
export class CustomButtonComponent {
  @Input() label: string = '';
  @Input() onClick: () => void = () => {};
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
