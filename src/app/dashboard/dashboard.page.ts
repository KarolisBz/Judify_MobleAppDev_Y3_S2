import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentButton, IonList, IonLabel, IonButton, IonSegment, IonSearchbar, IonFooter, IonItem } from '@ionic/angular/standalone';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/account/auth.service';
import { ServerDataService } from '../services/serverData/server-data.service';

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
  private tournamentsSubject = new BehaviorSubject<any[]>([]);

  // public filtered data
  filteredData$?: Observable<any[]>;


  constructor(private router: Router, private authService: AuthService, private serverData: ServerDataService) {
    // user can't skip foward to fashboard if they are not logged in
    if (this.authService.getCurrentUser() == null) {
      //this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    // Initially no filter: show everything
    let userData: any = await this.authService.getUserData("eAVIYEbNyMQDEpVxAhERlM0hMbE3");  // Get user data
    console.log(userData);
    
    // Fetch tournament entries based on user data
    this.serverData.getTournaments(userData).subscribe((data: any) => {
      data.map((tournament: any) => {
        tournament.date = new Date(tournament.date.seconds * 1000);
      });

      this.tournamentsSubject.next(data);  // Update BehaviorSubject with new data
    });

    // Define the filteredData$ observable
    this.filteredData$ = this.tournamentsSubject.asObservable();
   }

  public filterTournaments() {
    this.filteredData$ = this.tournamentsSubject.pipe(
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
