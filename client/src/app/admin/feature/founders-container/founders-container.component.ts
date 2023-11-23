import { Component, inject } from "@angular/core";
import { AdminService } from "../../data-access/admin.service";

@Component({
  selector: "app-founders-container",
  templateUrl: "./founders-container.component.html",
  styleUrls: ["./founders-container.component.css"],
})
export class FoundersContainerComponent {
  protected startup: any;

  private adminService = inject(AdminService);

  ngOnInit() {
    this.adminService.getStartups().subscribe((res: any) => {
      console.log(res);
      this.startup = res.result;
    });
  }
}
