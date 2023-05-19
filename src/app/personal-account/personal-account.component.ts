import { Component, OnInit } from '@angular/core';
import {UserSystem} from "../modules/user-system";
import {UserSystemService} from "../services/user-system.service";
import {ImageModel} from "../modules/image-model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {

  constructor(private userService:UserSystemService,private sanitizer: DomSanitizer) { }

  idUser:number=-1;
  user:UserSystem=new UserSystem();

  flagPhone:boolean=false;
  flagEmail:boolean=false;
  flagPasswordTrueFromServer:boolean=false;
  flagPassword:boolean=false;

  newPhone:string="";
  newEmail:string="";
  newPassword:string="";
  oldPassword:string="";

  errorFromServerConfirm:string="";

  formData: FormData = new FormData();
  selectedFiles?: File[];

  errorEmail:string="";
  errorPhone:string="";
  errorPassword:string="";
  errorAvatar:string="";

  flagOnNews:boolean=false;

  ngOnInit(): void {
    this.idUser=Number(localStorage.getItem("id"));

    this.userService.findUser(this.idUser).subscribe(value => {
      this.user=value;
      this.flagOnNews=this.user.flagOnTakeNews;

      if(this.user.flagOnTakeNews){
        (<HTMLInputElement>document.getElementById("newsTaker"))!.checked = true;
      }

      if (this.user.imgAvatar!=null){
        this.user.imgAvatar=this.createFImg(this.user.imgAvatar);
      }
    })
  }

  changePhone() {
    this.flagPhone=true;
  }
  cancelPhone() {
    this.flagPhone=false;
    this.newPhone="";
  }

  changeEmail() {
    this.flagEmail=true;
  }
  cancelEmail() {
    this.flagEmail=false;
    this.newEmail="";
  }

  changePassword() {
    this.flagPassword=true;
  }
  cancelPassword() {
    this.flagPassword=false;
    this.newPassword="";
    this.oldPassword="";
  }

  sendPhone() {
    this.errorPhone="";
    this.user.phone=this.newPhone;

    if(this.newPhone.length!=0){
      this.userService.changePhone(this.idUser,this.newPhone).subscribe(value => {
        this.newPhone="";
        this.flagPhone=false;
        Object.assign(this.user.phone,this.newPhone)

      });
    }else {
      this.errorPhone="Введите номер телефона"
    }
  }
  sendEmail() {
    this.user.email=this.newEmail;
    this.errorEmail="";

    if (this.newEmail.length!=0){
      this.userService.changeEmail(this.idUser,this.newEmail).subscribe(value => {
        Object.assign(this.user.email,this.newEmail)
        this.newEmail="";
        this.flagEmail=false;

      });
    }else {
      this.errorEmail="Введите Email"
    }
  }

  sendPassword() {
    this.errorFromServerConfirm="";
    if(this.oldPassword.length!=0){
      this.userService.confirmChangePassword(this.idUser,this.oldPassword).subscribe(value => {
        if(value){
          this.flagPassword=false;
          this.flagPasswordTrueFromServer=value;
        }else {
          this.errorFromServerConfirm="Пароль не совпадает";
        }
      });
    }else {
      this.errorPassword="Введите пароль"
    }
  }

  sendPasswordTrueFromServer() {
    this.errorPassword="";

    if(this.newPassword.length!=0){
      this.userService.changePassword(this.idUser,this.newPassword).subscribe(value => {
        this.newPassword="";
        this.oldPassword="";
        this.flagPasswordTrueFromServer=false;
      });
    }else {
      this.errorPassword="Введите пароль"
    }
  }
  cancelPasswordTrueFromServer() {
    this.flagPasswordTrueFromServer=false;
  }


  //формируем файлы для отправки на сервер в formData
  selectFiles(event: any) {
    //очищаем места хранения картинок
    this.formData.delete("fileForAvatar");
    this.selectedFiles = [];

    this.selectedFiles = event.target.files;

    this.formData.append("fileForAvatar", this.selectedFiles![0]);
  }

  createFImg(imany: ImageModel): ImageModel {
    const image: any = imany;

    const blob = this.dataURItoBlob(image.picBytes);
    const imgFile = new File([blob], "i", {type: "image/png"});
    const finaleFileHandle: ImageModel = {
      file: imgFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile)),
      id:undefined,
      picBytes:undefined
    };

    return finaleFileHandle;
  }

  dataURItoBlob(picBytes: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const inst8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      inst8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([inst8Array], {type: "image/png"});
    return blob;
  }

  changeAvatar() {
    this.errorAvatar="";

    if(this.formData.has("fileForAvatar")){
      this.userService.changeAvatar(this.idUser,this.formData).subscribe(value => {
        this.user.imgAvatar=value;
        this.user.imgAvatar=this.createFImg(this.user.imgAvatar);

        //очищаем места хранения картинок
        (<HTMLInputElement>document.querySelector('input[type=file]')).value = '';
        this.formData.delete("fileForAvatar");
        this.selectedFiles = [];
      })
    }else {
      this.errorAvatar="Новое изображение не выбрано";
    }

  }

  //меняем флаг на новостях
  changeFlagOnTakeNews() {
    this.flagOnNews=!this.flagOnNews;
    this.userService.changeFlagOnTakeNews(this.idUser,this.flagOnNews).subscribe()
  }
}
