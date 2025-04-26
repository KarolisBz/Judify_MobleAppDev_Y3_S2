import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tournament-participant',
  templateUrl: './tournament-participant.page.html',
  styleUrls: ['./tournament-participant.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TournamentParticipantPage implements OnInit {
  tournamentInfo!: any;
  wrapper: HTMLElement | null = null;
  bracketTable: HTMLElement;
  zoomIntensity: number = 0.1; // initial zoom level
  scale: number = 1;

  constructor(private router: Router) {
    // we fetch the tournament info from the navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) { // we use optional chaining to avoid errors
      this.tournamentInfo = navigation.extras.state['tournament'];
    }

    this.wrapper = document.querySelector('.bracket-wrapper');
    this.bracketTable = document.querySelector('.bracket-table')!;
  }

  ngOnInit() {
    this.wrapper = document.querySelector('.bracket-wrapper');
    this.bracketTable = document.querySelector('.bracket-table')!;

    if (this.wrapper) {
      this.wrapper.addEventListener('wheel', (event: WheelEvent) => {
        if (event.ctrlKey) { // while ctrl key is being held down
          event.preventDefault(); // Prevent scroll

          if (event.deltaY < 0) {
            // Scroll up   Zoom in
            this.scale += this.zoomIntensity;
          } else {
            // Scroll down = Zoom out
            this.scale -= this.zoomIntensity;
          }

          // Limit the zoom range
          this.scale = Math.min(Math.max(0.1, this.scale), 2.5);

          // Apply scaling
          this.bracketTable.style.transform = `scale(${this.scale})`;
        }
      });
    }
  }
}
