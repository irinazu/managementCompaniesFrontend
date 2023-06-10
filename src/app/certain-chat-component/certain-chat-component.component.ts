import {Component, ElementRef, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MessageAndUser} from "../modules/message-and-user";
import {UserSystem} from "../modules/user-system";
import {ImageModel} from "../modules/image-model";
import {PopupDeleteConfirmComponent} from "../popup-delete-confirm/popup-delete-confirm.component";
import {PopupChatComponent} from "../popup-chat/popup-chat.component";
import {Message} from "../modules/message";
import {PopupMaxSizeComponent} from "../popup-max-size/popup-max-size.component";
import {MatDialog} from "@angular/material/dialog";
import * as io from "socket.io-client";
import {UserSystemService} from "../services/user-system.service";
import {MapService} from "../services/map.service";


@Component({
  selector: 'app-certain-chat-component',
  templateUrl: './certain-chat-component.component.html',
  styleUrls: ['./certain-chat-component.component.css']
})
export class CertainChatComponentComponent implements OnInit {
  @ViewChild('scrollPoint') private my_point_3: ElementRef | undefined;
  @ViewChild('resultsStart', {read: ElementRef}) resultsStart: ElementRef | undefined;
  @ViewChild('hide', {read: ElementRef}) hide: ElementRef | undefined;
  @ViewChild('bl', {read: ElementRef}) bl: ElementRef | undefined;

  constructor(private router: ActivatedRoute,
              private serviceChat: ChatService,
              private serviceUser: UserSystemService,
              private matDialog:MatDialog,
              private sanitizer:DomSanitizer,
              private route:Router) {
  }

  //отслеживание закрытия
  @HostListener('window:beforeunload', ['$event'])
  doSomething(event:any) {
    this.serviceChat.userCloseChat(this.chatId,this.userId).subscribe();
  }


  messages: MessageAndUser[] = [];
  title: string = "";
  elementPointed: any[] = [];
  months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек',];
  socket: any;
  indexForUpdatindMessage: number = -1;
  messageForDelete: number[] = [];
  messageForDeleteInClassMessage: MessageAndUser[] = [];
  usersForChat:UserSystem[]=[];
  imageOfChat:ImageModel=new ImageModel();

  //load photo for new message
  formData: FormData = new FormData();
  selectedFiles?: File[];
  previews: string[] = [];
  separateFileForSend:File[]=[];
  editMessagePreviews:ImageModel[]=[];
  imgForEditMessage:number[]=[];

  //для установления лимита загрузки картинок
  generalSizeOfImg:number=0;
  limit:number=10;

  //Показывать корзину или нет
  showTrashCan:boolean=true;

  chatId:number=0;
  userId:number=0;
  userSystem:UserSystem=new UserSystem();

  //показ изображений
  purpose: ImageModel = new ImageModel();
  flagPurpose: boolean = false;


  ngOnInit(): void {
    this.title = this.router.snapshot.params['title'];
    this.chatId=Number(this.router.snapshot.params['id']);
    this.userId=Number(localStorage.getItem("id"));

    //находим юзера
    this.serviceUser.findUser(this.userId).subscribe(value => {
      this.userSystem=value;
    })

    //Аватарка для чата
    this.serviceChat.getChatImg(this.chatId).subscribe(value => {
      if(value!=null){
        this.imageOfChat=this.createFImg(value);
      }
    })

    //Собираем всех пользователей чата
    this.serviceChat.getAllUserForChat(this.chatId).subscribe(value => {
      this.usersForChat = value;
      for (let i = 0; i < this.usersForChat.length; i++) {
        if (this.usersForChat[i].imgAvatar != null) {
          this.usersForChat[i].imgAvatar = this.createFImg(this.usersForChat[i].imgAvatar)
        }
      }

      this.serviceChat.getAllMessageForChat(this.chatId).subscribe(value => {
        this.messages = value;
        for(let i=0;i<this.messages.length;i++){
          this.setImgForUser(i);
        }
        this.messages.sort(function (a, b) {
          return a.id - b.id;
        });
        for(let i=0;i<this.messages.length;i++) {
          if (this.messages[i].imageModelsForMessage){
            for (let j = 0; j < this.messages[i].imageModelsForMessage.length; j++) {
              this.messages[i].imageModelsForMessage[j] = this.createFImg(this.messages[i].imageModelsForMessage[j])
            }
          }
        }
        //Первое непрочитанное сообщение
        this.serviceChat.getDateForUserInChat(this.chatId,this.userId).subscribe(date=>{
          let serviceDate=new Date(date);
          let dateExist=false;
          for(let i=0;i<this.messages.length;i++){
            let messageDate=new Date(this.messages[i].date);
            if(serviceDate.getTime()<messageDate.getTime()){
              dateExist=true;
              this.messagesDown(500,i);
              return;
            }
          }
          if(!dateExist){this.messagesDown(500,-1);}
        })

      })
    })

    this.openCertainChat(this.chatId);
  }

  setImgForUser(messageIdForCheckImg:number){
    // @ts-ignore
    this.messages[messageIdForCheckImg].user_system_object=this.usersForChat.find(x=>x.id===this.messages[messageIdForCheckImg].user_system_id);
  }

  //показываем дату, сверяясь с прошлым сообщением
  showDate(i: number) {
    let date1, date2;
    if (i != 0) {
      date1 = new Date(this.messages[i].date).getDate();
      date2 = new Date(this.messages[--i].date).getDate();
    }
    if (i === 0) return true;
    else if (date1 !== date2) {
      return true;
    } else {
      return false;
    }
  }

  //проверка на юзера, открывшего страницу
  thisUser(userId: number) {
    return userId == this.userId;
  }

  //возвращаем дату в написанном виде
  returnDate(date: string) {
    let day = new Date(date).getDate();
    let month = this.months[new Date(date).getMonth()];
    return day + " " + month;
  }

  //SOCKETS подписки на emit
  openCertainChat(id: number) {
    this.socket = io.io("http://localhost:3000", {transports: ["websocket", "polling", "flashsocket"]});
    this.socket.emit("joinToRoom", id);

    //Добавляет новопришедшие сообщения
    this.socket.on("takeNewMessage", (newMessagInDoc: MessageAndUser) => {
      for(let i=0;i<newMessagInDoc.imageModelsForMessage.length;i++){
        newMessagInDoc.imageModelsForMessage[i]=this.createFImg(newMessagInDoc.imageModelsForMessage[i]);
      }
      this.messages.push(newMessagInDoc);
      this.setImgForUser(this.messages.length-1)
      this.messagesDown(100,-1);
    })

    //Обновляет сообщения от других пользователей
    this.socket.on("takeUpdateMessage", (newMessagInDoc: MessageAndUser) => {
      let elem = this.messages.find(x => x.id == newMessagInDoc.id);
      elem!.content = newMessagInDoc.content;
      for(let i=0;i<newMessagInDoc.imageModelsForMessage.length;i++){
        newMessagInDoc.imageModelsForMessage[i]=this.createFImg(newMessagInDoc.imageModelsForMessage[i]);
      }
      for(let i=0;i<newMessagInDoc.listImgInNumber.length;i++){
        let imageModel=elem!.imageModelsForMessage.find(x=>x.id===newMessagInDoc.listImgInNumber[i]);
        let imgModelForDelete=elem!.imageModelsForMessage.indexOf(imageModel!);
        elem!.imageModelsForMessage.splice(imgModelForDelete,1)
      }
      elem!.imageModelsForMessage.push(...newMessagInDoc.imageModelsForMessage);
    })

    //Удаляет сообщения от других пользователей
    this.socket.on("takeDeleteMessage", (arrayForSendForDeleteMessage: number[]) => {
      for (let i = 0; i < arrayForSendForDeleteMessage.length; i++) {
        let index = this.messages.findIndex(x => x.id == arrayForSendForDeleteMessage[i])
        this.messages.splice(index, 1);
      }
    })

    //Обновляет картинку чата от других пользователей
    this.socket.on("takeNewImgOfChat",(imgOfChat:ImageModel)=>{
      this.imageOfChat=this.createFImg(imgOfChat);
    })
  }

  //опускаем до нижнего сообщения
  messagesDown(time: number,i:number) {
    if(i!=-1){
      setTimeout(() => {
        // @ts-ignore
        document.getElementsByClassName('certainChatMessage')[i].scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, time)

      document.getElementsByClassName('certainChatMessage')[i].setAttribute('style',"transition: 0.3s")
      document.getElementsByClassName('certainChatMessage')[i].setAttribute('style',"background-color:rgb(61 144 206 / 18%)")

      setTimeout(() => {
        document.getElementsByClassName('certainChatMessage')[i].setAttribute('style',"background-color:")

      }, 5000)

    }else {
      setTimeout(() => {
        // @ts-ignore
        this.resultsStart.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, time)
    }
  }

  //выделение полосой выбранного сообщения
  actionWithMessage($event: any, id: number) {

    let clickMessage = $event.target;
    if (clickMessage.className != "editButton") {
      let showTrashCanAllOverTheArray=true;
      if (this.elementPointed.length == 0) {
        this.elementPointed.push(clickMessage);
        clickMessage.setAttribute('style', "background-color:rgb(61 144 206 / 18%)");
        this.messageForDelete.push(id);
      } else if (this.elementPointed.indexOf(clickMessage) > -1) {
        clickMessage.setAttribute('style', "background-color:transparent");
        this.elementPointed.splice(this.elementPointed.indexOf(clickMessage), 1);
        this.messageForDelete.splice(this.messageForDelete.indexOf(id), 1);
      } else {
        clickMessage.setAttribute('style', "background-color:rgb(61 144 206 / 18%)");
        this.elementPointed.push(clickMessage);
        this.messageForDelete.push(id);
      }
      this.showHiddenBlock()

      //показываем кнопку удаления или нет
      for(let i=0;i<this.messageForDelete.length;i++){
        if(!this.showEditButtonFunction(this.messages.find(x=>x.id==this.messageForDelete[i])!.date)){
          this.showTrashCan=false;
          showTrashCanAllOverTheArray=false;
          return;
        }
      }
      if(showTrashCanAllOverTheArray){
        this.showTrashCan=true;
      }
      //------------------------------------

    }
  }

  //показываем верхний блок или нет
  showHiddenBlock() {
    if (this.elementPointed.length == 0) {
      // @ts-ignore
      this.bl?.nativeElement.setAttribute('style', "display:flex");
      // @ts-ignore
      this.hide?.nativeElement.setAttribute('style', "display:none");
    } else {
      // @ts-ignore
      this.hide?.nativeElement.setAttribute('style', "display:flex");
      // @ts-ignore
      this.bl?.nativeElement.setAttribute('style', "display:none");
    }
  }

  //оказываем то сообщение, которое собираемся обновить
  editMessage(i: number) {
    document.getElementById("cancelUpdateMessage")!.setAttribute('style',"display:block");
    (<HTMLInputElement>document.getElementById("newMessage")).value = this.messages[i].content;
    this.editMessagePreviews=[...this.messages[i].imageModelsForMessage];
    this.indexForUpdatindMessage = i;
    document.getElementById("newMessageIcon")!.setAttribute('style', "display:none")
    document.getElementById("editMessageConfirm")!.setAttribute('style', "display:block")
  }

  //подтверждение обновления
  confirmUpdateMessage() {

    this.messages[this.indexForUpdatindMessage].content = (<HTMLInputElement>document.getElementById("newMessage")).value;
    let idForUpdating=this.messages[this.indexForUpdatindMessage].id;
    const messageUpdater = {
      content: this.messages[this.indexForUpdatindMessage].content,
      listImgInNumber: this.imgForEditMessage
    }
    let newMessageInDoc = new MessageAndUser();
    newMessageInDoc.setArgsForUpdate(idForUpdating,messageUpdater.content,this.imgForEditMessage)
    this.serviceChat.updateMessage(idForUpdating,messageUpdater).subscribe(value => {

      if(this.separateFileForSend.length!=0){
        for (let i = 0; i < this.separateFileForSend.length; i++) {
          this.formData.append("imgFile",this.separateFileForSend[i]);
        }
        this.serviceChat.loadPhotoForMessage(idForUpdating,this.formData).subscribe(images => {
          newMessageInDoc.imageModelsForMessage=images;
          for(let i=0;i<newMessageInDoc.imageModelsForMessage.length;i++){
            newMessageInDoc.imageModelsForMessage[i]=this.createFImg(newMessageInDoc.imageModelsForMessage[i]);
          }
          this.messages[this.indexForUpdatindMessage].imageModelsForMessage.push(...newMessageInDoc.imageModelsForMessage);
          this.socket.emit("updateMessage",newMessageInDoc)
        })
        setTimeout(() => {
          this.formData.delete("imgFile");
          this.previews=[];
          this.separateFileForSend=[];
          (<HTMLInputElement>document.getElementById("newMessage")).value = "";
        }, 500)
      }else {
        this.socket.emit("updateMessage",newMessageInDoc);
      }
      this.cancelUpdateMessage();
    });

    for(let i=0;i<this.imgForEditMessage.length;i++){
      let messageForDelete=this.messages[this.indexForUpdatindMessage].imageModelsForMessage.find(x=>x.id===this.imgForEditMessage[i]);
      let imgModelForDelete=this.messages[this.indexForUpdatindMessage].imageModelsForMessage.indexOf(messageForDelete!);
      this.messages[this.indexForUpdatindMessage].imageModelsForMessage.splice(imgModelForDelete,1)
      //this.socket.emit("updateMessage",newMessagInDoc)
    }
    //this.indexForUpdatindMessage = -1;

  }

  //отмена действией
  cancelActions() {
    for (let i = 0; i < this.elementPointed.length; i++) {
      this.elementPointed[i].setAttribute('style', "background-color:transparent");
    }
    this.elementPointed.length = 0;
    this.messageForDelete=[];
    this.showHiddenBlock();
  }

  //удаление сообщений за 24 часа
  deleteMessageConfirm(){
    let deleteConfirm=this.matDialog.open(PopupDeleteConfirmComponent,{width:"40%"})
    deleteConfirm.afterClosed().subscribe(value => {
      //если получено подтверждение на удаление
      if(value){
        let arrayForSendForDeleteMessage=[];
        for (let i = 0; i < this.messageForDelete.length; i++) {
          console.log(this.messageForDelete[i])
          arrayForSendForDeleteMessage.push(this.messages.find(x=>x.id==this.messageForDelete[i])!.id);
        }
        //отправляем серверу на удаление
        this.serviceChat.deleteMessage(arrayForSendForDeleteMessage).subscribe();

        //удаляем у данного юзера
        for (let i = 0; i < this.messageForDelete.length; i++) {
          let index=this.messages.indexOf(this.messages.find(x=>x.id==this.messageForDelete[i])!)
          this.messages.splice(index, 1);
        }
        this.messageForDelete = [];
        this.elementPointed = [];
        this.showHiddenBlock();

        this.socket.emit("deleteMessage", arrayForSendForDeleteMessage);
      }
    })
  }

  //показываем значек обновления сообщения или нет
  showEditButtonFunction(date: any) {
    if (new Date(date).getMonth() == new Date().getMonth() && new Date(date).getDate() == new Date().getDate() &&
      new Date(date).getFullYear() == new Date().getFullYear()) {
      return true;
    } else if (new Date().getDate() - new Date(date).getDate() == 1 && new Date(date).getMonth() == new Date().getMonth() &&
      new Date(date).getFullYear() == new Date().getFullYear()) {
      if (new Date().getHours() + (24 - new Date(date).getHours()) < 25) {
        return true;
      }
    }
    return false;
  }

  //попап на всех участников
  openPopup() {
    let dialogWithUsers=this.matDialog.open(PopupChatComponent,{width:"50%",
      data:{
        title:this.title,
        users:this.usersForChat,
        imageOfChat:this.imageOfChat,
        idOfChat:this.chatId
      }
    })
    dialogWithUsers.afterClosed().subscribe(value => {
      if(value!=null){
        this.imageOfChat=value
        this.socket.emit("newImgOfChat",this.imageOfChat);
      }
    })
  }

  //Обработка картинок
  createFImg(imany:ImageModel):ImageModel{
    const image:any=imany;
    const blob=this.dataURItoBlob(image.picBytes);
    const imgFile=new File([blob],"a",{type:"image/png"});
    const finaleFileHandle:ImageModel={
      id:imany.id,
      picBytes:imany.picBytes,
      file:imgFile,
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile))
    };
    return finaleFileHandle;
  }
  dataURItoBlob(picBytes:any){
    const byteString=window.atob(picBytes);
    const arrayBuffer=new ArrayBuffer(byteString.length);
    const inst8Array=new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      inst8Array[i]=byteString.charCodeAt(i);
    }
    const blob=new Blob([inst8Array],{type:"image/png"});
    return blob;
  }

  //есть у юзера аватар или нет
  checkImgForUser(mem: UserSystem) {
    return mem.imgAvatar!=null;
  }

  //проверяем есть лии вообще картинка для чата
  checkImgForChat(){
    return this.imageOfChat.url!=null;
  }

  //проверяем предыдущее сообщение, ставим картинку или нет
  showImageUser(i: number) {
    if(this.showDate(i)){
      return true;
    }
    if(i!=0){
      return this.messages[i].name!=this.messages[--i].name;
    }
    return false;
  }

  //ставим пустой блок, когда нет картинки
  checkEmptyBlock(i: number) {
    return !this.showImageUser(i);
  }

  //загрузка новых фото
  selectFiles(event: any): void {
    let countImgSelected=event.target.files.length;
    this.generalSizeOfImg=this.editMessagePreviews.length+countImgSelected;

    //проверка количества загружаемых сообщений за одно сообщение
    if(this.generalSizeOfImg>10){
      this.matDialog.open(PopupMaxSizeComponent,{width:"50%"})
    }else {
      this.selectedFiles = event.target.files;
      this.separateFileForSend=Array.from(this.selectedFiles!);
      this.previews = [];

      if (this.selectedFiles) {

        for (let i = 0; i < this.selectedFiles.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }

  //загружаем новое сообщение
  newMessage() {
    this.uploadFiles();
    this.messagesDown(100,-1);
  }
  uploadFiles(): void {

    let message = (<HTMLInputElement>document.getElementById("newMessage")).value;

    //Добавляет новые сообщения самого пользователя
    let newMessageInDoc = new MessageAndUser();
    newMessageInDoc.setArgs(this.userId,this.userSystem.name,this.userSystem.surname,message,new Date().toString())

    //Добавляет новые сообщения самого пользователя
    let newMessage = new Message(message, this.userId, this.chatId);
    for (let i = 0; i < this.separateFileForSend.length; i++) {
      this.formData.append("imgFile",this.separateFileForSend[i]);
    }

    //отправляем на сервер сообщение, если есть то потом и картинки
    if(message.length!=0||this.selectedFiles!=undefined){

      this.serviceChat.sendMessage(newMessage).subscribe(value => {
        newMessageInDoc.id=value;

        if(this.selectedFiles) {
          this.serviceChat.loadPhotoForMessage(value, this.formData).subscribe(images => {
            newMessageInDoc.imageModelsForMessage = images;
            for (let i = 0; i < newMessageInDoc.imageModelsForMessage.length; i++) {
              newMessageInDoc.imageModelsForMessage[i] = this.createFImg(newMessageInDoc.imageModelsForMessage[i]);
            }
            //this.messages.push(newMessageInDoc);
          });
        }
        this.messages.push(newMessageInDoc);
        //очищаем поля для картинок
        setTimeout(() => {
          this.socket.emit("newMessage", newMessageInDoc);
          this.formData.delete("imgFile");
          this.previews=[];
          this.separateFileForSend=[];
          (<HTMLInputElement>document.getElementById("newMessage")).value = "";
        }, 500)
      });

    }
  }

  //удаляем новые изображения
  deleteImage(j: number) {
    this.separateFileForSend.splice(j,1);
    this.previews.splice(j,1);
    /*if(this.previews.length==0){
      document.getElementById("previews")!.setAttribute('style',"display:none");
    }*/
  }

  //удаляем изображения, редактирую сообщение
  deleteImageEditMessagePreviews(i: number) {
    console.log(this.editMessagePreviews[i].id+"delete in deleteImageEditMessagePreviews")
    this.imgForEditMessage.push(this.editMessagePreviews[i].id!);
    this.editMessagePreviews.splice(i,1);
  }

  //отказ в редактировании сообщения - очищение
  cancelUpdateMessage() {
    this.previews=[];
    this.separateFileForSend=[];
    this.selectedFiles=[];
    document.getElementById("cancelUpdateMessage")!.setAttribute('style',"display:none");
    document.getElementById("editMessageConfirm")!.setAttribute('style', "display:none")
    document.getElementById("newMessageIcon")!.setAttribute('style', "display:block")
    this.editMessagePreviews=[];
    this.imgForEditMessage=[];
    (<HTMLInputElement>document.getElementById("newMessage")).value = "";

  }

  //назад
  backToChats() {
    this.route.navigate(['privateOffice','allChat']);
  }

  //показывает выбранные изображения
  showImg(imgModelRequest: ImageModel) {
    this.purpose = imgModelRequest;
    document.getElementById("blockWithZoomImgAndCross")!.setAttribute("style", " display: flex;")
  }

  //закрывает изображение
  closePurposeImg() {
    this.flagPurpose = false;
    document.getElementById("blockWithZoomImgAndCross")!.setAttribute("style", " display: none;")
  }

  userCheck(mes: MessageAndUser) {
    if(mes.user_system_id!=this.userId){
      return false;
    }
    return true;
  }
}
