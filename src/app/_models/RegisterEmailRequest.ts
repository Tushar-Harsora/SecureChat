export class RegisterEmailRequest {
    email: string;
    phone_number?: string;
    username?: string;
    public_key: string;

    constructor(email: string, public_key: string){
        this.email = email;
        this.phone_number = undefined;
        this.username = undefined;
        this.public_key = public_key;
    }
}