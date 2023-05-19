import { Component, OnInit } from '@angular/core';
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompaniesService} from "../services/management-companies.service";

@Component({
  selector: 'app-management-companies',
  templateUrl: './management-companies.component.html',
  styleUrls: ['./management-companies.component.css']
})
export class ManagementCompaniesComponent implements OnInit {

  constructor(private managementCompaniesService:ManagementCompaniesService) { }

  managementCompanies:ManagementCompany[]=[];

  ngOnInit(): void {
    this.managementCompaniesService.getAllMC().subscribe(value => {
      this.managementCompanies=value;
    })
  }

}
