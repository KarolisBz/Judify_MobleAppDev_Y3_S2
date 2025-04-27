import { Injectable, ElementRef } from '@angular/core';
import { GestureDetail, GestureController, Gesture } from '@ionic/angular'
@Injectable({
  providedIn: 'root'
})
export class PinchGestureService {
  // class fields
  private startDistance: number = 0;

  constructor(private gestureController: GestureController) { }

  // private helper methods
  private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // Calculate the distance between two points
  }

  private getDistanceBetweenPoints(detail: GestureDetail): number {
    // getting touch points
    const event = detail.event as TouchEvent;
    const touchPoints = event.touches;

    // if 2 fingers are touching screen at once
    if (touchPoints.length === 2) {
      const x1 = touchPoints[0].clientX;
      const y1 = touchPoints[0].clientY;
      const x2 = touchPoints[1].clientX;
      const y2 = touchPoints[1].clientY;
      return this.calculateDistance(x1, y1, x2, y2);  // Calculate the start distance between fingers
    }
    else {
      return -9999; // return negative value so we know less than 2fingures are tracking
    }
  }

  // creating gesture
  createPinchGesture(
    element: ElementRef,
    onPinchIn: (scaleStrength: number) => void, // callback functions
    onPinchOut: (scaleStrength: number) => void, // callback functions
    onPinchStart: () => void,
    onPinchEnd: () => void
  ): Gesture {

    const gesture = this.gestureController.create({
      el: element.nativeElement,
      gestureName: 'pinch-gesture',

      onStart: (detail: GestureDetail) => {
        // if 2 fingers are touching screen at once
        let tempNum: number = this.getDistanceBetweenPoints(detail);

        if (tempNum > -9999) {
          this.startDistance = tempNum;
          onPinchStart();
        }
      },

      onMove: (detail: GestureDetail) => {
        // if 2 fingers are touching screen at once
        let tempNum: number = this.getDistanceBetweenPoints(detail);

        if (tempNum > -9999) {
          const currentDistance = tempNum;
          const scaleStrength = currentDistance / this.startDistance;

          // If the current distance is greater than the starting distance, it's a pinch out (zoom in)
          if (currentDistance > this.startDistance) {
            onPinchOut(scaleStrength); // Call pinch out callback
          }
          // If the current distance is less than the starting distance, it's a pinch in (zoom out)
          else if (currentDistance < this.startDistance) {
            onPinchIn(scaleStrength); // Call pinch in callback
          }
        }
      },

      onEnd() {
        // singal gesture has endded
        onPinchEnd();
      }
    });

    gesture.enable();
    console.log('pinch gesture created and enabled.');
    return gesture;
  }
}
