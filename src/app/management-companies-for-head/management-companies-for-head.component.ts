import { Component, OnInit } from '@angular/core';
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ManagementCompany} from "../modules/management-company";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-management-companies-for-head',
  templateUrl: './management-companies-for-head.component.html',
  styleUrls: ['./management-companies-for-head.component.css']
})
export class ManagementCompaniesForHeadComponent implements OnInit {

  constructor(private managementService:ManagementCompaniesService,private router:Router) { }
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

  goToRequests(id: number) {
    localStorage.setItem('modeRequests','forMC');
    localStorage.setItem('modeRequestsIdUser','0');
    localStorage.setItem('idMCFromLS',id.toString());

    this.router.navigate(['privateOffice','housesRequests',id,'menuRequests','requests',true]);

  }


  goToNews(id: number) {
    localStorage.setItem('idMCFromLSForNews',id.toString());
    this.router.navigate(['privateOffice','managementCompaniesForHead','menuNews','allNews','allMC',id]);

  }

  goToVote(id: number) {
    localStorage.setItem('idMCFromLSForVote',id.toString());
    this.router.navigate(['privateOffice','managementCompaniesForHead','menuVoting','vote','true']);

  }
}
