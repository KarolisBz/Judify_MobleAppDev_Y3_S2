import { Component, OnInit } from '@angular/core';
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

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
    this.router.navigate(['/login']);
  }
}
