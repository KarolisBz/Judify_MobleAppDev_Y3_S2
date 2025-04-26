import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonContent } from '@ionic/angular/standalone';
import { SwipeGestureService } from '../services/gestures/swipe-gesture.service';

@Component({
  selector: 'app-gesture-test',
  templateUrl: './gesture-test.page.html',
  styleUrls: ['./gesture-test.page.scss'],
  standalone: true,
  imports: [IonContent, IonCard, CommonModule, FormsModule]
})
export class GestureTestPage implements OnInit {
  @ViewChild("target", { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  constructor(private swipeGestureService: SwipeGestureService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.swipeGestureService.createSwipeGesture(
      this.card,
      () => this.handleSwipeLeft(),
      () => this.handleSwipeRight()
    );
  }

  handleSwipeLeft() {
    console.log('Left Swipe');
  }

  handleSwipeRight() {
    console.log('Right Swipe');
  }
}
