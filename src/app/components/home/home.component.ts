import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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
  _currentMessages: Message[];
  _messagesLoaded: Boolean;
  
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
    this._currentMessages = [];
    this._messagesLoaded = false;
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
    return ;
    this._chatroomService.getConversation(uid).subscribe(result =>{
      this._currentMessages = result;
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
