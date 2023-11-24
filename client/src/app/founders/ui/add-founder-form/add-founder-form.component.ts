import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStartup } from 'src/app/shared/interfaces';
import { FoundersService } from '../../data-access/founders.service';

@Component({
  selector: 'app-add-founder-form',
  templateUrl: './add-founder-form.component.html',
  styleUrls: ['./add-founder-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFounderFormComponent {
  myForm!: FormGroup;
  currentTab = 0;
  @Output() startupSubmit: EventEmitter<IStartup> = new EventEmitter();

  constructor(private fb: FormBuilder,private foundersService:FoundersService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      companyName: ['', Validators.required],
      logo: [null],
      bannerImage: [null],
      description: [''],
      industry: [''],
      location: [''],
      businessModel: [''],
      foundingDate: [''],
      targetAudience: [''],
      solution: [''],
      marketProblem: [''],
      founders: this.fb.array([]),
      fundingStatus: [''],
      fundingAmount: [''],
      totalEquityShares: [''],
      exitStrategy: [''],
      currentValuation: [''],
      availableEquityShares: [''],
    });
    this.addFounder();
  }

  get founderForms() {
    return this.myForm.get('founders') as FormArray;
  }

  onLogoChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('logo', file, file.name);
      this.foundersService.getLogoUrl(formData).subscribe((res:any) => {
        this.myForm.patchValue({logo:res.url});
      });
    }
  }

  onBannerImageChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('bannerImage', file, file.name);
      this.foundersService.getBannerUrl(formData).subscribe((res:any) => {
        this.myForm.patchValue({bannerImage:res.url});
      });
    }
  }

  addFounder() {
    const founder = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });

    if (this.founderForms.length < 5) {
      this.founderForms.push(founder);
    }
  }

  removeFounder(index: number) {
    this.founderForms.removeAt(index);
  }

  onSubmit() {
    // if (!this.myForm.valid) return;
    this.startupSubmit.emit(this.myForm.value);
  }

  nextTab() {
    if (this.currentTab < 3) {
      this.currentTab++;
    }
  }

  prevTab() {
    if (this.currentTab > 0) {
      this.currentTab--;
    }
  }
}
