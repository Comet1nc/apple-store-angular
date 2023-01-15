import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState  } from '@angular/cdk/layout';
import { trigger, style, transition, animate, group } from "@angular/animations";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('column', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
          height: '10px',
        }),
        animate('100ms', style({
          height: '*'
        })),
        animate(200, style({
          opacity: 1,
          transform: 'translateY(0px)',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        group([
          animate(100, style({
            opacity: 0,
            transform: 'translateY(-20px)'
          })),
          animate('300ms', style({
            height: '0px'
          }))
        ])
      ]),
    ])
  ]
})
export class FooterComponent implements OnInit, AfterViewInit {

  @ViewChild('columnsWrapper') wrapper!: ElementRef;
  linksContainers!: HTMLCollectionOf<Element>;
  
  animState: string = 'opened'
  isVisibleLinks1: boolean = true
  isVisibleLinks2: boolean = true
  isVisibleLinks3: boolean = true
  showlinks: boolean = true
  inMobileMode: boolean = false

  LinksVisibility = {
    Links1: true,
    Links2: true,
    Links3: true
  }
  
  constructor(
    private renderer: Renderer2, private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      "(max-width: 833px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.inMobileMode = true
        this.isVisibleLinks1 = false
        this.isVisibleLinks2 = false
        this.isVisibleLinks3 = false
      } else {
        this.inMobileMode = false
        this.isVisibleLinks1 = true
        this.isVisibleLinks2 = true
        this.isVisibleLinks3 = true
      }
    });
  }

  ngAfterViewInit(): void {

    // get all columns
    this.linksContainers = this.wrapper.nativeElement.getElementsByClassName('column') 
    
    // detect screen size changes
    this.breakpointObserver.observe([
      "(max-width: 833px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        let arr
        for(let i = 0; i < this.linksContainers.length; i++) {
          arr = this.linksContainers[i].getElementsByTagName('a')
          
          if(arr == undefined) return

          for(let item of arr) {
            this.renderer.setStyle(item, 'display', 'none')
          }
        }

      } else {
        let arr
        for(let i = 0; i < this.linksContainers.length; i++) {
          arr = this.linksContainers[i].getElementsByTagName('a')
          
          if(arr == undefined) return

          for(let item of arr) {
            this.renderer.setStyle(item, 'display', 'flex')
          }
        }
      }
    });
  }

  ChangeColumnState(state: string) {

    if(state == 'closed') {
      state = 'opened'
    } else {
      state = 'closed'
    }

    return state
  }

  ChangeVisibility(type: string) {

    if(!this.inMobileMode) return

    switch(type) { 
      case 'links1': { 
          this.isVisibleLinks1 = !this.isVisibleLinks1
          break; 
      } 
      case 'links2': { 
        this.isVisibleLinks2 = !this.isVisibleLinks2
          break; 
      } 
      case 'links3': { 
        this.isVisibleLinks3 = !this.isVisibleLinks3
        break; 
      }
      default: { 
          //statements; 
          break; 
      } 
    } 
  }
}
