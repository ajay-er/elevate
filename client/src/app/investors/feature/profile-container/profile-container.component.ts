import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvestorsService } from "../../data-access/investors.service";

@Component({
  selector: "app-profile-container",
  templateUrl: "./profile-container.component.html",
  styleUrls: ["./profile-container.component.css"],
})
export class ProfileContainerComponent {
  private route = inject(ActivatedRoute);
  private investorService = inject(InvestorsService);

  name!:string;
  profileImg!:string;
  description!:string;
  about!:string;
  portfolio!:any;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.investorService.getInvestorData(id).subscribe((res: any) => {
        console.log(res);
        this.profileImg  = res.result.tempData.profileImgUrl;
        this.name  = res.result.tempData.name;
        this.description  = res.result.description;
        this.portfolio = res.result.portfolio;
        console.log(res.result.portfolio);
        this.about = res.result.about;
      });
    });
  }
}
