import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimingService {

  constructor() { }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

}
