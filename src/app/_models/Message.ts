export class Message {
    id : Number;
    sender_id : Number;
    receiver_id: Number;
    chat_relation_id: Number;
    message : string;
    message_type_id : Number;
    message_at : Date;

    constructor(id: Number = -99, sender_id: Number = -99, receiver_id: Number = -1, chat_relation_id: Number = -999,
        message: string = "uninitialized", message_type_id: Number = 1, message_at: Date = new Date()){
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.chat_relation_id = chat_relation_id;
        this.message = message;
        this.message_type_id = message_type_id;
        this.message_at = message_at;
    }
}