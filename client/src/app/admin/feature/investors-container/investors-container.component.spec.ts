import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsContainerComponent } from './investors-container.component';

describe('InvestorsContainerComponent', () => {
  let component: InvestorsContainerComponent;
  let fixture: ComponentFixture<InvestorsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorsContainerComponent]
    });
    fixture = TestBed.createComponent(InvestorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
