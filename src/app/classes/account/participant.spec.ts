import { Participant } from './participant';

describe('Participant', () => {
  // Mock Data
  const name = 'Name';
  const club = 'Club Name';
  const email = 'email@example.ie';
  const homeAddress = '123 Street Name, City, Country';
  const phoneNumber = '123-456-7890';
  const emergencyContact = '987-654-3210';
  const sex = 'Male';
  const age = 0;
  const weightClass = '66kg';
  const belt = 'White';
  const createdAt = new Date();
  const tournament_code = 'XXX-XXX-XXX-XXX-XXX';

  it('should create an instance', () => {
    const participant = new Participant(
      name, club, email, homeAddress, phoneNumber, emergencyContact, sex, age, weightClass, belt, createdAt, tournament_code
    );
    expect(participant).toBeTruthy();
  });
});

