import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInvestorDetailsComponent } from './fill-investor-details.component';

describe('FillInvestorDetailsComponent', () => {
  let component: FillInvestorDetailsComponent;
  let fixture: ComponentFixture<FillInvestorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillInvestorDetailsComponent]
    });
    fixture = TestBed.createComponent(FillInvestorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
