import {Component, OnInit} from '@angular/core';

import {
  AngularYandexMapsModule,
  YaApiLoaderService,
  YaConfig,
  YaEvent,
  YaGeocoderService, YaMapComponent,
  YaReadyEvent
} from 'angular8-yandex-maps';
import geocode = ymaps.geocode;
import GeoObject = ymaps.GeoObject;
import GeoObjectCollection = ymaps.GeoObjectCollection;
import IGeoObject = ymaps.IGeoObject;
import GeoObjects = ymaps.map.GeoObjects
import {map, toArray} from "rxjs";
import require = ymaps.modules.require;
import {MapService} from "../services/map.service";
import {House} from "../modules/house";
import {RepairWork} from "../modules/repair-work";
import {Entrance} from "../modules/entrance";
import {ImageModel} from "../modules/image-model";
import {DomSanitizer} from "@angular/platform-browser";
import {HouseForSend} from "../modelsForSend/house-for-send";
import {EntranceForSend} from "../modelsForSend/entrance-for-send";
import {RepairWorkForSend} from "../modelsForSend/repair-work-for-send";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles:['']
})


export class MapComponent implements OnInit{

  a: number[] = [57.5258, 38.3211];
  mainCoord: number[] = [];
  o: any;

  numberOfHouse:string="5";
  thoroughfare:string="Рунина";
  localities:string="Углич";
  area:string="Сверловская область";
  img:string[]=[];

  //переменные, описывающие дом
  clickHouse:House=new House();
  repairWorkRoof:RepairWork[]=[];
  repairWorkBasement:RepairWork[]=[];
  entrances:Entrance[]=[];

  //массивы с изображениями
  imageOfHouse:ImageModel[]=[];
  imageOfEntrance:ImageModel[]=[];
  imageOfRoofRepairWork:ImageModel[]=[];
  imageOfBasementRepairWork:ImageModel[]=[];
  im:ImageModel[]=[];
  imageForShow:ImageModel[]=[];

  //HOUSE
  houseForSend:HouseForSend=new HouseForSend();
  entrancesForSend:EntranceForSend[]=[];
  repairWorkOfBasement:RepairWorkForSend[]=[];
  repairWorkOfRoof:RepairWorkForSend[]=[];
  imgOfHouseItself:ImageModel[]=[];

  constructor(private mapService:MapService, private sanitazer:DomSanitizer) {}

  ngOnInit(): void {
    this.getImgForHouse();
  }

  disableDescription():void{
    // @ts-ignore
    document.getElementById("descriptionOfHouse").setAttribute("style","display:none");
  }
  disableCompanies():void{
    // @ts-ignore
    document.getElementById("companies").setAttribute("style","display:none");
  }
  disableComments():void{
    // @ts-ignore
    document.getElementById("comments").setAttribute("style","display:none");
  }
  onDescriptionClick():void{
    // @ts-ignore
    document.getElementById("descriptionOfHouse").setAttribute("style","display:block");
    this.disableCompanies();
    this.disableComments();
  }
  onCompaniesClick():void{
    // @ts-ignore
    document.getElementById("companies").setAttribute("style","display:block");
    this.disableDescription();
    this.disableComments();
  }
  onCommentsClick():void{
    // @ts-ignore
    document.getElementById("comments").setAttribute("style","display:block");
    this.disableDescription();
    this.disableCompanies();
  }

  onMapClick(e: YaEvent<ymaps.Map>): void {

    const {target, event} = e;
    // @ts-ignore
    document.getElementById("megaBlock").setAttribute("style","display:block");

    if (!target.balloon.isOpen()) {
      const coords = event.get('coords');
      this.mainCoord = coords;
      //ymaps.geocode(this.a, {kind: 'house', results: 1}).then(r => {

        // @ts-ignore
        /*this.o = <GeoObject>r.geoObjects.get(0);
        console.log(this.o.getAddressLine());
        console.log(this.o.getAdministrativeAreas());*/
        this.localities="Углич";//this.o.getLocalities();
        this.thoroughfare="Ростовская улица";//this.o.getThoroughfare();
        this.numberOfHouse="5/7";//this.o.getPremiseNumber();

        this.mapService.getInformationAboutHouse("Сверловская область","Углич","Рунина",5).
          subscribe(returnHouse=>{
            this.clickHouse=returnHouse;
            this.repairWorkRoof=this.clickHouse.repairWorks.filter(value => value.kindOfWork=="Крыша");
            this.repairWorkBasement=this.clickHouse.repairWorks.filter(value => value.kindOfWork=="Подвал");
            this.repairWorkBasement=this.clickHouse.repairWorks.filter(value => value.kindOfWork=="Подвал");
            this.entrances=this.clickHouse.entrances.sort(value =>value.numberOfEntrance);

        })

        var placemark = new ymaps.Placemark([this.mainCoord[0], this.mainCoord[1]], {
          balloonContentHeader:
            '<p>'+this.localities+', '+this.thoroughfare+', '+this.numberOfHouse+'</p><br>',
          balloonContentBody:
            '<div>' +
            '</div>'+
            '<p class="b">Обслуживающие компании</p>'+
            '<p>""</p>'
          ,
          // Зададим содержимое нижней части балуна.
          balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
          // Зададим содержимое всплывающей подсказки.
          hintContent: 'Рога и копыта'
        });
        // Добавим метку на карту.
        target.geoObjects.add(placemark);
        // Откроем балун на метке.
        placemark.balloon.open();

        // @ts-ignore
        // console.log((<GeoObject>r).properties.get('metaDataProperty').getObject());
      //});
    }
  }

  //работа с изображениями
  createFImg(imany:ImageModel[]):ImageModel[]{
    const images:any[]=imany;
    const imagesHandle:ImageModel[]=[];
    for(let i=0;i<images.length;i++){
      const imageFileData=images[i];
      const blob=this.dataURItoBlob(imageFileData.picBytes);
      const imgFile=new File([blob],"i",{type:"image/png"});
      const finaleFileHandle:ImageModel={
        file:imgFile,
        url:this.sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile))
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
  getImgForHouse(){
    /*this.mapService.getImage(this.area+"/"+this.localities+"/"+this.thoroughfare+
      "/"+this.numberOfHouse+"/theHouseItself")
      .subscribe(value => {
        this.im = value;
        this.createImg(this.im)
    });*/

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

  showAllPhoto() {

  }

  addNewPhotoFroHouse() {

  }

  clickArrowBasement(){
    // @ts-ignore
    var element=document.getElementById("bodyOfBlockBasement");//.setAttribute("style","display:block");
    var img=document.getElementById("arrowInBasement");//.setAttribute("style","display:block");

    // @ts-ignore
    if (element.style.display === "block") {
      // @ts-ignore
      element.style.display = "none";
      // @ts-ignore
      img.src="assets/images/arrowDown.png";
    } else {
      // @ts-ignore
      element.style.display = "block";
      // @ts-ignore
      img.src="assets/images/arrowUp.png";

    }
  }

  clickArrowRoof(){
    // @ts-ignore
    var element=document.getElementById("bodyOfBlockRoof");//.setAttribute("style","display:block");
    var img=document.getElementById("arrowInRoof");//.setAttribute("style","display:block");

    // @ts-ignore
    if (element.style.display === "block") {
      // @ts-ignore
      element.style.display = "none";
      // @ts-ignore
      img.src="assets/images/arrowDown.png";
    } else {
      // @ts-ignore
      element.style.display = "block";
      // @ts-ignore
      img.src="assets/images/arrowUp.png";

    }
  }

  clickArrowEntrances() {
    // @ts-ignore
    var element=document.getElementById("bodyOfBlockEntrances");//.setAttribute("style","display:block");
    var img=document.getElementById("arrowInEntrance");//.setAttribute("style","display:block");

    // @ts-ignore
    if (element.style.display === "block") {
      // @ts-ignore
      element.style.display = "none";
      // @ts-ignore
      img.src="assets/images/arrowDown.png";
    } else {
      // @ts-ignore
      element.style.display = "block";
      // @ts-ignore
      img.src="assets/images/arrowUp.png";

    }
  }
}



