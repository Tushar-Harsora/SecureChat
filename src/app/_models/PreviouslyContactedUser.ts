export class PreviouslyContactedUser {
    uid : Number;
    email: string;
    phone_number: string;
    username: string;
    chat_relation_id : Number;

    constructor(){
        this.uid = -99;
        this.email = "example@example.com";
        this.phone_number = "9999999999";
        this.username = "uninitialized";
        this.chat_relation_id = -99;
    }
}