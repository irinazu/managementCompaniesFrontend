import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import {ManagementCompany} from "../modules/management-company";
import {ManagementCompaniesService} from "../services/management-companies.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-houses-requests',
  templateUrl: './houses-requests.component.html',
  styleUrls: ['./houses-requests.component.css']
})
export class HousesRequestsComponent implements OnInit {

  houses:House[]=[];
  managementCompany:ManagementCompany=new ManagementCompany();
  idMC:number=-1;

  constructor(private houseService:HouseService,
              private managementCompanyService:ManagementCompaniesService,
              private router:ActivatedRoute,
              private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("role")=="DISPATCHER"||localStorage.getItem("role")=="ACCOUNTANT"){
      //находим все дома
      this.houseService.getHousesForMC(Number(localStorage.getItem("id"))).subscribe(value => {
        this.houses=value;
      })

      //находим УК
      this.managementCompanyService.getCertainMCByWorkerMC(Number(localStorage.getItem("id"))).subscribe(value => {
        this.managementCompany=value;
      })
    }else {
      this.idMC=Number(this.router.snapshot.params["idMC"]);
      this.houseService.getHousesForMCByIdMC(this.idMC).subscribe(value => {
        this.houses=value;
      })
      //находим УК
      this.managementCompanyService.getCertainMC(this.idMC).subscribe(value => {
        this.managementCompany=value;
      })
    }
  }

  openUsersForCertainHouse(id: number) {
    this.route.navigate(['privateOffice','housesRequests',this.managementCompany.id,'usersForHouse',id]);
  }
}
