import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressComponent } from './add-address.component';

describe('AddAddressComponent', () => {
  let component: AddAddressComponent;
  let fixture: ComponentFixture<AddAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAddressComponent]
    });
    fixture = TestBed.createComponent(AddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
