import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, ModalController, IonButton, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/account/auth.service';
import { Participant } from '../classes/account/participant';

@Component({
  selector: 'app-participant-register-modal',
  templateUrl: './participant-register-modal.component.html',
  styleUrls: ['./participant-register-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, FormsModule]
})
export class ParticipantRegisterModalComponent implements OnInit {
  participant: any = new Participant().toDTO();
  constructor(private modalController: ModalController, private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  async register() {
    try {
      this.authService.PasswordlessRegister(this.participant.email, this.participant);
      this.cancel()
    } catch (error: any) {
      this.authService.showToast('Error: ' + error.message, 'danger', 3000);
    }
  }
}
