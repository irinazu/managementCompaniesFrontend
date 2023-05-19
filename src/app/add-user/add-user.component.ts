import { Component, OnInit } from '@angular/core';
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserSystem} from "../modules/user-system";
import {HouseService} from "../services/house.service";
import {House} from "../modules/house";
import {Entrance} from "../modules/entrance";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userSystemService:UserSystemService,
              private router: ActivatedRoute,
              private route:Router,
              private houseService:HouseService) { }
  user:UserSystem=new UserSystem();

  errorName:string="";
  errorSurname:string="";
  errorPatrimony:string="";
  errorHouse:string="";
  errorEntrance="";
  errorFlat:string="";
  errorAccountNumber:string="";
  errorExist:string="";

  flag:boolean=true;

  housesMC:House[]=[];
  entrances:Entrance[]=[];
  houseChoiceMember:number=0;
  entranceChoiceMember:number=0;

  ngOnInit(): void {
    this.houseService.getHousesForMC(Number(localStorage.getItem("id"))).subscribe(value => {
      this.housesMC=value;
    })
  }

  /*takeCheckedHouseAndEntrance(){
    this.markedRadio = document.querySelectorAll('input[type="radio"]:checked');
    this.markedRadioEntrance = document.querySelectorAll('input[type="radio"]:checked');
  }*/

  addHead() {
    this.clearError();

    if(this.user.name.length==0){
      this.errorName="Введите имя";
      this.flag=false;
    }
    if(this.user.surname.length==0){
      this.errorSurname="Введите фамилию";
      this.flag=false;
    }
    if(this.user.patronymic.length==0){
      this.errorPatrimony="Введите отчество";
      this.flag=false;
    }
    if(this.user.numberOfFlat.length==0){
      this.errorFlat="Введите квартиру";
      this.flag=false;
    }
    if(this.user.accountNumber.length==0){
      this.errorAccountNumber="Введите лицевой счет";
      this.flag=false;
    }
    if(this.houseChoiceMember==0){
      this.errorHouse="Дом не выбран";
      this.flag=false;
    }
    if(this.entranceChoiceMember==0){
      this.errorEntrance="Подъезд не выбран";
      this.flag=false;
    }
    if(this.flag){
      this.userSystemService.addUser(this.houseChoiceMember,this.entranceChoiceMember,this.user).subscribe(value => {
        if(value){
          this.user=new UserSystem();
          (<HTMLInputElement>document.getElementById("houses_"+this.houseChoiceMember))!.checked=false;
          (<HTMLInputElement>document.getElementById("entrances_"+this.entrances))!.checked=false;

        }else {
          this.errorExist="Житель с подобным лицевым счетом уже привязан к данной Управляющей компании"
        }
      })
    }
  }

  clearError(){
    this.flag=true;
    this.errorName="";
    this.errorSurname="";
    this.errorPatrimony="";
    this.errorHouse="";
    this.errorEntrance="";
    this.errorFlat="";
    this.errorExist="";
  }


  //подъезды
  houseChoice(id: number) {
    this.houseChoiceMember=id;
    this.houseService.getEntranceForHouse(id).subscribe(value => {
      this.entrances=value;
    })
  }

  entranceChoice(id: number) {
    this.entranceChoiceMember=id;
  }
}
