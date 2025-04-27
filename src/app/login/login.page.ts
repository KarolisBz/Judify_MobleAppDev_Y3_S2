import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerRegisterModalComponent } from '../organizer-register-modal/organizer-register-modal.component';
import { ParticipantRegisterModalComponent } from '../participant-register-modal/participant-register-modal.component';
import { IonContent, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonFooter, IonText, ModalController } from '@ionic/angular/standalone';
import { AuthService } from '../services/account/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonFooter, IonText]
})
export class LoginPage implements OnInit {
  userType: string = '';
  email: string = '';
  password: string = '';

  constructor(private route: ActivatedRoute, private modalController: ModalController, private router: Router, private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.userType = params['type'] || 'Unknown';
    });

    // user gets logged out if they navigate to this page
    if (this.authService.getCurrentUser() != null) {
      this.authService.logout(); // logout user if he is already logged in
      this.authService.showToast('Logged out', 'danger', 1500); // show toast message
    }
  }

  async openModal() {
    let modal: any = null;

    // choosing which register template to show
    if (this.userType === 'organizer') { // show organizer register modal
      modal = await this.modalController.create({
        component: OrganizerRegisterModalComponent,
      });
    } else if (this.userType === 'participant') { // show attendee register modal
      modal = await this.modalController.create({
        component: ParticipantRegisterModalComponent,
      });
    }

    // after loading show modal
    return await modal.present();
  }

  ngOnInit() {}

  async login() {
    await this.authService.login(this.email, this.password);
  }
}
