import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Mode } from '../shared/interfaces';
import { ShareService } from '../shared/share.service';
import * as moment from 'moment'

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  fields = new Array(5);
  delay = 2000;
  squares; modes: Mode[] = [];
  amount = 0; currentRandom = 0; userWins = 0; compWins = 0;
  flag = true; disabled = true; winnerIs = false; intervalIsGoing = false;
  selected = null;
  name = ''; userName = 'Inkognito'; winner = ''; play = 'PLAY';

  constructor(
    private settingsService: SettingsService,
    private shareService: ShareService) { }

  ngOnInit() {
    this.settingsService.getModes().subscribe( res => {
      this.modes = res;
    });
  }

  setMode(){

    this.resetTable();

    this.fields = new Array(+this.selected.field);
    this.delay = this.selected.delay;
    this.disabled = false;
    this.winnerIs = false;
  }

  start(){
    this.play = 'PLAY AGAIN';

    this.winnerIs = false;
    this.disabled = true;
    this.intervalIsGoing = true;

    this.resetTable();

    let length = this.squares.length;
    this.amount = this.squares.length - 1;

    this.currentRandom = parseInt((Math.random() * (this.amount - 0) + 0).toFixed());

    let now = moment();

    const interval = setInterval( () => {

      if(this.userWins >= (length / 2)){ 
        clearInterval(interval);
        this.winner = this.userName;
        length = 0;
        this.resetVars();
        this.shareService.winnerInfo(
          {
            name: this.winner, 
            date: now.format('DD.MM.YYYY').toString()
          })
      }else if(this.compWins >= (length / 2)){
        clearInterval(interval);
        length = 0;
        this.resetVars();
        this.winner = 'Computer'
        this.shareService.winnerInfo(
          {
            name: this.winner, 
            date: now.format('DD.MM.YYYY').toString()
          })
      }

      if((this.squares[this.currentRandom]) && 
      (this.squares[this.currentRandom].classList.contains('getIt')) == false ){

        this.squares[this.currentRandom].classList.add('getIt')
        this.flag = false;
        
      }

      if( (this.squares[this.currentRandom]) && 
          (this.squares[this.currentRandom].classList.contains('getIt')) == true && 
          this.flag == true ){

        this.squares[this.currentRandom].classList.remove('getIt');
        this.squares[this.currentRandom].classList.add('compGets');
        this.squares.splice(this.currentRandom,1);
        this.amount = this.squares.length - 1;

        this.currentRandom = parseInt((Math.random() * (this.amount - 0) + 0).toFixed());

        this.compWins++;
        
      }
      
      this.flag = true;

    }, this.selected.delay)

  } 

  setGreen(event){
    if(event.target.classList.contains('getIt') && this.winnerIs == false){

      event.target.classList.remove('getIt');
      event.target.classList.add('youGet');
      this.squares.splice(this.currentRandom,1)
      this.amount = this.squares.length - 1;
      this.currentRandom = parseInt((Math.random() * (this.amount - 0) + 0).toFixed());

      this.userWins++;
    }
  }

  resetVars(){
    this.userWins = 0;
    this.compWins = 0;
    this.disabled = false;
    this.winnerIs = true;
    this.intervalIsGoing = false;
  }

  resetTable(){
    this.squares = document.querySelectorAll("td");
    this.squares = Array.prototype.slice.call(this.squares);

    for(let i = 0; i < this.squares.length; i ++){
      this.squares[i].classList.remove('compGets');
      this.squares[i].classList.remove('getIt');
      this.squares[i].classList.remove('youGet');
    }
  }

}
