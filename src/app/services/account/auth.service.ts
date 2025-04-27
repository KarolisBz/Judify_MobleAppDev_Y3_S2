import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Participant } from 'src/app/classes/account/participant';
import { Router } from '@angular/router';
// firebase
import { Auth, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user as an observable
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private auth: Auth, private toastController: ToastController, private firestore: Firestore, private router: Router) {
    // change user automatically
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  // Signup method with password
  async register(password: string, newUser: Participant): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        newUser.getEmail(),
        password
      );

      // Store user account data in Firestore
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), newUser.toDTO());

      // displaying success Register
      this.showToast('Register successful!', 'success', 1500);
    } catch (error: any) {

      // displaying error info
      console.error('Register failed', 'danger', error);
      this.showToast(error.message, 'danger');

      // throwing error again so it can be handled by method caller
      throw error;
    }
  }

  // Method to send the passwordless sign-up link
  PasswordlessRegister(email: string, newUserData: any) {
    const actionCodeSettings = {
      url: 'https://judofy.firebaseapp.com/complete-registration',
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
      .then(() => {
        // Saving data locally so you can complete sign-up later
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('newUserData', newUserData);
        console.log('sign-up email sent!');
      })
      .catch((error) => {
        console.error('Error sending email link:', error.message);
      });
  }

  completeRegistration(auth: any, actionCode: any) {
    const email = window.localStorage.getItem('emailForSignIn');
    const newUserData = window.localStorage.getItem('newUserData');

    if (isSignInWithEmailLink(auth, actionCode)) {
      // Complete the sign-in process with the email link
      signInWithEmailLink(auth, email!, window.location.href)
        .then((result) => {
          const user = result.user;

          // Store additional data in Firestore
          this.storeUserData(user.uid, newUserData);

          // automatically signed in
          this.router.navigate(['/complete-registration']);
        })
        .catch((error) => {
          console.error('Error during sign-up:', error.message);
        });
    }
  }

  async storeUserData(uid: string, userData: any) {
    const db = this.firestore; // Firestore instance
    await setDoc(doc(db, 'users', uid), userData)
      .then(() => {
        console.log('User data stored successfully!');
      })
      .catch((error) => {
        console.error('Error storing user data:', error);
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
