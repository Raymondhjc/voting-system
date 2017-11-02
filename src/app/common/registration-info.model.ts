// This is the template of registration request.
export class RegistrationInfoModel {
    constructor(firstName: string, lastName: string, username: string, password: string, email: string, ufid: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.ufid = ufid;
    }

    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    ufid: string;
}
