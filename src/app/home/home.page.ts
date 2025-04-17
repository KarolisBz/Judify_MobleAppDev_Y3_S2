import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonModal, ModalController } from '@ionic/angular/standalone';
import { OrganizerRegisterModalComponent } from '../organizer-register-modal/organizer-register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonImg, IonModal]
})
export class HomePage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: OrganizerRegisterModalComponent, // the modal component you created
    });
    return await modal.present();
  }

  goToLogin(type: string) {
    this.router.navigate(['/login'], {
      queryParams: { type }
    });
  }
}
