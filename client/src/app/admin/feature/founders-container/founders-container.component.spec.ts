import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundersContainerComponent } from './founders-container.component';

describe('FoundersContainerComponent', () => {
  let component: FoundersContainerComponent;
  let fixture: ComponentFixture<FoundersContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundersContainerComponent]
    });
    fixture = TestBed.createComponent(FoundersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
