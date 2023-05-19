import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HouseService} from "../services/house.service";
import {UserSystem} from "../modules/user-system";
import {House} from "../modules/house";

@Component({
  selector: 'app-users-for-house',
  templateUrl: './users-for-house.component.html',
  styleUrls: ['./users-for-house.component.css']
})
export class UsersForHouseComponent implements OnInit {

  constructor(private router:ActivatedRoute,private houseService:HouseService,private route:Router) { }
  houseId:number=-1;
  userSystems:UserSystem[]=[];
  house:House=new House();

  ngOnInit(): void {
    this.houseId=this.router.snapshot.params['houseId'];

    //дом
    this.houseService.getHouse(this.houseId).subscribe(value => {
      this.house=value;
    })

    //пользователи
    this.houseService.getUsersForHouse(this.houseId).subscribe(value => {
      this.userSystems=value;
    })
  }

  go(id:number) {
    this.route.navigate(['privateOffice','menuRequests','requests',id.toString()]);
  }
}
