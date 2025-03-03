import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { ClassNameToTextPipe } from '../../utils/pipes/classname-to-text/class-name-to-text.pipe';
import { FormatDatePipe } from '../../utils/pipes/format-date/format-date.pipe';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, ClassNameToTextPipe],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  providers: [FormatDatePipe]
})
export class CustomTableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() pipeArgs: { [key: string]: any[] } = {};
  @Input() sortFeature: boolean = false;
  @Input() withNumber: boolean = false;
  @Output() matSortChange = new EventEmitter<Sort>();

  constructor(private formatDatePipe: FormatDatePipe) {}

  get headerColumns(): string[] {
    return this.withNumber ? ['no', ...this.columns] : this.columns;
  }

  transformColumn(column: string, value: any): any {
    const args = this.pipeArgs[column] || [];
    if (column === 'birthDate') {
      return this.formatDatePipe.transform(value, ...args);
    }
    return value;
  }
}
