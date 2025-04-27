import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/account/auth.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private authService: AuthService, private route: ActivatedRoute,) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = window.localStorage.getItem('emailForSignIn');
      const actionCode = params['oobCode'];

      if (email && actionCode) {
        this.authService.completeRegistration(email, actionCode);
      }
    });
  }
}
