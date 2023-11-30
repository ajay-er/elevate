import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorTabComponent } from './investor-tab.component';

describe('InvestorTabComponent', () => {
  let component: InvestorTabComponent;
  let fixture: ComponentFixture<InvestorTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorTabComponent]
    });
    fixture = TestBed.createComponent(InvestorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
