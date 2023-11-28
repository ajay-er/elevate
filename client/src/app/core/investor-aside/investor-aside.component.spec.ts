import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAsideComponent } from './investor-aside.component';

describe('InvestorAsideComponent', () => {
  let component: InvestorAsideComponent;
  let fixture: ComponentFixture<InvestorAsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorAsideComponent]
    });
    fixture = TestBed.createComponent(InvestorAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
