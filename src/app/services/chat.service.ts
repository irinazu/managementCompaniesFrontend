import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ImageModel} from "../modules/image-model";
import {Message} from "../modules/message";
import {UserSystem} from "../modules/user-system";
import {MessageAndUser} from "../modules/message-and-user";
import {Chat} from "../modules/chat";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  urlJavaServer:string="http://localhost:8080/userInfo"
  urlJavaServerChat:string="http://localhost:8080/chat"

  constructor(private http:HttpClient) { }

  //все чаты для определенного user
  getAllChatForUser(id:number):Observable<Chat[]>{
    return this.http.get<Chat[]>(`${this.urlJavaServerChat}/getAllChatForUser/${id}`)
  }

  //все сообщения для чата
  getAllMessageForChat(id:number):Observable<MessageAndUser[]>{
    return this.http.get<MessageAndUser[]>(`${this.urlJavaServerChat}/getAllMessageForChat/${id}`)
  }

  //последнее сообщение для чата
  getLastMessageForChat(id:number):Observable<Message>{
    return this.http.get<Message>(`${this.urlJavaServerChat}/getLastMessageForChat/${id}`)
  }

  //обновление сообщения
  updateMessage(id:number, messageForSend: {content: any,listImgInNumber:number[]}):Observable<any> {
    return this.http.post<Observable<any>>(`${this.urlJavaServerChat}/updateMessage/${id}`,messageForSend)
  }

  //удаление сообщений
  deleteMessage(messagesId:number[]):Observable<any> {
    return this.http.post(`${this.urlJavaServerChat}/deleteMessage`,messagesId);
  }
  getAllUserForChat(id:number):Observable<UserSystem[]> {
    return this.http.get<UserSystem[]>(`${this.urlJavaServer}/getUsersForChat/${id}`);
  }
  //взять конкретное изображение для чата
  getChatImg(id:number):Observable<ImageModel>{
    return this.http.get<ImageModel>(`${this.urlJavaServerChat}/getChatImg/${id}`);
  }
  //загрузить изображение для конкретного чата на сервер
  loadChatImgOnServer(id:number,formData:FormData):Observable<ImageModel>{
    return this.http.post<ImageModel>(`${this.urlJavaServerChat}/loadImgOfChatOnServer/${id}`,formData);
  }
  //загрузить сообщение
  sendMessage(messageForSend: Message):Observable<number> {
    return this.http.post<number>(`${this.urlJavaServerChat}/sendNewMessage`,messageForSend)
  }
  //загрузить изображение для конкретного сообщения на сервер
  loadPhotoForMessage(id:number,formData:FormData):Observable<ImageModel[]>{
    return this.http.post<ImageModel[]>(`${this.urlJavaServerChat}/loadPhotoForMessage/${id}`,formData);
  }
  //отслеживание непрочитанных сообщений
  userCloseChat(chatId:number,userId:number):Observable<any>{
    return this.http.get(`${this.urlJavaServerChat}/userCloseChat/${chatId}/${userId}`);
  }
  getDateForUserInChat(chatId:number,userId:number):Observable<string>{
    return this.http.get<string>(`${this.urlJavaServerChat}/getDateForUserInChat/${chatId}/${userId}`);
  }

  get(url: string): Observable<any>{
    return this.http.get(url);
  }
}
