import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentButton, IonList, IonLabel, IonButton, IonSegment, IonSearchbar, IonFooter, IonItem } from '@ionic/angular/standalone';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/account/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonItem, IonFooter, IonSearchbar, IonSegment, IonButton, IonLabel, IonList, IonSegmentButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  // component fields
  searchTerm = '';
  selectedSegment = 'all';

  // dummy data
  private tournaments$ = new BehaviorSubject<any[]>(
    [
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
      { name: "All Ireland's Judo", date: new Date('2025-10-03T10:00:00'), status: 'all' },
      { name: "Active Judo Tournament", date: new Date('2025-10-02T09:00:00'), status: 'active' },
      { name: "Past Judo Tournament", date: new Date('2024-10-01T11:00:00'), status: 'past' },
      { name: "Upcoming Judo Tournament", date: new Date('2025-10-03T10:00:00'), status: 'upcoming' },
    ]
  );

  // public filtered data
  filteredData$: Observable<any[]>;


  constructor(private router: Router, private authService: AuthService) {
    // Initially no filter: show everything
    this.filteredData$ = this.tournaments$.asObservable();

    // user can't skip foward to fashboard if they are not logged in
    if (this.authService.getCurrentUser() == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() { }

  public filterTournaments() {
    this.filteredData$ = this.tournaments$.pipe(
      map((tournaments) =>
        tournaments.filter(
          (tournament) =>
            (this.selectedSegment === 'all' || tournament.status === this.selectedSegment) &&
            tournament.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
    );
  }

  // helper function to automatically set class for css
  getItemClass(status: string) {
    switch (status) {
      case 'active':
        return 'active-tournament';
      case 'past':
        return 'past-tournament';
      case 'upcoming':
        return 'upcoming-tournament';
      default:
        return '';
    }
  }

  // w.i.p button
  addTournament() {
    console.log('Add tournament clicked');
  }

  openTournamentDetails(tournament: any) {
    this.router.navigate(['/tournament-participant'], {
      state: { tournament: tournament }
    })
  }
}
