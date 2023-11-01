import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsListComponent } from './investors-list.component';

describe('InvestorsListComponent', () => {
  let component: InvestorsListComponent;
  let fixture: ComponentFixture<InvestorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorsListComponent]
    });
    fixture = TestBed.createComponent(InvestorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
