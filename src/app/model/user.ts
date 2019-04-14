export class User {
  id:      string;
  pseudo:  string;
  friends: Friend[];
}

export class Friend {
  id: string;
  pseudo: string;

  constructor(id: string, pseudo: string) {
    this.id = id;
    this.pseudo = pseudo;
  }
}
