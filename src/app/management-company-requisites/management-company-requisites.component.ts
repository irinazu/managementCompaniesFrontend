import { Component, OnInit } from '@angular/core';
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ActivatedRoute} from "@angular/router";
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompanyStatus} from "../modules/management-company-status";

@Component({
  selector: 'app-management-company-requisites',
  templateUrl: './management-company-requisites.component.html',
  styleUrls: ['./management-company-requisites.component.css']
})
export class ManagementCompanyRequisitesComponent implements OnInit {

  constructor(private managementCompaniesService:ManagementCompaniesService,
              private router:ActivatedRoute) { }

  managementCompany:ManagementCompany=new ManagementCompany();
  statuses:ManagementCompanyStatus[]=[];
  idMC:number=-1;
  flagOpenReductionStatus:boolean=false;

  ngModel:any;

  ngOnInit(): void {
    this.idMC=this.router.snapshot.params['idMC'];

    //берем определенную УК
    this.managementCompaniesService.getCertainMC(this.idMC).subscribe(value => {
      this.managementCompany=value;
    })

    //все статусы
    this.managementCompaniesService.getAllStatusMC().subscribe(value => {
      this.statuses=value;
    })
  }

  //открываем окно редактирование
  openReductionStatus() {
    this.flagOpenReductionStatus=!this.flagOpenReductionStatus;
  }

  updateStatus() {
    let valueStatus = (<HTMLInputElement>document.getElementById("selectStatus")).value;
    if(this.ngModel==undefined){
      this.ngModel="no";
    }
    this.managementCompaniesService.updateStatusFroCertainMC(this.idMC,Number(valueStatus),this.ngModel).subscribe(value => {
      this.managementCompany=value;
      this.ngModel="";
      this.flagOpenReductionStatus=false;
    });
  }
}
