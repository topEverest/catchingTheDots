import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Winner } from '../shared/interfaces';
import {Mode} from './interfaces';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SettingsService {

    static url = 'https://catchdotsifyoucan.firebaseio.com/'

    constructor(private http: HttpClient) {}

    getModes(): Observable<Mode[]> {

        return this.http.get<Mode[]>(`${SettingsService.url}/modes.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                .keys(response)
                .map(key => ({
                    ...response[key]
                }))
            }))
        
    }

    getWinners(): Observable<Winner[]>{
        return this.http.get<Winner[]>(`${SettingsService.url}/winners.json`);
    }

    sendWinners(winners: Winner[]){
        return this.http.put<Winner[]>(`${SettingsService.url}/winners.json`, winners);
    }

}
