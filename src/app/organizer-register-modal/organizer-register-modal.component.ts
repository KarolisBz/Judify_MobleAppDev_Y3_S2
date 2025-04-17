import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonModal, ModalController, IonButton, IonButtons, IonItem, IonInput, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-organizer-register-modal',
  templateUrl: './organizer-register-modal.component.html',
  styleUrls: ['./organizer-register-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonModal, IonButton, IonButtons, IonItem, IonInput, CommonModule, IonFooter]
})
export class OrganizerRegisterModalComponent  implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }

  private register() {
    // Implement registration logic here
    this.modalController.dismiss();
  }
}
