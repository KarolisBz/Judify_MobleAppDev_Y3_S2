import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonModal, ModalController, IonButton, IonButtons, IonItem, IonInput, IonFooter, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant-register-modal',
  templateUrl: './participant-register-modal.component.html',
  styleUrls: ['./participant-register-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonModal, IonButton, IonButtons, IonItem, IonInput, IonFooter, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class ParticipantRegisterModalComponent implements OnInit {

  constructor(private modalController: ModalController, private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account created Successfully.',
      duration: 5000,
      color: 'success',
      position: 'bottom' // or 'top', 'middle'
    });
    await toast.present();
  }

  async register() {
    // Implement registration logic here
    this.modalController.dismiss();
    await this.presentToast();
  }
}
