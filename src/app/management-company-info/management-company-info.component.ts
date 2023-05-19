import { Component, OnInit } from '@angular/core';
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-management-company-info',
  templateUrl: './management-company-info.component.html',
  styleUrls: ['./management-company-info.component.css']
})
export class ManagementCompanyInfoComponent implements OnInit {

  constructor(private managementCompaniesService:ManagementCompaniesService,
              private router:ActivatedRoute) { }

  managementCompany:ManagementCompany=new ManagementCompany();
  idMC:number=-1;

  ngOnInit(): void {
    this.idMC=this.router.snapshot.params['idMC'];

    this.managementCompaniesService.getCertainMC(this.idMC).subscribe(value => {
      this.managementCompany=value;
    })
  }

}
