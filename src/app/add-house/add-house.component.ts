import { Component, OnInit } from '@angular/core';
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserSystem} from "../modules/user-system";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  constructor(private userSystemService:UserSystemService,
              private router: ActivatedRoute,
              private route:Router,
              private houseService:HouseService,
              private managementCompanies:ManagementCompaniesService) { }
  house:House=new House();

  errorStreet:string="";
  errorNumberOfHouse:string="";
  errorTown:string="";
  errorNumberOfEntrance:string="";
  errorNumberOfFloor:string="";
  errorYearOfConstruction:string="";
  errorNumberOfFlats:string="";
  errorRegion:string="";
  idHouse:number=-1;

  flag:boolean=true;

  idMC:number=-1;
  managementCompany:ManagementCompany=new ManagementCompany();
  ngOnInit(): void {
    this.idMC=Number(this.router.snapshot.params['idMC']);
    this.idHouse=Number(this.router.snapshot.params['idHouse']);

    this.managementCompanies.getCertainMC(this.idMC).subscribe(value => {
      this.managementCompany=value;
    })

    if(this.idHouse!=0){
      this.houseService.getHouse(this.idHouse).subscribe(value => {
        this.house=value;
      })
    }
  }

  addHouse() {
    this.clearError();

    if(this.house.region.length==0){
      this.errorRegion="Введите регион";
      this.flag=false;
    }
    if(this.house.town.length==0){
      this.errorTown="Введите город";
      this.flag=false;
    }
    if(this.house.street.length==0){
      this.errorStreet="Введите улицу";
      this.flag=false;
    }
    if(this.house.numberOfHouse.length==0){
      this.errorNumberOfHouse="Введите дом";
      this.flag=false;
    }
    if(this.house.numberOfEntrance.length==0){
      this.errorNumberOfEntrance="Введите количестсво подъездов";
      this.flag=false;
    }
    if(this.house.yearOfConstruction.length==0){
      this.errorYearOfConstruction="Введите дату основания";
      this.flag=false;
    }
    if(this.house.numberOfFlats.length==0){
      this.errorNumberOfFlats="Введите количество квартир";
      this.flag=false;
    }
    if(this.house.numberOfFloor.length==0){
      this.errorNumberOfFloor="Введите количество этажей";
      this.flag=false;
    }
    if(this.flag){
      //добавляем
      if(this.idHouse==0){
        this.houseService.addHouse(this.house,this.idMC).subscribe(value => {
          this.route.navigate(['privateOffice','managementCompaniesForHead','housesRequests',this.managementCompany.id]);
        })
      }else if(this.idHouse!=0){
        this.houseService.reductionHouse(this.house).subscribe(value => {
          this.route.navigate(['privateOffice','managementCompaniesForHead','housesRequests',this.managementCompany.id]);
        })
      }
    }
  }

  clearError(){
    this.flag=true;
    this.errorNumberOfFloor="";
    this.errorNumberOfEntrance="";
    this.errorYearOfConstruction="";
    this.errorTown="";
    this.errorStreet="";
    this.errorNumberOfHouse="";
    this.errorRegion="";
  }
}
