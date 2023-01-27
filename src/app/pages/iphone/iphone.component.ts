import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
  animations: [
    trigger('fade-in-on-start', [
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('1000ms ease-in', style({
          opacity: '1'
        }))
      ])
    ]),
  ]
})
export class IphoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
