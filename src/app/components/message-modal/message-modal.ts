import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.html',
  styleUrl: './message-modal.scss'
})
export class MessageModal {
  @Input() title = 'Message';
  @Input() message = 'Something happened.';
  @Input() type = '';
  @Input() showCancel: boolean = true;
  @Output() closed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  cancel() {
    this.canceled.emit();
  }
}
