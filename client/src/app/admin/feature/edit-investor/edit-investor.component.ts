import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CommonApiService } from 'src/app/shared/data-access/api.service';
import { Countries, Technology } from 'src/app/shared/interfaces';
import { countries } from 'src/app/shared/interfaces/countries';
import { technologies } from 'src/app/shared/interfaces/markets';

@Component({
  selector: 'app-edit-investor',
  templateUrl: './edit-investor.component.html',
  styleUrls: ['./edit-investor.component.css']
})
export class EditInvestorComponent {
  investmentAmountVariants = [
    '50000-500000',
    '500000-1000000',
    '1000000-5000000',
    '5000000-10000000',
    '10000000-50000000',
  ];
  selectCountryDropDown:boolean = false;
  selectMarketDropDown:boolean = false;

  private commonApiService = inject(CommonApiService); 
  protected userDetails:any;
  updateInvestorForm!: FormGroup;
  private initialFormValues: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.updateInvestorForm = this.fb.group({
      firstName: [''], 
      lastName: [''],
      email: [''],
      phone: [''],
      website: [''],
      bio: [''],
      twitter: [''],
      facebook: [''],
      linkedin: [''],
      youtube: [''],
      totalInvestmentCount: [''],
      investmentAmount: [''],
      countries: this.fb.array([]),
      markets: this.fb.array([]),

    });

    this.updateInvestorForm.get('email')?.disable();

    this.Countries.forEach((country, index) => {
      const control = this.fb.control(country.selected || false);
      (this.updateInvestorForm.get('countries') as FormArray).push(control);
    });

    this.Technologies.forEach((markets, index) => {
      const control = this.fb.control(markets.selected || false);
      (this.updateInvestorForm.get('markets') as FormArray).push(control);
    });

    // Store the initial form values
    this.initialFormValues = this.updateInvestorForm.value;

    this.commonApiService.getuserProfile().subscribe((res: any) => {
      const user = { ...res.user, ...res.result };
      this.userDetails = user;
      console.log(res);
      
      this.updateInvestorForm.patchValue({
        twitter:user.socialMediaLinks?.twitter || '',
        youtube: user.socialMediaLinks?.youtube || '',
        facebook: user.socialMediaLinks?.facebook || '',
        linkedin: user.socialMediaLinks?.linkedin || '',
        firstName:user.firstName || '',
        lastName:user.lastName || '',
        email:user.email || '',
        phone:user.phone || '',
        bio:user.bio || '',
        website:user.website || '',
        totalInvestmentCount: user.totalInvestmentCount || '',
        investmentAmount: user.investmentAmount || '',
      });

    });
  }

  onInvestmentAmountChange(event: any) {
    const selectedValue = event.target.value;        
    this.updateInvestorForm.get('investmentAmount')?.setValue(selectedValue);
  }

  get countriesArray() {
    return (this.updateInvestorForm.get('countries') as FormArray).controls;
  }

  get technologiesArray() {
    return (this.updateInvestorForm.get('markets') as FormArray).controls;
  }

  getCountryFormControl(index: number): any | null {
    const countriesControl = this.updateInvestorForm.get('countries');

    if (countriesControl instanceof FormArray) {
      const control = countriesControl.at(index);
      // Ensure that the returned value is a FormControl
      if (control instanceof FormControl) {
        return control;
      }
    }

    return null;
  }
  getMarketFormControl(index: number): any | null {
    const marketControl = this.updateInvestorForm.get('markets');

    if (marketControl instanceof FormArray) {
      const market = marketControl.at(index);
      // Ensure that the returned value is a FormControl
      if (market instanceof FormControl) {
        return market;
      }
    }

    return null;
  }

  updateCountryArray(index: number) {
    const control = this.countriesArray[index];
    const selectedCountry = this.Countries[index];

    if (control.value !== this.initialFormValues.countries[index]) {
      console.log(`Change detected in ${selectedCountry.name}: ${control.value}`);
    } else {
      console.log(`No change in ${selectedCountry.name}`);
    }
  }

  updateMarketsArray(index: number) {
    const control = this.technologiesArray[index];
    const selectedMarket = this.Technologies[index];

    if (control.value !== this.initialFormValues.countries[index]) {
      console.log(`Change detected in ${selectedMarket.name}: ${control.value}`);
    } else {
      console.log(`No change in ${selectedMarket.name}`);
    }
  }

  submit() {
    console.log(this.updateInvestorForm.value);
    this.commonApiService.updateInvestorProfile(this.updateInvestorForm.value).subscribe((res:any) => {
      console.log(res);
    });
  }

  protected Countries:Countries[] = countries;
  protected Technologies:Technology[] = technologies;
}
