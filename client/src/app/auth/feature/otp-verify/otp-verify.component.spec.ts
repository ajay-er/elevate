import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerifyComponent } from './otp-verify.component';

describe('OtpVerifyComponent', () => {
  let component: OtpVerifyComponent;
  let fixture: ComponentFixture<OtpVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpVerifyComponent]
    });
    fixture = TestBed.createComponent(OtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
