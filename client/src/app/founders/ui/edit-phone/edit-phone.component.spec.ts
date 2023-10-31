import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneComponent } from './edit-phone.component';

describe('EditPhoneComponent', () => {
  let component: EditPhoneComponent;
  let fixture: ComponentFixture<EditPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPhoneComponent]
    });
    fixture = TestBed.createComponent(EditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
