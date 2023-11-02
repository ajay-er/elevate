import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundersListComponent } from './founders-list.component';

describe('FoundersListComponent', () => {
  let component: FoundersListComponent;
  let fixture: ComponentFixture<FoundersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundersListComponent]
    });
    fixture = TestBed.createComponent(FoundersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
