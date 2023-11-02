import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupCardsComponent } from './startup-cards.component';

describe('StartupCardsComponent', () => {
  let component: StartupCardsComponent;
  let fixture: ComponentFixture<StartupCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartupCardsComponent]
    });
    fixture = TestBed.createComponent(StartupCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
