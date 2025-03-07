import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // <-- newly added

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule, // <-- updated
  ],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() width: string = '100%';

  value: string = '';

  ngOnInit(): void {
    this.calculateType();
  }

  calculateType(): string {
    if (this.type === 'date') {
      return 'date';
    }
    return 'text';
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
  }

  onFileChange(event: any): void {
    // this.value = event.value;
  }
  // New method to handle datepicker date changes
  onDateChange(event: any): void {
    this.value = event.value;
  }
}
