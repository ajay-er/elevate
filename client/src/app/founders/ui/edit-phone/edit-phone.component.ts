import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "app-phone-input",
  templateUrl: "./edit-phone.component.html",
  styleUrls: ["./edit-phone.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPhoneComponent {
  @Output() updatePhoneNum = new EventEmitter<any>();
  phone!: number;
  updatePhoneNumber() {
    this.updatePhoneNum.emit({ phone: this.phone });
  }
}
