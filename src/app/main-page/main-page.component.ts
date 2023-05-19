import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import * as http from "http";
import {MapService} from "../services/map.service";
import {provideImgixLoader} from "@angular/common";
import {ImageModel} from "../modules/image-model";
import {DomSanitizer} from "@angular/platform-browser";
import {HouseForSend} from "../modelsForSend/house-for-send";
import {EntranceForSend} from "../modelsForSend/entrance-for-send";
import {RepairWork} from "../modules/repair-work";
import {RepairWorkForSend} from "../modelsForSend/repair-work-for-send";
import {Request} from "../modules/request";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  formData: FormData = new FormData();

  selectedFiles?: FileList;
  progressInfos: any[] = [];

  previews: string[] = [];
  gettingImg: Blob[] = [];

  imageInfos?: Observable<any>;


  changeImage: boolean = false;
  uploading: boolean = false;
  imageToShow: any = null;
  showSpinner: boolean = true;
  im:ImageModel[]=[];
  imageForShow:ImageModel[]=[];

  //HOUSE
  houseForSend:HouseForSend=new HouseForSend();
  entrancesForSend:EntranceForSend[]=[];
  repairWorkOfBasement:RepairWorkForSend[]=[];
  repairWorkOfRoof:RepairWorkForSend[]=[];
  imgOfHouseItself:ImageModel[]=[];

  permissionRole:string="GUEST";

  constructor(private mapService:MapService,private sanitazer:DomSanitizer,
              private ngxPermissionsService:NgxPermissionsService) {}

  createFImg(imany:ImageModel[]):ImageModel[]{
    const images:any[]=imany;
    const imagesHandle:ImageModel[]=[];
    for(let i=0;i<images.length;i++){
      const imageFileData=images[i];
      const blob=this.dataURItoBlob(imageFileData.picBytes);
      const imgFile=new File([blob],"i",{type:"image/png"});
      const finaleFileHandle:ImageModel={
        file:imgFile,
        url:this.sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile)),
        id:undefined,
        picBytes:undefined
      };
      imagesHandle.push(finaleFileHandle);
    }
    //this.imageForShow=imagesHandle;
    return imagesHandle;
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
  ebuchi(){
    this.mapService.getWholeHouse("Сверловская область/Углич/Рунина/5").subscribe(value => {
      //this.im = value;
      this.houseForSend=value;
      console.log(this.houseForSend);
      this.repairWorkOfBasement=this.houseForSend.basementForSend.repairWorkForSend;
      this.entrancesForSend=this.houseForSend.entranceForSend;
      //create all img
      this.imgOfHouseItself=this.createFImg(this.houseForSend.theHouseItself);
      this.houseForSend.roofForSend.repairWorkForSend.forEach(repairOfWork=>{
        repairOfWork.photoBefore=this.createFImg(repairOfWork.photoBefore);
        repairOfWork.photoAfter=this.createFImg(repairOfWork.photoAfter);
      })
      this.houseForSend.basementForSend.repairWorkForSend.forEach(repairOfWork=>{
        repairOfWork.photoBefore=this.createFImg(repairOfWork.photoBefore);
        repairOfWork.photoAfter=this.createFImg(repairOfWork.photoAfter);
      })
      this.houseForSend.entranceForSend.forEach(entrance=>{
        entrance.repairWorkForSend.forEach(repairOfWork=>{
          repairOfWork.photoBefore=this.createFImg(repairOfWork.photoBefore);
          repairOfWork.photoAfter=this.createFImg(repairOfWork.photoAfter);
        })
        entrance.photoOfEntrance=this.createFImg(entrance.photoOfEntrance);
      })
    });

  }
  ngOnInit(): void {
    this.permissionRole=localStorage.getItem('role')!;
    this.ngxPermissionsService.loadPermissions([this.permissionRole]);

    /*let r=new Request();
    r.title="suspect"
    this.rs.role.push(r);
    this.rs.getRole().subscribe(value => {
      this.rs.role.push(value);
      console.log(this.rs.role)
    });*/

    this.ebuchi();
    //this.imageInfos = this.getFiles();
    //this.mapService.getImgFromServer("entrance/Сверловская область-Углич-Рунина-5").subscribe(value => {
      /*value.forEach(value1 => {
        const reader=new FileReader();
        reader.onload = (e: any) => {

          this.gettingImg.push(e.target.result);
        };
        reader.readAsDataURL(value1)
      })*/
     /* value.forEach(value1 => {
        this.gettingImg.push(value1);
      })
    })*/

   /* this.mapService.getImage("entrance/Сверловская область-Углич-Рунина-5")
      .subscribe(image => {
        //this.createImage(image)
        image.forEach(value => {
          this.createImage(value);
        })
      });*/
  }
  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.onload=(e:any) => {
        this.imageToShow = reader.result;
        console.log(e.target.result)
        this.showSpinner = false;
      };

      reader.readAsDataURL(image);
    } else {
      this.showSpinner = false;
    }
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.formData.append("imgFile",this.selectedFiles[i]);
      }
      this.mapService.loadImgOnServer(this.formData).subscribe(x=>console.log(x));
    }
  }

  /*upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.upload_2(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }
  }*/

  upload_2(file: File):void {
    this.formData.append('imgFiles', file);
  }

  /*getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }*/
}
