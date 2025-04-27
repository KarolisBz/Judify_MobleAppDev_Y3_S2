import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerRegisterModalComponent } from '../organizer-register-modal/organizer-register-modal.component';
import { ParticipantRegisterModalComponent } from '../participant-register-modal/participant-register-modal.component';
import { IonContent, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonFooter, IonText, ModalController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
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

  constructor(private route: ActivatedRoute, private modalController: ModalController, private router: Router, private authService: AuthService, private toastController: ToastController) {
    this.route.queryParams.subscribe(params => {
      this.userType = params['type'] || 'Unknown';
    });
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
    try {
      console.log('Login attempt with', this.email, this.password);
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
      this.showToast('Login success', 'success', 1000);
    } catch (error) {
      console.error('Login failed', error);
      this.showToast('Login failed. Please check your credentials.', 'danger');
    }
  }

  // native toast message
  async showToast(message: string, color: string, duration: number = 2500) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }
}
