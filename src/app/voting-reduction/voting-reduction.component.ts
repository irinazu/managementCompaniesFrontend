import { Component, OnInit } from '@angular/core';
import {HouseService} from "../services/house.service";
import {VoteService} from "../services/vote.service";
import {House} from "../modules/house";
import {VotingOption} from "../modules/voting-option";
import {VotingTheme} from "../modules/voting-theme";
import {Voting} from "../modules/voting";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-voting-reduction',
  templateUrl: './voting-reduction.component.html',
  styleUrls: ['./voting-reduction.component.css']
})
export class VotingReductionComponent implements OnInit {

  constructor(private houseService:HouseService,
              private votingService:VoteService,
              private router:ActivatedRoute,
              private route:Router) { }

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
  voteId:string="";

  deletingOptions:VotingOption[]=[];
  housesCameFromVoting:House[]=[];
  addedHouses:House[]=[];

  housesMustDeleting:House[]=[];
  housesMustAdding:House[]=[];
  idMC: number=0;

  ngOnInit(): void {
    this.idMC=Number(localStorage.getItem('idMCFromLSForVote'))!;

    this.voteId=this.router.snapshot.params['voteId'];

    //находим дома для отметок
    this.houseService.getHousesForMC(Number(localStorage.getItem("id")),this.idMC).subscribe(value => {
      this.houses=value;
      //находим все темы для голосования
      this.votingService.getAllThemeVoting().subscribe(value => {
        this.votingThemes=value;

        //находим само голосование
        this.votingService.getCertainVoting(Number(this.voteId)).subscribe(value => {
          this.voting=value;
          this.housesCameFromVoting=[...this.voting.houses]
          this.addedOptions=this.voting.votingOptionSet;
          this.setChosenCheckBox();
          this.setTheme();
        })
      })

    })

  }

  //добавляем выбранную опцию
  addVotingOption(){
    let newOption=new VotingOption();
    if((<HTMLInputElement>document.getElementById("option")).value.length!=0){
      newOption.option=(<HTMLInputElement>document.getElementById("option")).value;
      this.addedOptions.push(newOption);
      (<HTMLInputElement>document.getElementById("option")).value="";
    }
  }

  //удаляем выбранную опцию
  deleteOption(index:number) {
    let deletingOption=this.addedOptions.splice(index,1)[0];
    if(deletingOption.id>0){
      this.deletingOptions.push(deletingOption);
    }
  }

  //проверяем и обновляем голосование
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
      this.addedHouses=[];
      this.housesMustDeleting=[];
      this.housesMustAdding=[];

      for (let checkbox of markedCheckbox) {
        // @ts-ignore
        this.addedHouses.push(this.houses.find(x=>x.id.toString()===checkbox.value)!);
      }

      for(let h of this.housesCameFromVoting){
        if(!this.addedHouses.find(x=>x.id==h.id)){
          this.housesMustDeleting.push(h);
        }
      }
      for(let h of this.addedHouses){
        if(!this.housesCameFromVoting.find(x=>x.id===h.id)){
          this.housesMustAdding.push(h);
        }
      }
      this.voting.housesMustDeleting=this.housesMustDeleting;
      this.voting.housesMustAdding=this.housesMustAdding;

    }

    //дата закрытия
    if((<HTMLInputElement>document.getElementById("closeDateId")).value.length!=0){
      this.voting.endOfVoting=(<HTMLInputElement>document.getElementById("closeDateId")).value;
    }


    if(this.flag){
      //прописываем тему
      let themeID = (<HTMLInputElement>document.getElementById("selectTheme")).value;
      this.voting.votingThemeDTO=this.votingThemes.find(x=>x.id.toString()===themeID)!;
      this.voting.deleteOptionsMustDeletingFromServer=this.deletingOptions;

      this.votingService.updateVoting(this.voting).subscribe(value => {
        this.route.navigate(['privateOffice','menuVoting','vote','true']);

      });
    }
  }

  //устанавляивает пришедшие дома в положение checked
  private setChosenCheckBox() {
    for (let house of this.voting.houses) {
      (<HTMLInputElement>document.getElementById(house.id.toString())).checked = true;
    }
  }

  //устанавляивает пришедшую тему в положение select
  private setTheme() {
    (<HTMLInputElement>document.getElementById('selectTheme')).value=this.voting.votingThemeDTO.id.toString();
  }

}



