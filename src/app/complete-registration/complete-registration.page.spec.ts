import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteRegistrationPage } from './complete-registration.page';

describe('CompleteRegistrationPage', () => {
  let component: CompleteRegistrationPage;
  let fixture: ComponentFixture<CompleteRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
