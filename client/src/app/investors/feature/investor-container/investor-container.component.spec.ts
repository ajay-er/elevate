import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorContainerComponent } from './investor-container.component';

describe('InvestorContainerComponent', () => {
  let component: InvestorContainerComponent;
  let fixture: ComponentFixture<InvestorContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorContainerComponent]
    });
    fixture = TestBed.createComponent(InvestorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
