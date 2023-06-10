import { Component, OnInit } from '@angular/core';
import {Payment} from "../modules/payment";
import {PaymentService} from "../services/payment.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private servicePayment:PaymentService) { }

  payments:Payment[]=[];
  userId:number=0;
  role:string="";
  ngOnInit(): void {
    this.role=localStorage.getItem("role")!;
    if(this.role=="USER"){
      this.userId=Number(localStorage.getItem("id"));
    }else {
      this.userId=Number(localStorage.getItem("idUserForPerson"));
    }
    this.servicePayment.getPaymentForUser(this.userId).subscribe(value => {
      this.payments=value
    })
  }

}
