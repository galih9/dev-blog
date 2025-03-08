import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() onClick: (e?: any) => void = (e?: any) => {};
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() customButtonClicked = new EventEmitter<void>();

  handleClick(e?: any) {
    this.customButtonClicked.emit(e);
    if (this.onClick) {
      this.onClick(e);
    }
  }
}
