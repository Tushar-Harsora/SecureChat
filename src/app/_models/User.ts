export class User {
    id?: number;
    username?: string;
    token?: string;

    constructor(){
        this.id = -1;
        this.username = "uninitialized";
        this.token = undefined;
    }
}