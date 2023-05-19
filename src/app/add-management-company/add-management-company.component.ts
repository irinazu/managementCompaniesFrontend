import { Component, OnInit } from '@angular/core';
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {UserSystem} from "../modules/user-system";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-add-management-company',
  templateUrl: './add-management-company.component.html',
  styleUrls: ['./add-management-company.component.css']
})
export class AddManagementCompanyComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              private route:Router,
              private managementCompaniesService:ManagementCompaniesService) { }

  managementCompany:ManagementCompany=new ManagementCompany();

  errorTitle:string="";
  errorBIC:string="";
  errorKPP:string="";
  errorEmail:string="";
  errorPhone:string="";
  errorTown:string="";
  errorStreet:string="";
  errorHouse:string="";
  errorCheckingAccount:string="";
  errorCorrespondentAccount:string="";
  errorTitleBank:string="";
  errorINN:string="";

  regexpEmail:any = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  regexpPhone:any=  /[0-9]{6}$/;
  flag:boolean=true;

  ngOnInit(): void {
  }

  addMC() {
    this.clearError();

    if(this.managementCompany.title.length==0){
      this.errorTitle="Введите название Управляющей компании";
      this.flag=false;
    }
    if(this.managementCompany.bicBank.length==0){
      this.errorBIC="Введите БИК";
      this.flag=false;
    }
    if(this.managementCompany.bicBank.length!=0&&this.managementCompany.bicBank.length!=9){
      this.errorBIC="БИК введен неправильно, должен содержать 9 цифр";
      this.flag=false;
    }
    if(this.managementCompany.kpp.length==0){
      this.errorKPP="Введите КПП";
      this.flag=false;
    }
    if(this.managementCompany.kpp.length!=0&&this.managementCompany.kpp.length!=9){
      this.errorKPP="КПП введен неправильно, должен содержать 9 цифр";
      this.flag=false;
    }
    if(this.managementCompany.email.length==0){
      this.errorEmail="Введите Email";
      this.flag=false;
    }
    if(!this.regexpEmail.test(this.managementCompany.email)){
      this.errorEmail="Неверный формат введенной почты"
      this.flag=false;
    }
    if(this.managementCompany.phone.length==0){
      this.errorPhone="Введите телефон";
      this.flag=false;
    }
    if (!this.regexpPhone.test(this.managementCompany.phone)){
      this.errorPhone="Неверный формат для телефона"
      this.flag=false;
    }
    if(this.managementCompany.town.length==0){
      this.errorTown="Введите город";
      this.flag=false;
    }
    if(this.managementCompany.street.length==0){
      this.errorStreet="Введите улицу";
      this.flag=false;
    }
    if(this.managementCompany.house.length==0){
      this.errorHouse="Введите дом";
      this.flag=false;
    }
    if(this.managementCompany.inn.length==0){
      this.errorINN="Введите ИНН";
      this.flag=false;
    }
    if(this.managementCompany.inn.length!=0&&this.managementCompany.inn.length!=10){
      this.errorINN="ИНН введен неправильно, должен содержать 10 цифр";
      this.flag=false;
    }
    if(this.managementCompany.checkingAccount.length==0){
      this.errorCheckingAccount="Введите расчетный счет";
      this.flag=false;
    }
    if(this.managementCompany.checkingAccount.length!=0&&this.managementCompany.checkingAccount.length!=20){
      this.errorCheckingAccount="Рассчетный счет введен неправильно, должен содержать 20 цифр";
      this.flag=false;
    }
    if(this.managementCompany.correspondentAccount.length==0){
      this.errorCorrespondentAccount="Введите корреспондентский счет";
      this.flag=false;
    }
    if(this.managementCompany.correspondentAccount.length!=0&&this.managementCompany.correspondentAccount.length!=20){
      this.errorCorrespondentAccount="Кореспондентский счет введен неправильно, должен содержать 20 цифр";
      this.flag=false;
    }
    if(this.flag){
      this.managementCompaniesService.addMC(Number(localStorage.getItem("id")),this.managementCompany).subscribe(value => {
        this.route.navigate(['privateOffice','managementCompaniesForHead'])
      })
    }
  }

  clearError(){
    this.flag=true;
    this.errorCorrespondentAccount="";
    this.errorKPP="";
    this.errorBIC="";
    this.errorCheckingAccount="";
    this.errorTitle="";
    this.errorEmail="";
    this.errorPhone="";
    this.errorTown="";
    this.errorStreet="";
    this.errorHouse="";
    this.errorINN="";
  }


}
