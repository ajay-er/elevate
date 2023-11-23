import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "app-add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAddressComponent {
  @Output() updateAddress = new EventEmitter<any>();
  protected addressData = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };

  saveAddress() {
    this.updateAddress.emit(this.addressData);
  }
}
