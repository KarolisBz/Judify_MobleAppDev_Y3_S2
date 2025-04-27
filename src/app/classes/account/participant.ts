export class Participant {
    private name: string
    private club: string
    private email: string
    private homeAddress: string
    private phoneNumber: string
    private emergencyContact: string
    private sex: string
    private age: number
    private weightClass: string
    private belt: string
    private createdAt: Date
    private tournament_entries: string[] = []

    // Constructor to initialize user
    constructor(name: string = '', club: string = '', email: string = '', homeAddress: string = '', phoneNumber: string = '', emergencyContact: string = '', sex: string = 'Male', age: number = 0, weightClass: string = '', belt: string = '', createdAt: Date = new Date(), tournament_code?: string) {
        this.name = name
        this.club = club
        this.email = email
        this.homeAddress = homeAddress
        this.phoneNumber = phoneNumber
        this.emergencyContact = emergencyContact
        this.sex = sex
        this.age = age
        this.weightClass = weightClass
        this.belt = belt
        this.createdAt = createdAt

        // add tournament to the user
        if (tournament_code) {
            this.tournament_entries.push(tournament_code)
        }
    }

    // convert to data transfer object
    public toDTO = () => {
        return {
            name: this.name,
            club: this.club,
            email: this.email,
            homeAddress: this.homeAddress,
            phoneNumber: this.phoneNumber,
            emergencyContact: this.emergencyContact,
            sex: this.sex,
            age: this.age,
            weightClass: this.weightClass,
            belt: this.belt,
            createdAt: this.createdAt,
        };
    };

    // getters
    getFullName(): string {
        return `${this.name}`;
    }

    getEmail(): string {
        return this.email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getHomeAddress(): string {
        return this.homeAddress;
    }
    getEmergencyContact(): string {
        return this.emergencyContact;
    }
    getSex(): string {
        return this.sex
    }
    getWeightClass(): string {
        return this.weightClass
    }
    getBelt(): string {
        return this.belt
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getTournamentEntries(): string[] {
        return this.tournament_entries
    }

}
