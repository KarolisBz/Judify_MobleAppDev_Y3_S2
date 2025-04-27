import { Injectable } from '@angular/core';
import { Firestore, where, query, getDocs, collection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private firestore: Firestore) { }

  getTournaments(visibleTournaments: string[]): Observable<any[]> {
    const tournamentsCollection = collection(this.firestore, 'tournaments');

    // filter by visible tournaments
    // '__name__' => document id
    const filteredQuery = query(
      tournamentsCollection,
      where('__name__', 'in', visibleTournaments)
    );

    // fetching documents from collection database
    return from(
      getDocs(filteredQuery).then((querySnapshot) => {
        const tournaments: any[] = [];
        querySnapshot.forEach((doc) => {
          tournaments.push(doc.data());
        });
        return tournaments;
      })
    );
  }
}
