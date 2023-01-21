import { trigger, style, transition, animate, query, group, stagger, state, AnimationEvent} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState  } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('searchviewDesktop', [
      state('visible', style({
        opacity: '1'
      })),
      state('invisible', style({
        opacity: '0'
      })),
      transition('invisible => visible', [
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
              query('h3', [
                style({
                  opacity: '0',
                  transform: 'translateX(50px)'
                }),
                animate(250, style({
                  opacity: '1',
                  transform: '*'
                }))
              ]),
              query('li', [
                style({
                  opacity: '0',
                  transform: 'translateX(50px)'
                }),
                stagger('50ms ease-out', [
                  animate(250, style({
                    opacity: '1',
                    transform: '*'
                  }))
                ])
              ])
            ])
          ])
        ]),
      ]),
      transition('visible => invisible', [
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
    trigger('navbarDesktop', [
      state('visible', style({
        opacity: '1'
      })),
      state('invisible', style({
        opacity: '0'
      })),
      transition('invisible => visible', [
        style({
          opacity: '1'
        }),
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
      transition('visible => invisible', [
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
  sidenavIsOpen: boolean = false
  mobileSearchViewIsVisible: boolean = false
  
  desktopSearchViewIsVisible: boolean = false
  searchViewDesktopAnimationState: SearchViewAnimationStates = SearchViewAnimationStates.invisible
  
  bagViewIsVisible: boolean = false;

  navBarIsVisible: boolean = true
  navBarDesktopAnimationState: NavBarAnimationStates = NavBarAnimationStates.visible
  
  constructor(private breakpointObserver: BreakpointObserver) { }
  
  ngOnInit(): void {
    this.breakpointObserver.observe([
      "(max-width: 833px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        // Executes when sreen is small

        this.CloseSearchView() 
        this.navBarIsVisible = false
        
      } else {
        // Executes when sreen is huge
        
        this.navBarIsVisible = true
      }
    });
  }

  ChangeStateSideNav() {
    // console.log('click')
    if(this.sidenavIsOpen) {
      this.sidenavIsOpen = false
      this.navBarIsVisible = false
      this.mobileSearchViewIsVisible = false
    } else {
      this.sidenavIsOpen = true
      this.navBarIsVisible = true
      this.mobileSearchViewIsVisible = true
    }
    
  }

  ChangeBagViewVisibility(): void {
    this.bagViewIsVisible = !this.bagViewIsVisible;
  }

  onNavBarDesktopAnimationDone(event: AnimationEvent) {
    // after "visible => invisible" transition, hide nav bar
    if(event.fromState === 'visible' && event.toState === 'invisible') {
      this.navBarIsVisible = false
    }
  }

  onSearchViewDesktopAnimationDone(event: AnimationEvent) {
    // after "visible => invisible" transition, hide search view
    if(event.fromState === 'visible' && event.toState === 'invisible') {
      this.desktopSearchViewIsVisible = false
    }
  }

  ShowSearchView() {
    // Hide navbar
    this.ToggleDesktopNavbarAnimationState(NavBarAnimationStates.invisible)
    // Show search view
    this.ToggleDesktopSearchViewAnimationState(SearchViewAnimationStates.visible)
  }

  CloseSearchView() {
    // prevents some bug
    if(this.desktopSearchViewIsVisible && !this.navBarIsVisible) {
      // Hide search view
      this.ToggleDesktopSearchViewAnimationState(SearchViewAnimationStates.invisible)
      // Show navbar
      setTimeout(() => { // this delay is for beautiful sequence, not necessary
        this.ToggleDesktopNavbarAnimationState(NavBarAnimationStates.visible)
      }, 150);
    }
  }

  ToggleDesktopSearchViewAnimationState(state: SearchViewAnimationStates) {
    // if trying animate from invisible to visible, show element
    if(
      state === SearchViewAnimationStates.visible 
      && this.searchViewDesktopAnimationState === SearchViewAnimationStates.invisible
    ) {
      this.desktopSearchViewIsVisible = true
    }
    //changing animation state
    setTimeout(() => { // delay is necessary. 
      this.searchViewDesktopAnimationState = state
    }, 10);
  }

  ToggleDesktopNavbarAnimationState(state: NavBarAnimationStates) {
    // if trying animate from invisible to visible, show element
    if(state === NavBarAnimationStates.visible && this.navBarDesktopAnimationState === NavBarAnimationStates.invisible) {
      this.navBarIsVisible = true
    }
    setTimeout(() => { // delay is necessary. 
      this.navBarDesktopAnimationState = state
    }, 10);
  }

}

enum NavBarAnimationStates {
  visible = 'visible',
  invisible = 'invisible'
}

enum SearchViewAnimationStates {
  visible = 'visible',
  invisible = 'invisible'
}
