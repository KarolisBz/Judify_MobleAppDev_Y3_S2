import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Platform, Gesture } from '@ionic/angular';
import { PinchGestureService } from '../services/gestures/pinch-gesture.service';


@Component({
  selector: 'app-tournament-participant',
  templateUrl: './tournament-participant.page.html',
  styleUrls: ['./tournament-participant.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TournamentParticipantPage implements OnInit {
  // elements
  @ViewChild('target', { read: ElementRef }) content!: ElementRef;
  wrapper: HTMLElement | null = null;
  bracketTable: HTMLElement;
  // data
  tournamentInfo!: any;
  // settings
  zoomIntensity: number = 0.1; // zoom strength for scrolling
  scale: number = 1;
  // local vars
  private gesture!: Gesture;


  constructor(private router: Router, private pinchGestureService: PinchGestureService, private platform: Platform) {
    // we fetch the tournament info from the navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) { // we use optional chaining to avoid errors
      this.tournamentInfo = navigation.extras.state['tournament'];
    }

    this.wrapper = document.querySelector('.bracket-wrapper');
    this.bracketTable = document.querySelector('.bracket-table')!;
  }

  private scaleVeiw(): void {
    // Limit the zoom range
    this.scale = Math.min(Math.max(0.1, this.scale), 2.5);

    // Apply scaling
    this.bracketTable.style.transform = `scale(${this.scale})`;
  }

  ngOnInit() {
    this.wrapper = document.querySelector('.bracket-wrapper');
    this.bracketTable = document.querySelector('.bracket-table')!;

    if (this.wrapper && !this.platform.is('capacitor')) {
      this.wrapper.addEventListener('wheel', (event: WheelEvent) => {
        if (event.ctrlKey) { // while ctrl key is being held down
          event.preventDefault(); // Prevent scroll

          if (event.deltaY < 0) {
            // Scroll up = Zoom in
            this.scale += this.zoomIntensity
          } else {
            // Scroll down = Zoom out
            this.scale -= this.zoomIntensity;
          }

          this.scaleVeiw();
        }
      });
    }
  }

  ngAfterViewInit() {
    // adding custom pinch gesture
    // this adds mobile support for zoom in / out
    if (this.platform.is('capacitor')) {
      this.gesture = this.pinchGestureService.createPinchGesture(
        this.content,
        (scaleStrength: number) => this.onPinchOut(scaleStrength), // zoom in
        (scaleStrength: number) => this.onPinchIn(scaleStrength), // zoom out
        (initialX: number, initialY: number) => this.onPinchStart(initialX, initialY), // pinch start
        () => this.onPinchEnd()
      ); // cleanup the gesture when not in use
    }
  }

  onPinchIn(newScale: number) {
    this.scale = newScale;
    this.scaleVeiw();
  }

  // github fixed
  onPinchOut(newScale: number) {
    this.scale = newScale;
    this.scaleVeiw();
  }

  onPinchStart(initialX: number, initialY: number) {
    // disable scrolling
    if (this.wrapper) {
      // Disabling touch actions to prevent scrolling
      this.content.nativeElement.style.transformOrigin = `${initialX}px ${initialY}px`;
      this.content.nativeElement.touchAction = 'none';
      this.content.nativeElement.style.overflow = 'hidden';
    }
  }

  onPinchEnd() {
    // re-enable scrolling
    if (this.wrapper) {
      this.content.nativeElement.touchAction = '';
      this.content.nativeElement.style.overflow = 'auto';
    }
  }

  ngOnDestroy() {
    // clean up gesture when component is destroyed
    if (this.gesture) {
      this.gesture.destroy();
    }
  }
}
