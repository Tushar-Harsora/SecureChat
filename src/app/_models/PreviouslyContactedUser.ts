export class PreviouslyContactedUser {
    uid : Number;
    email: string;
    phone_number: string;
    username: string;
    chat_relation_id : Number;
    unread_counts: Number;
    public_key: string;

    constructor(){
        this.uid = -99;
        this.email = "john@gmail.com";
        this.phone_number = "9999999999";
        this.username = "John Doe";
        this.chat_relation_id = -99;
        this.unread_counts = 0;
        this.public_key = "";
    }
}