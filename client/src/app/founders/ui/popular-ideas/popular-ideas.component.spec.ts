import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularIdeasComponent } from './popular-ideas.component';

describe('PopularIdeasComponent', () => {
  let component: PopularIdeasComponent;
  let fixture: ComponentFixture<PopularIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularIdeasComponent]
    });
    fixture = TestBed.createComponent(PopularIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
