import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestureTestPage } from './gesture-test.page';

describe('GestureTestPage', () => {
  let component: GestureTestPage;
  let fixture: ComponentFixture<GestureTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
