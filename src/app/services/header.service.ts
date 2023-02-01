import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  onChangeHeaderPosition = new Subject<headerPosition>()

  constructor() { }

  
}

export enum headerPosition {
  fixed = 'fixed',
  absolute = 'absolute'
}
