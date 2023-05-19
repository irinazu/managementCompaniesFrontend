import { Component, OnInit } from '@angular/core';
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {UserSystem} from "../modules/user-system";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent implements OnInit {


  constructor(private userSystemService:UserSystemService,
              private router: ActivatedRoute,
              private route:Router,
              private managementCompaniesService:ManagementCompaniesService) { }
  user:UserSystem=new UserSystem();

  errorEmail:string="";
  errorMC:string="";
  errorAccountNumber:string="";
  errorPassword:string="";
  errorExist:string="";
  errorPhone:string="";
  errorPasswordDuplicate:string="";

  markedRadio:any;

  regexpEmail:any = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  flag:boolean=true;

  managementCompanies:ManagementCompany[]=[];
  passwordDuplicate:string="";

  ngOnInit(): void {
    this.managementCompaniesService.getAllMC().subscribe(value => {
      this.managementCompanies=value;
    })
  }

  takeCheckedMC(){
    this.markedRadio = document.querySelectorAll('input[type="radio"]:checked');
  }

  addWorker() {
    this.clearError();
    this.takeCheckedMC();

    if(this.user.email.length==0){
      this.errorEmail="Введите Email";
      this.flag=false;
    }
    if(!this.regexpEmail.test(this.user.email)){
      this.errorEmail="Неверный формат введенной почты"
      this.flag=false;
    }
    if(this.user.accountNumber.length==0){
      this.errorAccountNumber="Введите лицевой счет";
      this.flag=false;
    }
    if(this.user.password.length==0){
      this.errorPassword="Введите Пароль";
      this.flag=false;
    }
    if(this.markedRadio.length==0){
      this.errorMC="Управляющая компания не выбрана";
      this.flag=false;
    }
    if(this.user.password!=this.passwordDuplicate){
      this.errorPasswordDuplicate="Пароли не совпадают";
      this.flag=false;
    }
    if(this.flag){
      //флаг на принятие новостей
      let flag=(<HTMLInputElement>document.getElementById("newsTaker"))!.checked;
      this.user.flagOnTakeNews=flag;

      this.userSystemService.finaleRegistrationUser(this.markedRadio[0].value,this.user).subscribe(value => {
        if(value==0){
          this.route.navigate([''])
        }else if(value==1){
          this.errorExist="Учетная запись с таким логином уже существует"
        }else if(value==2){
          this.errorExist="Личного счета не существует в системе, обратитесь к своей Управляющей компании для добавления ее в систему"
        }else if(value==3){
          this.errorExist="Учетная запись с таким личным счетом уже существует"
        }
      })
    }
  }

  clearError(){
    this.flag=true;
    this.errorAccountNumber="";
    this.errorMC="";
    this.errorEmail="";
    this.errorPassword="";
    this.errorPasswordDuplicate="";
    this.errorPhone="";
    this.errorExist="";

  }


}
