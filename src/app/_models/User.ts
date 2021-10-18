export class User {
    email?: string;
    phone_number?: string;
    username?: string;
    token?: string;

    constructor(){
        this.email = "example@example.com";
        this.phone_number = "9999999999";
        this.username = "uninitialized";
        this.token = undefined;
    }
}