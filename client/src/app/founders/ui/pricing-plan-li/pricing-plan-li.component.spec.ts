import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanLiComponent } from './pricing-plan-li.component';

describe('PricingPlanLiComponent', () => {
  let component: PricingPlanLiComponent;
  let fixture: ComponentFixture<PricingPlanLiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingPlanLiComponent]
    });
    fixture = TestBed.createComponent(PricingPlanLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
