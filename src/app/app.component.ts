import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { SwipeGestureService } from './services/gestures/swipe-gesture.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  // fetch ion-content
  @ViewChild(IonApp, { read: ElementRef }) content!: ElementRef;

  constructor(private platform: Platform, private swipeGestureService: SwipeGestureService, private location: Location) {}

  ngAfterViewInit() {
    if (this.content) { // ensure content is loaded / avaliable
      this.platform.ready().then(() => {
        // iOS should already have swipe-back created by default
        if (this.platform.is('android')) { // we will use a custom made version for andriod
          this.swipeGestureService.createSwipeGesture(
            this.content,
            () => this.swipeBack(),  // Go back on swipe left
            () => this.swipeForward() // Go forward on swipe right
          );
        }
      });
    }
  }

  swipeBack() {
    // go back once
    this.location.back();
    console.log('Back Swipe');
  }

  swipeForward() {
    this.location.forward();
    console.log('Back Swipe');
  }
}
