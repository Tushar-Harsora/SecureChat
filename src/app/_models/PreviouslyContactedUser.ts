export class PreviouslyContactedUser {
    uid : Number;
    email: string;
    phone_number: string;
    username: string;
    chat_relation_id : Number;

    constructor(){
        this.uid = -99;
        this.email = "john@gmail.com";
        this.phone_number = "9999999999";
        this.username = "John Doe";
        this.chat_relation_id = -99;
    }
}