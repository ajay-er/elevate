import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-investor-details',
  templateUrl: './investor-details.component.html',
  styleUrls: ['./investor-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestorDetailsComponent {
  myForm!: FormGroup;
  @Output() investorSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      bio: [''],
      description: [''],
      about: [''],
      investmentStrategy: [''],
      riskAppetite: [''],
      preferredDealStructure: [''],
      investmentGeographies: [''],
      industries: [''],
      investmentStage: [''],
      investmentExperience: [''],
      investmentSize: [''],
      preferredCommunicationMethod: ['']
    });
  }

  onSubmit() {
    this.investorSubmit.emit(this.myForm.value);
  }
}
