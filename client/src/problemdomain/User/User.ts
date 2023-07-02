//User.ts
export class User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;

  constructor(
    id: string,
    username: string,
    email: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}

  