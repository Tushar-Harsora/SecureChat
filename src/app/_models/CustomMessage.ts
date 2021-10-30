import { HeaderRowOutlet } from "@angular/cdk/table";
import { PreviouslyContactedUser } from "./PreviouslyContactedUser";
import { NbChatMessageFile } from "@nebular/theme";

export class CustomMessageName{
    name: string;
    avatar: string;

    constructor(username: string, avatar: string = ""){
        this.name = username;
        this.avatar = "https://ui-avatars.com/api/?size=16&name=" + this.name;
    }
}

export class CustomMessage {
    type : string;
    text: string;
    reply: boolean;
    date: Date;
    user: CustomMessageName;
    customMessageData?: any;
    files: NbChatMessageFile[];

    constructor(messageType: string, text: string, reply: boolean, date: Date, user: PreviouslyContactedUser,
        files: string = ""){
        this.type = messageType;
        this.text = text;
        this.reply = reply;
        this.date = date;
        this.user = new CustomMessageName(user.username);
        this.files = [{url: files, type: "image/jpeg"}];
    }
}