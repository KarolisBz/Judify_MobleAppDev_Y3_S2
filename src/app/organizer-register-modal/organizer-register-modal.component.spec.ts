import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizerRegisterModalComponent } from './organizer-register-modal.component';

describe('OrganizerRegisterModalComponent', () => {
  let component: OrganizerRegisterModalComponent;
  let fixture: ComponentFixture<OrganizerRegisterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerRegisterModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizerRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
