import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImageComponent } from './update-image.component';

describe('UpdateImageComponent', () => {
  let component: UpdateImageComponent;
  let fixture: ComponentFixture<UpdateImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateImageComponent]
    });
    fixture = TestBed.createComponent(UpdateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
