import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
@Input() profileImg!:string;
@Input() name!:string;
@Input() description!:string;
@Input() portfolio!:any;
@Input() about!:any;

}
