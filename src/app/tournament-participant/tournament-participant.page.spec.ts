import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentParticipantPage } from './tournament-participant.page';

describe('TournamentParticipantPage', () => {
  let component: TournamentParticipantPage;
  let fixture: ComponentFixture<TournamentParticipantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
