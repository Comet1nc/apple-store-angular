import { trigger, style, transition, animate, query, group, stagger, state, AnimationEvent} from '@angular/animations';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState  } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { headerPosition, HeaderService } from 'src/app/services/header.service';

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
                  transform: 'translateX(50px)',
                  background: 'transparent'
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
    ]),
    trigger('mobileBag', [
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate(300, style({
          opacity: '1'
        }))
      ]),
      transition(":leave", [
        style({
          opacity: '1'
        }),
        animate(300, style({
          opacity: '0',
        }))
      ])
    ]),
    trigger('mobileNav', [
      state('closed', style({
        opacity: '1',
      })),
      state('opened', style({
        opacity: '1'
      })),
      state('editMode', style({
        opacity: '1'
      })),
      transition('closed => opened', [
        query('.navbar', [
          style({
            height: '0'
          })
        ], { optional: true}),
        query('.mobile-search', [
          style({
            height: '0',
            paddingBottom: '0'
          }),
          animate(150, style({
            height: '*',
            paddingBottom: '*'
          }))
        ]),
        query('.navbar', [
          style({
            height: '0'
          }),
          animate('400ms ease-in-out', style({
            height: '*'
          }))
        ], { optional: true}),
      ]),
      transition('opened => closed', [
          query('.navbar', [
            style({
              height: '100vh'
            }),
            animate(400, style({
              height: '0vh'
            }))
          ], { optional: true}),
          query('.mobile-search', [
            style({
              height: '*',
              paddingBottom: '*'
            }),
            animate(150, style({
              height: '0',
              paddingBottom: '0'
            }))
          ])
      ])
    ]),
    trigger('edit-mode-animations', [
      state('activated', style({
        transform: 'translateY(-39px)'
      })),
      state('unactive', style({
        transform: '*'
      })),
      transition('unactive => activated', animate(350)),
      transition('activated => unactive', animate(350))
    ]),
    trigger('search-results', [
      transition(':enter', [
        style({
          transform: 'translateY(0)',
          opacity: '0'
        }),
        animate(350, style({
          transform: '*',
          opacity: '1'
        }))
      ]),
      transition(':leave', [
        animate(350, style({
          transform: 'translateY(0)',
          opacity: '0'
        }))
      ])
    ]),
    trigger('cancel-btn', [
      transition(':enter', [
        style({
          opacity: 0,
          width: '0px',
          paddingRight: '0'
        }),
        animate(200, style({
          opacity: '1',
          width: '*',
          paddingRight: '12px'
        }))
      ]),
      transition(':leave', [
        animate(200, style({
          opacity: '0',
          width: '0px',
          paddingRight: '0'
        }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  sidenavIsOpen: boolean = false
  mobileSideNavAnimationState: MobileSideNavAnimationStates = MobileSideNavAnimationStates.closed

  mobileSearchViewIsVisible: boolean = false
  mobileEditModeActivated: boolean = false
  
  desktopSearchViewIsVisible: boolean = false
  searchViewDesktopAnimationState: SearchViewAnimationStates = SearchViewAnimationStates.invisible
  
  bagViewIsVisible: boolean = false;

  navBarIsVisible: boolean = true
  navBarDesktopAnimationState: NavBarAnimationStates = NavBarAnimationStates.visible

  headerElement: HTMLDivElement

  @ViewChild('header') headerRef: ElementRef<HTMLDivElement>
  headerAbsolutePosition: boolean = false

  mobileHeaderRef!: HTMLElement;

  editModeAnimationsState: EditModeAnimationsStates = EditModeAnimationsStates.unactive

  bagBtn = true

  @Output('onPageChanged') onPageChanged = new Subject<void>()
  @Output('onChangeBodyScroll') onChangeBodyScroll = new Subject<boolean>()
  
  
  constructor(private breakpointObserver: BreakpointObserver, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.onChangeHeaderPosition.subscribe((headerPos: headerPosition) => {
      if(headerPos === headerPosition.fixed) {
        this.headerAbsolutePosition = false
      } else {
        this.headerAbsolutePosition = true
      }
    })

    this.breakpointObserver.observe([
      "(max-width: 833px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        // Executes when sreen is small

        this.ChangeBagViewVisibility(false)
        this.CloseSearchView() 
        this.navBarIsVisible = false
        this.ToggleMobileBag(true)
        
      } else {
        // Executes when sreen is huge
        // run queue is important

        this.ChangeBagViewVisibility(false)
        this.CloseEditMode() 

        if(this.sidenavIsOpen) { // if sidenav is opened, close it
          this.headerElement.classList.remove('black-bg')
          this.sidenavIsOpen = false
          this.mobileSearchViewIsVisible = false
        }

        this.navBarIsVisible = true
        this.ToggleMobileBag(false)
        
      }
    });
  }

  onLinkClick() {
    if(this.sidenavIsOpen) {
      this.ChangeStateSideNav(this.headerElement)
    }
    this.onPageChanged.next()
    window.scroll(0, 0)
  }

  ToggleMobileBag(value?: boolean) {
    if(value !== undefined) {
      this.bagBtn = value
    } else {
      setTimeout(() => {
        this.bagBtn = !this.bagBtn
      }, 10);
      
    }
  }

  EnterEditMode() {
    setTimeout(() => {
      this.mobileEditModeActivated = true
    }, 10);
    this.editModeAnimationsState = EditModeAnimationsStates.activated
  }

  CloseEditMode() {
    setTimeout(() => {
      this.mobileEditModeActivated = false
    }, 10);
    this.editModeAnimationsState = EditModeAnimationsStates.unactive
  }

  ChangeStateSideNav(header: HTMLDivElement) {

    // saving it for future changes
    this.headerElement = header 

    if(this.sidenavIsOpen) {

      // Prevent Scrolling
      this.onChangeBodyScroll.next(true)
      
      // closing animation
      this.mobileSideNavAnimationState = MobileSideNavAnimationStates.closed

      setTimeout(() => { // Timeout is necessary
        this.ToggleMobileBag()
      }, 10);
      
      setTimeout(() => { // waiting for animation end
        this.sidenavIsOpen = false
        this.navBarIsVisible = false
        this.mobileSearchViewIsVisible = false
        header.classList.remove('black-bg')
        window.scrollTo(0, 0);
      }, 405);
      
    } else { // opening sidenav

      // Allow Scrolling
      this.onChangeBodyScroll.next(false)

      setTimeout(() => { // Timeout is necessary
        this.ToggleMobileBag()
      }, 10);

      this.sidenavIsOpen = true
      this.navBarIsVisible = true
      this.mobileSearchViewIsVisible = true
      header.classList.add('black-bg')
      window.scrollTo(0, 0);
      
      //animation
      this.mobileSideNavAnimationState = MobileSideNavAnimationStates.opened
    }
    
  }

  ChangeBagViewVisibility(state?: boolean): void {
    if(state !== undefined) {
      this.bagViewIsVisible = state
    } else {
      this.bagViewIsVisible = !this.bagViewIsVisible;
    }
    
    
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
    window.scroll(0,0)
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
enum MobileSideNavAnimationStates {
  opened = 'opened',
  closed = 'closed',
  editMode = 'editMode'
}
enum EditModeAnimationsStates {
  activated = 'activated',
  unactive = 'unactive'
}