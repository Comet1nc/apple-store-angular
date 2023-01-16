import { trigger, state, style, transition, animate, query, group, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('navbar', [
      state('closedSearch', style({
        opacity: '0',
        transform: 'scale(1)'
      })),
      transition(':enter', [
        group([
          query('li', [
            style({
              opacity: '0'
            }),
            stagger(50, [
              animate(300, style({
                opacity: '1'
              }))
            ])
          ]),
          query('li', [
            style({
              transform: 'scale(0.5)'
            }),
            stagger(50, [
              animate(600, style({
                transform: 'scale(1)'
              }))
            ])
          ])
        ])
        
      ]),
      transition(':leave', [
        group([
          query('li', stagger(-50, [
            animate(300, style({
              opacity: '0'
            }))
          ])),
          query('li', stagger(-50, [
            animate(600, style({
              transform: 'scale(0.5)'
            }))
          ]))
        ])
        
      ])
      
    ])
  ]
})
export class HeaderComponent implements OnInit {
  animActive: boolean = false
  navBarIsVisible: boolean = true
  constructor() { }
  
  ngOnInit(): void {
  }

}
