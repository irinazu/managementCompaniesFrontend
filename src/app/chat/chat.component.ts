import {AfterViewChecked, Component, ElementRef, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Messaggio} from "../modules/messaggio";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  socket?: WebSocket;
  stompClient?: Stomp.Client;

  ngOnInit(): void {
    this.socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {

    });

  }


/*sendMessage() {
  // @ts-ignore
  this.stompClient.send('/app/send/message' , {}, this.input);
}
url = 'http://localhost:8080';
otherUser?:string="vasia";
thisUser?: string="ira";
channelName?: string="cool";*/
  /*socket?: WebSocket;
  stompClient?: Stomp.Client;*/
  /*newMessage = new FormControl('');
  messages?: Observable<Array<Messaggio>>;*/


 /* constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private el: ElementRef) {}*/


 // ngOnInit(): void {
    /*this.userService
      .getUserByNickname(this.route.snapshot.paramMap.get('user')!)
      .subscribe((data) => {
        this.otherUser = data;
        this.otherUser.propic = "data:image/jpeg;base64,"+ this.otherUser.propic;
        this.connectToChat();
        console.log(this.el)
        this.el.nativeElement.querySelector("#chat").scrollIntoView();
      });*/
   /* this.connectToChat();
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(){
    var container = this.el.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  connectToChat() {

    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      //func = what to do when connection is established
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/topic/messages/' + this.channelName,
        (response) => {
          //func = what to do when client receives data (messages)
          this.loadChat();
        }
      );
    });
  }

  sendMsg() {
    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
  }

  loadChat(){
    this.messages = this.http.post<Array<Messaggio>>(this.url+'/getMessages' ,  this.channelName);
    this.messages.subscribe(data => {
      console.log("data")
      console.log(data)
      console.log("data")

      let mgs:Array<Messaggio> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id) ? 1 : -1)
      this.messages = of(mgs);
    })
    console.log(this.messages);
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }*/
}
