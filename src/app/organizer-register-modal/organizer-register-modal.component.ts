import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, ModalController, IonButton, IonButtons, IonItem, IonInput, IonFooter } from '@ionic/angular/standalone';
import { AuthService } from '../services/account/auth.service';

@Component({
  selector: 'app-organizer-register-modal',
  templateUrl: './organizer-register-modal.component.html',
  styleUrls: ['./organizer-register-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonInput, CommonModule]
})
export class OrganizerRegisterModalComponent  implements OnInit {

  constructor(private modalController: ModalController, private authService: AuthService) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }

  register() {
    this.authService.showToast("Organizers registration are not accepted at this time", "warning", 2000)
    this.cancel()
  }
}
