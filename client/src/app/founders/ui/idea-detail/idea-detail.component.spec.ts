import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailComponent } from './idea-detail.component';

describe('IdeaDetailComponent', () => {
  let component: IdeaDetailComponent;
  let fixture: ComponentFixture<IdeaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaDetailComponent]
    });
    fixture = TestBed.createComponent(IdeaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
