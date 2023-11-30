import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdeaComponent } from './create-idea.component';

describe('CreateIdeaComponent', () => {
  let component: CreateIdeaComponent;
  let fixture: ComponentFixture<CreateIdeaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateIdeaComponent]
    });
    fixture = TestBed.createComponent(CreateIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
