import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardsComponent } from './dashboard-cards.component';

describe('DashboardCardsComponent', () => {
  let component: DashboardCardsComponent;
  let fixture: ComponentFixture<DashboardCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCardsComponent]
    });
    fixture = TestBed.createComponent(DashboardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
