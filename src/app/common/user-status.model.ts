// UserStatusModel is used to track current user information and status.
// If not the user is not logged in, this should be set to null.
export class UserStatusModel {

  constructor(firstName: string, lastName: string, username: string, email: string, ufid: string, role: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.ufid = ufid;
    this.role = role;
  }

  firstName: string;
  lastName: string;
  username: string;
  email: string;
  ufid: string;
  role: string;
}
