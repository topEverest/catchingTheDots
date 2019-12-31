import { Component, OnInit } from '@angular/core';
import { Winner } from '../shared/interfaces';
import { SettingsService } from '../shared/settings.service';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'app-info-list-window',
  templateUrl: './info-list-window.component.html',
  styleUrls: ['./info-list-window.component.css']
})
export class InfoListWindowComponent implements OnInit {

  winners: Winner[] = [];

  constructor(
    private settingsService: SettingsService,
    private shareService: ShareService) { }

  ngOnInit() {
    this.settingsService.getWinners().subscribe( response => {
      this.winners = response;
    })

    this.shareService.onSend.subscribe( newWinner => {
      this.winners.unshift(newWinner);
      this.settingsService.sendWinners(this.winners)
        .subscribe( res => console.log(res))
    })
  }
}
