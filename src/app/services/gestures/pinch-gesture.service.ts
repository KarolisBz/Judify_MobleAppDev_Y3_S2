import { Injectable, ElementRef } from '@angular/core';
import { GestureDetail, GestureController, Gesture } from '@ionic/angular'
@Injectable({
  providedIn: 'root'
})
export class PinchGestureService {
  // class fields
  private startDistance: number = 0;
  private isMoving: boolean = false; // flag to check if gesture is moving
  private initX: number = 0; // initial x position
  private initY: number = 0; // initial y position

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
      this.initX = (x1 + x2) / 2;
      this.initY = (y1 + y2) / 2; 
      return this.calculateDistance(x1, y1, x2, y2);  // ensure fingers aren't too close
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
    onPinchStart: (initX: number, initY: number) => void,
    onPinchEnd: () => void
  ): Gesture {

    const gesture = this.gestureController.create({
      el: element.nativeElement,
      gestureName: 'pinch-gesture',

      onStart: (detail: GestureDetail) => {
        // if 2 fingers are touching screen at once
        let tempNum: number = this.getDistanceBetweenPoints(detail);

        if (tempNum != -9999) {
          this.startDistance = tempNum;
          onPinchStart(this.initX, this.initY); // Call pinch start callback
        }
      },

      onMove: (detail: GestureDetail) => {
        if (!this.isMoving) {
          this.isMoving = true;

          // we sync this with animation frame rate instead to improve smoothness
          requestAnimationFrame(() => {
            // if 2 fingers are touching screen at once
            let tempNum: number = this.getDistanceBetweenPoints(detail);

            if (tempNum != -9999) {
              const currentDistance = tempNum;
              const threshold = window.innerWidth * 0.1; // Threshold to prevent jitter

              const scale = (currentDistance+threshold) / this.startDistance; // Calculate the scale factor

              // If the current distance is greater than the starting distance, it's a pinch out (zoom in)
              if (currentDistance > this.startDistance + threshold) {
                onPinchOut(scale);
              }
              // If the current distance is less than the starting distance, it's a pinch in (zoom out)
              else if (currentDistance < this.startDistance - threshold) {
                onPinchIn(scale); 
              }
            }

            // Reset the flag after the frame is rendered
            this.isMoving = false;
          });
        }
      },

      onEnd: () => {
        // singal gesture has endded
        this.isMoving = false; // reset the moving flag
        onPinchEnd();
      }
    });

    gesture.enable();
    console.log('pinch gesture created and enabled.');
    return gesture;
  }
}
