import { Component, OnInit } from '@angular/core';
import { fadeInOnStartTrigger, fadeOutOnStartTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  animations: [
    fadeInOnStartTrigger
  ]
})
export class WatchComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
    
  }

}
