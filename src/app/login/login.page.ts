import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerRegisterModalComponent } from '../organizer-register-modal/organizer-register-modal.component';
import { ParticipantRegisterModalComponent } from '../participant-register-modal/participant-register-modal.component';
import { IonContent, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonFooter, IonText, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonFooter, IonText]
})
export class LoginPage implements OnInit {
  userType: string = '';

  constructor(private route: ActivatedRoute, private modalController: ModalController, private router: Router) {
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

  login() {
    this.router.navigate(['/dashboard']);
  }
}
