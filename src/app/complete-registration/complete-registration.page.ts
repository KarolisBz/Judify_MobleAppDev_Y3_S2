import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/account/auth.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.page.html',
  styleUrls: ['./complete-registration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CompleteRegistrationPage implements OnInit {
  name: string = '';
  phoneNumber: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit() {}

  // Call the completeSignUp method once the user submits the form
  completeReg() {
    this.authService.completeRegistration();
  }
}
