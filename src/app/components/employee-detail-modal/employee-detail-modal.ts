import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail-modal.html',
  styleUrl: './employee-detail-modal.scss'
})
export class EmployeeDetailModal {
  @Input() data: any;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
