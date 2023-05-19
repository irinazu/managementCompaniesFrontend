import {Component, OnInit} from '@angular/core';
import {Voting} from "../modules/voting";
import {VotingOption} from "../modules/voting-option";
import {House} from "../modules/house";
import {HouseService} from "../services/house.service";
import {VoteService} from "../services/vote.service";
import {VotingTheme} from "../modules/voting-theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-voting',
  templateUrl: './create-voting.component.html',
  styleUrls: ['./create-voting.component.css']
})
export class CreateVotingComponent implements OnInit {

  constructor(private houseService:HouseService,private votingService:VoteService,private router:Router) { }

  errorTitle:string="";
  errorDescription:string="";
  errorEndOfVoting:string="";
  errorWhom:string="";
  errorOption:string="";
  errorDateClose:string="";

  houses:House[]=[];
  addedOptions:VotingOption[]=[];
  votingThemes:VotingTheme[]=[];
  voting:Voting=new Voting();
  flag:boolean=true;

  ngOnInit(): void {
    //находим дома для отметок
    this.houseService.getHousesForMC(Number(localStorage.getItem("id"))).subscribe(value => {
      this.houses=value;
    })

    //находим все темы для голосования
    this.votingService.getAllThemeVoting().subscribe(value => {
      this.votingThemes=value;
    })
  }

  //добавляем выбранную опцию
  addVotingOption() {
    let newOption=new VotingOption();
    if((<HTMLInputElement>document.getElementById("option")).value.length!=0){
      newOption.option=(<HTMLInputElement>document.getElementById("option")).value;
      this.addedOptions.push(newOption);
      (<HTMLInputElement>document.getElementById("option")).value="";
    }
  }

  //даляем выбранную опцию
  deleteOption(index:number) {
    this.addedOptions.splice(index,1);
  }

  //проверяем и создаем голосование
  createVoting() {
    this.errorTitle="";
    this.errorDescription="";
    this.errorEndOfVoting="";
    this.errorWhom="";
    this.errorOption="";
    this.errorEndOfVoting="";
    this.flag=true;

    //название
    if(this.voting.title.length==0){
      this.errorTitle="Название не должно быть пустым";
      this.flag=false;
    }

    //описание
    if(this.voting.description.length==0){
      this.errorDescription="Описание не должно быть пустым";
      this.flag=false;
    }

    //варианты ответа
    if(this.addedOptions.length<2){
      this.errorTitle="Запишите варианты голосования";
      this.flag=false;
    }else {
      this.voting.votingOptionSet=this.addedOptions;
    }

    //выбранные дома
    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    if(markedCheckbox.length==0){
      this.errorWhom="Выберите кому назначено голосование";
      this.flag=false;
    }else {
      this.voting.houses=[];
      for (let checkbox of markedCheckbox) {
        // @ts-ignore
        this.voting.houses.push(this.houses.find(x=>x.id.toString()===checkbox.value)!);
      }
    }

    //дата закрытия
    if(this.voting.endOfVoting.length==0){
      this.errorDateClose="Введите дату закрытия";
    }


    if(this.flag){
      //прописываем тему
      let themeID = (<HTMLInputElement>document.getElementById("selectTheme")).value;
      this.voting.votingThemeDTO=this.votingThemes.find(x=>x.id.toString()===themeID)!;
      this.votingService.createVoting(this.voting,Number(localStorage.getItem("id"))).subscribe(value => {
        this.router.navigate(['privateOffice','menuVoting','vote','true']);
      });

    }
  }
}
