import { Component, OnInit } from '@angular/core';
import {UserSystem} from "../modules/user-system";
import {UserSystemService} from "../services/user-system.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";
import {RoleUserSystem} from "../modules/role-user-system";

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  constructor(private userSystemService:UserSystemService,
              private router: ActivatedRoute,
              private route:Router,
              private managementCompanies:ManagementCompaniesService) { }

  worker:UserSystem=new UserSystem();

  errorName:string="";
  errorSurname:string="";
  errorPatrimony:string="";
  errorEmail:string="";
  errorPhone:string="";
  errorTown:string="";
  errorStreet:string="";
  errorHouse:string="";
  errorFlat:string="";
  regexpEmail:any = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  regexpPhone:any=  /[0-9]{10}$/;
  flag:boolean=true;

  idMC:number=-1;
  idWorker:number=-1;

  managementCompany:ManagementCompany=new ManagementCompany();
  posts:RoleUserSystem[]=[];

  ngOnInit(): void {
    this.idMC=Number(this.router.snapshot.params['idMC']);
    this.idWorker=Number(this.router.snapshot.params['idWorker']);

    //получение компании для которого добавляют сотрудника
    this.managementCompanies.getCertainMC(this.idMC).subscribe(value => {
      this.managementCompany=value;
    })
    //получение должностей
    this.userSystemService.getPostsForMC().subscribe(value => {
      this.posts=value;
    })
    if(this.idWorker!=0){
      //получение юзера для обновления
      this.userSystemService.findUser(this.idWorker).subscribe(value => {
        this.worker=value;
        (<HTMLInputElement>document.getElementById("selectPost")).value=this.worker.roleDTO.id.toString();
      })
    }
  }

  addWorker() {
    this.clearError();

    if(this.worker.name.length==0){
      this.errorName="Введите имя";
      this.flag=false;
    }
    if(this.worker.surname.length==0){
      this.errorSurname="Введите фамилию";
      this.flag=false;

    }
    if(this.worker.patronymic.length==0){
      this.errorPatrimony="Введите отчество";
      this.flag=false;

    }
    if(this.worker.email.length==0){
      this.errorEmail="Введите Email";
      this.flag=false;

    }
    if(!this.regexpEmail.test(this.worker.email)){
      this.errorEmail="Неверный формат введенной почты"
      this.flag=false;
    }
    if(this.worker.phone.length==0){
      this.errorPhone="Введите телефон";
      this.flag=false;
    }
    if (!this.regexpPhone.test(this.worker.phone)){
      this.errorPhone="Неверный формат для телефона"
      this.flag=false;
    }
    if(this.worker.town.length==0){
      this.errorTown="Введите город";
      this.flag=false;

    }
    if(this.worker.street.length==0){
      this.errorStreet="Введите улицу";
      this.flag=false;
    }
    if(this.worker.house.length==0){
      this.errorHouse="Введите дом";
      this.flag=false;

    }
    if(this.worker.numberOfFlat.length==0){
      this.errorFlat="Введите квартиру";
      this.flag=false;

    }
    if(this.flag){
      let valuePost = (<HTMLInputElement>document.getElementById("selectPost")).value;

      if(this.idWorker==0){
        this.userSystemService.addWorker(this.idMC,this.worker,Number(valuePost)).subscribe(value => {
          this.route.navigate(['privateOffice','managementCompaniesForHead','workers',this.idMC]);
        })
      }else if (this.idWorker!=0){
        this.userSystemService.updateWorker(this.worker,Number(valuePost)).subscribe(value => {
          this.route.navigate(['privateOffice','managementCompaniesForHead','workers',this.idMC]);
        })
      }

    }
  }

  clearError(){
    this.flag=true;
    this.errorName="";
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
