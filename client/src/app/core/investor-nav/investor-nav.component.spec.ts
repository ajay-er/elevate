import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorNavComponent } from './investor-nav.component';

describe('InvestorNavComponent', () => {
  let component: InvestorNavComponent;
  let fixture: ComponentFixture<InvestorNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorNavComponent]
    });
    fixture = TestBed.createComponent(InvestorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
