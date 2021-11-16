import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PreviouslyContactedUser } from '../_models/PreviouslyContactedUser';
import { Message } from '../_models/Message';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  getPreviouslyContacted(): Observable<PreviouslyContactedUser []>  {
    return this.http.post<PreviouslyContactedUser[]>(`${environment.apiUrl}/Chat/getPreviouslyContacted`, null)
      .pipe(map(response => {
        return response;
      }));
  }

  getConversation(chat_relation: Number){
    const chat_relation_id = chat_relation.toString();
    return this.http.post<Message[]>(`${environment.apiUrl}/Chat/getConversation`, {chat_relation_id})
      .pipe(map(response => {
        return response;
      }));
  }

  searchUser(email: String){
    return this.http.post<User>(`${environment.apiUrl}/User/GetUserFromEmail`, {email})
      .pipe(map(response => {
        return response;
      })); 
  }

  sendMessage(message: Message){
    const headers = new HttpHeaders().set('Content-Type','application/json')

    return this.http.post<any>(`${environment.apiUrl}/Chat/sendMessage`, JSON.stringify(message), { headers: headers })
      .pipe(map(response =>{
        return response;
      }));
  }
}
