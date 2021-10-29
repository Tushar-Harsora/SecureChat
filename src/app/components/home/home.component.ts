import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomMessage } from 'src/app/_models/CustomMessage';
import { Message } from 'src/app/_models/Message';
import { PreviouslyContactedUser } from 'src/app/_models/PreviouslyContactedUser';
import { ChatroomService } from 'src/app/_services/chatroom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  _chatroomService: ChatroomService;
  _previousContacted: PreviouslyContactedUser[];
  _previousLoaded: Boolean;
  _currentMessages: any[];
  _messagesLoaded: Boolean;
  _currentChatUser: PreviouslyContactedUser;
  
  readonly tableData = {
    columns: ['First Name', 'Last Name', 'Age'],
    rows: [
      { firstName: 'Robert', lastName: 'Baratheon', age: 46 },
      { firstName: 'Jaime', lastName: 'Lannister', age: 31 },
    ],
  };

  messages: any[] = [];

  constructor(private chatroomService: ChatroomService) {
    this.loadMessages();
    this._chatroomService = chatroomService;
    this._previousContacted = [];
    this._previousLoaded = false;
    this._currentMessages = this.messages;
    this._messagesLoaded = true;
    this._currentChatUser = new PreviouslyContactedUser();
  }

  ngOnInit(): void {
    this._chatroomService.getPreviouslyContacted().subscribe(result =>{
      this._previousContacted = result;
      this._previousLoaded = true;
    });
  }

  sendMessage(event: any): void {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: 'text',
      user: {
        name: 'Gandalf the Grey',
        avatar: 'https://i.gifer.com/no.gif', 
      },
    });
  }

  getConversation(uid: Number){
    console.log(`Fetching conversation for userid ${uid}`);
    const selected = this._previousContacted.find(user => user.uid == uid);
    this._currentChatUser = selected ? selected : new PreviouslyContactedUser();
    // return ;
    this._chatroomService.getConversation(this._currentChatUser.chat_relation_id).subscribe(result =>{
      // this._currentMessages = result;
      const fetchedMessages: CustomMessage[] = [];
      result.forEach(mess => {
        const fromMe: boolean = mess.receiver_id == this._currentChatUser.uid;
        console.log(mess);
        // console.log(`reciever ${mess.receiver_id}   from me: ${fromMe}`);
        
        fetchedMessages.push(new CustomMessage('text', mess.message, fromMe, mess.message_at, this._currentChatUser))
      });
      this._currentMessages = fetchedMessages;
      this._messagesLoaded = true;
    }); 
  }
  private loadMessages(): void {
    this.messages = [
      {
        type: 'link',
        text: 'Now you able to use links!',
        customMessageData: {
          href: 'https://google.com/',
          text: 'Go to Google',
        },
        reply: false,
        date: new Date(),
        user: {
          name: 'Frodo Baggins',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'link',
        customMessageData: {
          href: 'https://facebook.com/',
          text: 'Go to Facebook',
        },
        reply: true,
        date: new Date(),
        user: {
          name: 'Meriadoc Brandybuck',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'button',
        customMessageData: 'Click to scroll down',
        reply: false,
        date: new Date(),
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        },
      },
      {
        type: 'file',
        files: [{ url: 'https://picsum.photos/320/240/?image=387', type: 'image/jpeg' }],
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        }
      },
    ]
  }
}
