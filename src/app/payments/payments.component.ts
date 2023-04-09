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
  ngOnInit(): void {
    this.servicePayment.getPaymentForUser().subscribe(value => {
      console.log(value)
      this.payments=value
    })
  }

}
