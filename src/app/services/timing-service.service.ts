import { Injectable } from '@angular/core';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class TimingService {

  constructor() { }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve,milliseconds))
  }

}
