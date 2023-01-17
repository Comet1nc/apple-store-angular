import { trigger, style, transition, animate, query, group, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('searchview', [
      transition(':enter', [
        style({
          opacity: '1',
          background: 'transparent'
        }),
        group([
          animate(700, style({
            background: '*'
          })),
          query('.search-bar', [
            style({
              opacity: '0'
            }),
            animate(400, style({
                opacity: '0',
                transform: 'translateX(20px)'
              })
            ),
            animate('300ms ease-out', style({
              opacity: '1',
              transform: '*'
            }))
          ]),
          query('.search-results', [
            style({
              opacity: '0'
            }),
            animate(100, style({
              opacity: '0'
            })),
            group([
              animate(150, style({
                opacity: '1'
              })),
              query('li', [
                style({
                  opacity: '0',
                  transform: 'translateX(20px)'
                }),
                stagger('50ms ease-out', [
                  animate(150, style({
                    opacity: '1',
                    transform: '*'
                  }))
                ])
              ])
            ])
          ])
        ]),
      ]),
      transition(':leave', [
        group([
          style({
            opacity: '1'
          }),
          animate(150, style({
            opacity: '0'
          }))
        ]),
      ])
    ]),
    trigger('navbar', [
      transition(':enter', [
        group([
          query('li', [
            style({
              opacity: '0'
            }),
            stagger(50, [
              animate(200, style({
                opacity: '1'
              }))
            ])
          ]),
          query('li', [
            style({
              transform: 'scale(0.5)'
            }),
            stagger(50, [
              animate(400, style({
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
  
  navBarIsVisible: boolean = true
  searchViewIsVisible: boolean = false
  
  constructor() { }
  
  ngOnInit(): void {
  }

  ToggleNavbarVisibility() {
    this.navBarIsVisible = !this.navBarIsVisible
  }

  ShowSearchView() {
    this.ToggleNavbarVisibility()
    this.searchViewIsVisible = true
  }

  CloseSearchView() {
    this.searchViewIsVisible = false
    setTimeout(() => {
      this.ToggleNavbarVisibility()
    }, 150);
  }

}
