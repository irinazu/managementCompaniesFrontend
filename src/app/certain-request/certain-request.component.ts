import { Component, OnInit } from '@angular/core';
import {RequestUpdate} from "../modules/request-update";
import {RequestService} from "../services/request.service";
import {Request} from "../modules/request";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {ImageModel} from "../modules/image-model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {RequestStatus} from "../modules/request-status";
import {UserSystemService} from "../services/user-system.service";
import {UserSystem} from "../modules/user-system";

@Component({
  selector: 'app-certain-request',
  templateUrl: './certain-request.component.html',
  styleUrls: ['./certain-request.component.css']
})
export class CertainRequestComponent implements OnInit {

  ngModel: any;
  certainRequest: Request = new Request();
  editorFlag: boolean = false;

  errorFiles: string = "";
  errorComment: string = "";
  flag: boolean = true;
  idRequest: number = 0;

  formData: FormData = new FormData();
  selectedFiles?: File[];

  purpose: ImageModel = new ImageModel();
  flagPurpose: boolean = false;
  showImgIndex: number = -1;
  idUser:number=-1;
  statuses: RequestStatus[] = [];

  userSystem:UserSystem=new UserSystem();

  constructor(private requestService: RequestService,
              private router: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private userService:UserSystemService) {
  }

  ngOnInit(): void {
    //находим id определенного заявления
    this.idRequest = this.router.snapshot.params['id'];
    this.idUser = Number(localStorage.getItem("id"));

    this.requestService.getCertainRequestForUser(this.idRequest).subscribe(value => {
      this.certainRequest = value;
      this.certainRequest.imageModelsForRequest = this.createFImg(this.certainRequest.imageModelsForRequest);
      for (let i = 0; i < this.certainRequest.requestUpdateDTOS.length; i++) {
        this.certainRequest.requestUpdateDTOS[i].imageModelsForRequestUpdate = this.createFImg(this.certainRequest.requestUpdateDTOS[i].imageModelsForRequestUpdate);
      }
      this.sortUpdates(this.certainRequest);
    })

    //собираем все существующие статусы
    this.requestService.getStatuses().subscribe(value => {
      this.statuses = value;
      this.statuses.push({id:-1,titleOfStatus:"без статуса",filePath:""})
    })

    //заявитель
    this.userService.findUserByRequest(this.idRequest).subscribe(user=>{
      this.userSystem=user;
    })
  }

  //публикуем новое обновление
  createNewUpdateRequest() {
    this.errorComment = "";
    this.flag = true;

    if (this.ngModel == undefined) {
      this.errorComment = "Заявка должна быть заполнена";
      this.flag = false;
    }


    if (this.flag) {
      let newRequestUpdate = new RequestUpdate();

      if(localStorage.getItem('role')==="DISPATCHER"){
        let reqStatus = (<HTMLInputElement>document.getElementById("selectStatus")).value;
        if(reqStatus!="без статуса"){
          newRequestUpdate.requestStatusDTO=this.statuses.find(x=>x.titleOfStatus===reqStatus);
        }
      }

      let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
      if (markedCheckbox.length == 0) {
        newRequestUpdate.setArgs(this.ngModel,  false);
      } else {
        newRequestUpdate.setArgs(this.ngModel, true);
      }
      this.requestService.createNewRequestUpdate(newRequestUpdate, this.idRequest,this.idUser).subscribe(requestUpdate => {
        this.certainRequest.requestUpdateDTOS.push(requestUpdate);
        //очищаем поле обновления заявления
        this.ngModel="";

        //второй запрос если были опубликоваы картинки
        if (this.formData.has("fileForRequestUpdate")) {
          this.requestService.createNewRequestUpdateImg(this.formData, requestUpdate.id).subscribe(requestUpdateWithImg=>{
            let sizeRequestUpdateDTOS= this.certainRequest.requestUpdateDTOS.length;
            this.certainRequest.requestUpdateDTOS[sizeRequestUpdateDTOS-1].imageModelsForRequestUpdate=requestUpdateWithImg.imageModelsForRequestUpdate;
            this.certainRequest.requestUpdateDTOS[sizeRequestUpdateDTOS-1].imageModelsForRequestUpdate = this.createFImg(this.certainRequest.requestUpdateDTOS[sizeRequestUpdateDTOS-1].imageModelsForRequestUpdate);

            //очищаем места хранения картинок
            (<HTMLInputElement>document.querySelector('input[type=file]')).value = '';
            this.formData.delete("fileForRequestUpdate");
            this.selectedFiles = [];

          });
        }
      })
    }
  }

  //формируем файлы для отправки на сервер в formData
  selectFiles(event: any) {
    this.errorFiles = "";
    this.formData.delete("fileForRequestUpdate");
    this.selectedFiles = [];

    let countImgSelected = event.target.files.length;
    if (countImgSelected > 10) {
      this.errorFiles = "Не более 10 файлов";
      (<HTMLInputElement>document.querySelector('input[type=file]')).value = '';
    } else {
      this.selectedFiles = event.target.files;
      for (let i = 0; i < countImgSelected; i++) {
        this.formData.append("fileForRequestUpdate", this.selectedFiles![i]);
      }
    }
  }

  createFImg(imany: ImageModel[]): ImageModel[] {
    const images: any[] = imany;
    const imagesHandle: ImageModel[] = [];
    for (let i = 0; i < images.length; i++) {
      const imageFileData = images[i];
      const blob = this.dataURItoBlob(imageFileData.picBytes);
      const imgFile = new File([blob], "i", {type: "image/png"});
      const finaleFileHandle: ImageModel = {
        file: imgFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile)),
        id:undefined,
        picBytes:undefined
      };
      imagesHandle.push(finaleFileHandle);
    }
    //this.imageForShow=imagesHandle;
    return imagesHandle;
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


  //закрывает изображение
  closePurposeImg() {
    this.flagPurpose = false;
    document.getElementsByClassName("blockWithZoomImgAndCross")[this.showImgIndex].setAttribute("style", " display: none;")
    this.showImgIndex = -1;
  }

  //показывает выбранные изображения
  showImg(imgModelRequest: ImageModel, index: number) {
    this.showImgIndex = index;
    this.purpose = imgModelRequest;
    document.getElementsByClassName("blockWithZoomImgAndCross")[index].setAttribute("style", " display: flex;")
  }

  //сортировка обновлений
  sortUpdates(certainRequest:Request) {
    certainRequest.requestUpdateDTOS.sort( function( a , b){
      if(new Date(a.date!).getTime() > new Date(b.date!).getTime()) return 1;
      if(new Date(a.date!).getTime() < new Date(b.date!).getTime()) return -1;
      return 0;
    });
  }

  //открывем или закрываем блок для написания обращений
  openEditor() {
    this.editorFlag = !this.editorFlag;
  }
}

