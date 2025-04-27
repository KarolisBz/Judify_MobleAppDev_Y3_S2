import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
// firebase
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user as an observable
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private auth: Auth, private toastController: ToastController) { 
    // change user automatically
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  // login promise operation working in the background
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.showToast('Login success', 'success', 1000);
    } catch (error) {
      console.error('Login failed', error);
      this.showToast('Login failed. Please check your credentials.', 'danger');
    }
  }

  // logout promise operation working in the background
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // getters
  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  // native toast message
  async showToast(message: string, color: string, duration: number = 2500) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }
}
