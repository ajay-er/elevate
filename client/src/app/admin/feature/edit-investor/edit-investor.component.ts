import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-investor',
  templateUrl: './edit-investor.component.html',
  styleUrls: ['./edit-investor.component.css']
})
export class EditInvestorComponent {
  selectCountryDropDown:boolean = false;
  selectMarketDropDown:boolean = false;
}
