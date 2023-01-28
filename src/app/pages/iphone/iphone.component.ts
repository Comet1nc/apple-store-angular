import { Component, OnInit } from '@angular/core';
import { fadeInOnStartTrigger } from '../../shared/animations'

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
  animations: [
    fadeInOnStartTrigger
  ]
})
export class IphoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
