import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupDetailsComponent } from './startup-details.component';

describe('StartupDetailsComponent', () => {
  let component: StartupDetailsComponent;
  let fixture: ComponentFixture<StartupDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartupDetailsComponent]
    });
    fixture = TestBed.createComponent(StartupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
