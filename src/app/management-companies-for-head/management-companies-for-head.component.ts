import { Component, OnInit } from '@angular/core';
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";

@Component({
  selector: 'app-management-companies-for-head',
  templateUrl: './management-companies-for-head.component.html',
  styleUrls: ['./management-companies-for-head.component.css']
})
export class ManagementCompaniesForHeadComponent implements OnInit {

  constructor(private managementService:ManagementCompaniesService) { }
  managementCompanies:ManagementCompany[]=[];
  role:string="";

  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;

    if(this.role=="ADMIN"){
      this.managementService.getAllMC().subscribe(value => {
        this.managementCompanies=value;
      })
    }else {
      this.managementService.getAllMCForHead(Number(localStorage.getItem("id"))).subscribe(value => {
        this.managementCompanies=value;
      })
    }
  }

}
