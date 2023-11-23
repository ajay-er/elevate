import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "app-edit-name-input",
  templateUrl: "./edit-name-input.component.html",
  styleUrls: ["./edit-name-input.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditNameInputComponent {
  @Output() updateName = new EventEmitter<any>();
  firstName!: string;
  lastName!: string;
  submit() {
    this.updateName.emit({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
}
