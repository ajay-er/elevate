import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoundersComponent } from './add-founders.component';

describe('AddFoundersComponent', () => {
  let component: AddFoundersComponent;
  let fixture: ComponentFixture<AddFoundersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFoundersComponent]
    });
    fixture = TestBed.createComponent(AddFoundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
