import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorTabContainerComponent } from './investor-tab-container.component';

describe('InvestorTabContainerComponent', () => {
  let component: InvestorTabContainerComponent;
  let fixture: ComponentFixture<InvestorTabContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorTabContainerComponent]
    });
    fixture = TestBed.createComponent(InvestorTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
