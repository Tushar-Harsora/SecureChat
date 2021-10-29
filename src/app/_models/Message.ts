export class Message {
    id : Number;
    sender_id : Number;
    receiver_id: Number;
    chat_relation_id: Number;
    message : String;
    message_type_id : Number;
    message_at : Date;

    constructor(){
        this.id = -99;
        this.sender_id = -99;
        this.receiver_id = -1;
        this.chat_relation_id = -999;
        this.message = "uninitialized";
        this.message_type_id = 1;
        this.message_at = new Date();
    }
}