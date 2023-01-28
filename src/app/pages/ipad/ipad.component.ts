import { Component, OnInit } from '@angular/core';
import { fadeInOnStartTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-ipad',
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.scss'],
  animations: [
    fadeInOnStartTrigger
  ]
})
export class IpadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
