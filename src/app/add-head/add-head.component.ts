import { Component, OnInit } from '@angular/core';
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {UserSystem} from "../modules/user-system";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-add-head',
  templateUrl: './add-head.component.html',
  styleUrls: ['./add-head.component.css']
})
export class AddHeadComponent implements OnInit {

  constructor(private userSystemService:UserSystemService,
              private router: ActivatedRoute,
              private route:Router) { }
  head:UserSystem=new UserSystem();

  errorName:string="";
  errorSurname:string="";
  errorPatrimony:string="";
  errorEmail:string="";
  errorPhone:string="";
  errorTown:string="";
  errorStreet:string="";
  errorHouse:string="";
  errorFlat:string="";
  errorPassword:string="";
  errorPasswordDuplicate:string="";

  regexpEmail:any = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  regexpPhone:any=  /[0-9]{10}$/;
  flag:boolean=true;

  passwordDuplicate:string="";

  ngOnInit(): void {
  }

  addHead() {
    this.clearError();

    if(this.head.name.length==0){
      this.errorName="Введите имя";
      this.flag=false;
    }
    if(this.head.surname.length==0){
      this.errorSurname="Введите фамилию";
      this.flag=false;

    }
    if(this.head.patronymic.length==0){
      this.errorPatrimony="Введите отчество";
      this.flag=false;

    }
    if(this.head.email.length==0){
      this.errorEmail="Введите Email";
      this.flag=false;

    }
    if(!this.regexpEmail.test(this.head.email)){
      this.errorEmail="Неверный формат введенной почты"
      this.flag=false;
    }
    if(this.head.phone.length==0){
      this.errorPhone="Введите телефон";
      this.flag=false;
    }
    if (!this.regexpPhone.test(this.head.phone)){
      this.errorPhone="Неверный формат для телефона"
      this.flag=false;
    }
    if(this.head.town.length==0){
      this.errorTown="Введите город";
      this.flag=false;

    }
    if(this.head.street.length==0){
      this.errorStreet="Введите улицу";
      this.flag=false;
    }
    if(this.head.house.length==0){
      this.errorHouse="Введите дом";
      this.flag=false;

    }
    if(this.head.numberOfFlat.length==0){
      this.errorFlat="Введите квартиру";
      this.flag=false;
    }
    if(this.head.password.length==0){
      this.errorPassword="Введите пароль";
      this.flag=false;
    }
    if(this.head.password.length==0){
      this.errorPassword="Введите пароль";
      this.flag=false;
    }
    if(this.head.password!=this.passwordDuplicate){
      this.errorPasswordDuplicate="Пароли не совпадают";
      this.flag=false;
    }
    if(this.flag){
      this.userSystemService.addHead(this.head).subscribe(value => {
        this.route.navigate([''])
      })
    }
  }

  clearError(){
    this.flag=true;
    this.errorName="";
    this.errorPassword="";
    this.errorPasswordDuplicate="";
    this.errorSurname="";
    this.errorPatrimony="";
    this.errorEmail="";
    this.errorPhone="";
    this.errorTown="";
    this.errorStreet="";
    this.errorHouse="";
    this.errorFlat="";
  }

}
