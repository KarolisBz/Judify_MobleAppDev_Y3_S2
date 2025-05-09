import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'tournament-participant',
    loadComponent: () => import('./tournament-participant/tournament-participant.page').then( m => m.TournamentParticipantPage)
  },
  {
    path: 'gesture-test',
    loadComponent: () => import('./gesture-test/gesture-test.page').then( m => m.GestureTestPage)
  },
  {
    path: 'complete-registration',
    loadComponent: () => import('./complete-registration/complete-registration.page').then( m => m.CompleteRegistrationPage)
  },
];
