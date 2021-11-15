export class User {
    uid?: Number;
    email?: string;
    phone_number?: string;
    username?: string;
    token?: string;

    constructor(){
        this.uid = -1;
        this.email = "example@example.com";
        this.phone_number = "9999999999";
        this.username = "uninitialized";
        this.token = undefined;
    }
}