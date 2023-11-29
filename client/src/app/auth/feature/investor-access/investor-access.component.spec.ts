import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAccessComponent } from './investor-access.component';

describe('InvestorAccessComponent', () => {
  let component: InvestorAccessComponent;
  let fixture: ComponentFixture<InvestorAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorAccessComponent]
    });
    fixture = TestBed.createComponent(InvestorAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
