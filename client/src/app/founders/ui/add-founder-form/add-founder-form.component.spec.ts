import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFounderFormComponent } from './add-founder-form.component';

describe('AddFounderFormComponent', () => {
  let component: AddFounderFormComponent;
  let fixture: ComponentFixture<AddFounderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFounderFormComponent]
    });
    fixture = TestBed.createComponent(AddFounderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
