import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFounderComponent } from './edit-founder.component';

describe('EditFounderComponent', () => {
  let component: EditFounderComponent;
  let fixture: ComponentFixture<EditFounderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFounderComponent]
    });
    fixture = TestBed.createComponent(EditFounderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
