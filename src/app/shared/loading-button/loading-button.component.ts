import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent {
  @Input() label: string = 'Submit';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() color: string = 'primary';  // 'primary', 'accent', 'warn'

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.clicked.emit();
    }
  }
}
