import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {RequestTheme} from "../modules/request-theme";
import {Request} from "../modules/request";
import {ManagementCompany} from "../modules/management-company";
import {request} from "express";
import {number} from "@amcharts/amcharts4/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  constructor(private requestService:RequestService,private router:Router) { }

  themes:RequestTheme[]=[];
  flag:boolean=true;

  errorEmptyField:string="";
  errorComment:string="";
  errorFiles:string="";

  formData: FormData = new FormData();
  selectedFiles?: File[];
  newRequest:Request=new Request();

  ngOnInit(): void {
    //находим все темы заявления
    this.requestService.getAllThemeForRequest().subscribe(value => {
      this.themes=value;
    })
  }

  createNewRequest() {
    this.errorComment="";
    this.errorEmptyField="";
    this.flag=true;

    console.log(this.newRequest)
    if(this.newRequest.title.length==0){
      this.errorEmptyField="Поле должно быть заполнено"
      this.flag=false;
    }

    if(this.newRequest.commentary.length==0){
      this.errorComment="Заявка должна быть заполнена";
      this.flag=false;
    }

    if(this.flag){
      let idTheme=(<HTMLInputElement>document.getElementById("selectTheme")).value;
      this.newRequest.requestThemeDTO=this.themes.find(x=>x.id.toString()===idTheme)!;

      this.requestService.createNewRequest(this.newRequest,Number(localStorage.getItem("id"))).subscribe(idRequest => {
        if(this.formData.has("fileForRequest")){
          this.requestService.createRequestImg(this.formData,idRequest).subscribe(value => {
            this.router.navigate(['privateOffice','menuRequests','requests','true']);
          });
        }
      })
    }
  }

  //отправляем файлы на сервер
  selectFiles(event: any) {
    this.errorFiles="";
    this.formData.delete("fileForRequest");
    this.selectedFiles=[];

    let countImgSelected=event.target.files.length;
    if(countImgSelected>10){
      this.errorFiles="Не более 10 файлов";
      (<HTMLInputElement>document.querySelector('input[type=file]')).value = '';
    }else {
      this.selectedFiles = event.target.files;
      for (let i = 0; i < countImgSelected; i++) {
        this.formData.append("fileForRequest",this.selectedFiles![i]);
      }
    }
  }
}
