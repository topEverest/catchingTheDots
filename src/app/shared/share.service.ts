import { Injectable, Output, EventEmitter } from '@angular/core';
import { Winner } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  @Output() onSend: EventEmitter<Winner> = new EventEmitter();

  constructor() { }

  public winnerInfo(winner: Winner){
    this.onSend.emit(winner)
  }
}
