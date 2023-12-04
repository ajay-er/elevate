import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalOpen: boolean = false;
  @Output() close = new EventEmitter<any>();
  
  toogleModal() {
    this.modalOpen = !this.modalOpen;
    if (!this.modalOpen) this.close.emit();
  }
}
