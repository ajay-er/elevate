import { Component, inject } from '@angular/core';
import { CommonApiService } from '../../data-access/api.service';
import { countries } from '../../interfaces/countries';
import { Countries, Technology } from '../../interfaces';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { technologies } from '../../interfaces/markets';
import { Router } from '@angular/router';
import { JwtService } from '../../data-access/jwt.service';
import { LocalStorageService } from '../../data-access/local-storage.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent {
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
  private jwtService = inject(JwtService); 
  private localStorageService = inject(LocalStorageService); 
  private router = inject(Router); 
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
  getSelectedCountries(): string[] {
    return this.countriesArray
      .filter((control) => control.value)
      .map((control, index) => this.Countries[index].name);
  }

  getSelectedMarkets(): string[] {
    return this.technologiesArray
      .filter((control) => control.value)
      .map((control, index) => this.Technologies[index].name);
  }


  submit() {
    const selectedCountries = this.getSelectedCountries();
    const selectedMarkets = this.getSelectedMarkets();
    const data = this.updateInvestorForm.value;
    data.countries = selectedCountries;
    data.markets = selectedMarkets;
    this.commonApiService.updateInvestorProfile(data).subscribe((res:any) => {
      console.log(res);
      const token = this.localStorageService.get('access_token');
      if (this.jwtService.isInvestor(token!)) {
        this.router.navigateByUrl('/investor/ideas');
      }
    });
  }

  protected Countries:Countries[] = countries;
  protected Technologies:Technology[] = technologies;
}
