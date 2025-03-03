import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css'
})
export class CustomPaginatorComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Output() page = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.page.emit(event);
  }
}
