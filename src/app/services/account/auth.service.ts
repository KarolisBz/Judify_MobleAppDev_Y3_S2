import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// firebase
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user as an observable
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private auth: Auth) { 
    // change user automatically
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.next(user);
    });
  }

  // login promise operation working in the background
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  // logout promise operation working in the background
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // getters
  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
