import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { SwipeGestureService } from './services/gestures/swipe-gesture.service';
import { LocalpersistenceService } from './services/presistance/localpersistence.service';
import { AuthService } from './services/account/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  // fetch ion-content
  @ViewChild(IonApp, { read: ElementRef }) content!: ElementRef;

  constructor(private platform: Platform, private swipeGestureService: SwipeGestureService, private authService: AuthService, private router: Router, private localPersistence: LocalpersistenceService) { }

  async ngOnInit() {
    // try logging in with saved details
    const remeberMe: any = await this.localPersistence.hasItem('user_info');
    if (remeberMe) {
      const savedDetails: any = await this.localPersistence.getItem('user_info');
      this.authService.login(savedDetails.email, savedDetails.password)
    }
  }

  ngAfterViewInit() {
    if (this.content) { // ensure content is loaded / avaliable
      this.platform.ready().then(() => {
        // iOS should already have swipe-back created by default
        if (this.platform.is('capacitor')) { // we will use a custom made version for andriod
          this.swipeGestureService.createSwipeGesture(
            this.content,
            () => this.swipeBack(),  // Go back on swipe left
            () => this.swipeForward() // Go forward on swipe right
          );
        }
      });
    }
  }

  // store the frozen navigation stack
  // we want custom logic, not using a moving stack
  private frozenNavStack: string[] = [
    '/home',
    '/login',
    '/dashboard',
    '/tournament-participant',
  ];

  swipeBack() {
    // go back once
    let currentIndex = this.frozenNavStack.indexOf(this.router.url); // get the last url
    let targetPage = this.frozenNavStack[Math.max(0, currentIndex - 1)]; // get the previous page
    this.router.navigateByUrl(targetPage); // navigate to the previous page
    console.log('Back Swipe');

    // if we reach login page, logout user
    if (this.authService.getCurrentUser() != null && currentIndex <= 2) { // if user is logged in and trying to go to login page
      this.authService.logout(); // logout user
      this.authService.showToast('Logged out', 'danger', 1500); // show toast message
    }
  }

  swipeForward() {
    console.log('foward Swipe');
    let currentIndex = this.frozenNavStack.indexOf(this.router.url); // get the last url
    let targetPage = this.frozenNavStack[Math.min(this.frozenNavStack.length - 1, currentIndex + 1)]; // get foward page

    if (this.authService.getCurrentUser() != null && currentIndex >= 2 || currentIndex < 1) { // if user is logged in and trying to go to login page
      this.router.navigateByUrl(targetPage); // navigate to the foward page
    }
  }
}
