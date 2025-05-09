import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { Platform } from '@ionic/angular';
import { Participant } from 'src/app/classes/account/participant';
import { Router } from '@angular/router';
import { LocalpersistenceService } from '../presistance/localpersistence.service';
// firebase
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user as an observable
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private auth: Auth, private toastController: ToastController, private firestore: Firestore, private router: Router, private platform: Platform, private localPersistence: LocalpersistenceService) {
    // change user automatically
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
      console.log('User state changed:', user?.uid);
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
        this.localPersistence.setItem('emailForSignIn', email);
        this.localPersistence.setItem('newUserData', newUserData);
        console.log('sign-up email sent!');
      })
      .catch((error) => {
        console.error('Error sending email link:', error.message);
      });
  }

  async completeRegistration(auth: any, actionCode: any) {
    const email = await this.localPersistence.getItem('emailForSignIn');
    const newUserData = await this.localPersistence.getItem('newUserData');

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

  // login promise operation working in the background
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.localPersistence.setItem("user_info", {uid: this.auth.currentUser?.uid, email: email, password: password})
      this.showToast('Login success', 'success', 1000);
      this.router.navigate(['/dashboard']);
    }
    catch (error) {
      console.error('Login failed', error);
      this.showToast('Login failed. Please check your credentials.', 'danger');
    }
  }

  // logout promise operation working in the background
  async logout(): Promise<void> {
    this.localPersistence.clearStorage();
    await signOut(this.auth);
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

  // getters
  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  async getUserData(uid: string): Promise<any> {
    if (uid) {
      const db = this.firestore; // Firestore instance
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef); // fetching document

      if (docSnap.exists()) {
        return docSnap.data()['tournament_entries'];
      } else {
        console.log('No such document!');
      }
    }
  }

  // native toast message
  async showToast(message: string, color: string, duration: number = 2500) {
    if (this.platform.is('capacitor')) {
      await Toast.show({
        text: message,
        duration: 'long',
        position: 'bottom',
      });
    } else {
      const toast = await this.toastController.create({
        message: message,
        duration: duration,  // 2 seconds duration
        position: 'bottom',
        color: color,
      });
      await toast.present();
    }
  }
}
