import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      // iOS should already have swipe-back enabled by default
      if (this.platform.is('android')) {
        document.body.style.setProperty('--ion-back-button-text', 'Go Back');
      }
    });
  }
}
