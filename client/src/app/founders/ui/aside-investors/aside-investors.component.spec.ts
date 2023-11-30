import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideInvestorsComponent } from './aside-investors.component';

describe('AsideInvestorsComponent', () => {
  let component: AsideInvestorsComponent;
  let fixture: ComponentFixture<AsideInvestorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsideInvestorsComponent]
    });
    fixture = TestBed.createComponent(AsideInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
