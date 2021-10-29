import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PreviouslyContactedUser } from '../_models/PreviouslyContactedUser';
import { Message } from '../_models/Message';

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

  getConversation(chat_relation_id: Number){
    return this.http.post<Message[]>(`${environment.apiUrl}/Chat/getConversation`, {chat_relation_id})
      .pipe(map(response => {
        return response;
      }));
  }
}
