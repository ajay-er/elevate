import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDetailComponent } from './investor-detail.component';

describe('InvestorDetailComponent', () => {
  let component: InvestorDetailComponent;
  let fixture: ComponentFixture<InvestorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorDetailComponent]
    });
    fixture = TestBed.createComponent(InvestorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
