import {Time} from "@angular/common";

export class Request {
    id:number=0;
    date: Date | undefined;
    time:Time | undefined;
    title:string="";
    typeOfRequest:string="";
    town:string="";
    street:string="";
    house:string="";
    flat:number=0;
    files:string="";
    commentary:string="";
    publicRequest:string="";
}
