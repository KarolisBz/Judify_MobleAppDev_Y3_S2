import { Injectable } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeGestureService {

  constructor(private gestureController: GestureController) { }

  createSwipeGesture(
    element: ElementRef,
    onSwipeLeft: () => void,
    onSwipeRight: () => void
  ): Gesture {

    const gesture = this.gestureController.create({
      el: element.nativeElement,
      gestureName: 'swipe-gesture',
      onEnd: (detail) => {
        const deltaX = detail.deltaX;
        const velocityX = detail.velocityX;

        const swipeDistance = 150;
        const swipeVelocity = 0.1;

        if (Math.abs(deltaX) > swipeDistance && Math.abs(velocityX) > swipeVelocity) {
          if (deltaX < 0) {
            onSwipeRight();
          } else {
            onSwipeLeft();
          }
        }
      }
    });

    gesture.enable();
    console.log('Swipe gesture created and enabled.');
    return gesture;
  }
}
