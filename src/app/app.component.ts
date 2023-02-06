import { Component, OnInit, Renderer2 } from '@angular/core';
import { fadeOutOnStartTrigger } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeOutOnStartTrigger
  ]
})
export class AppComponent implements OnInit {
  
  constructor(private renderer: Renderer2) { }

  blackScreen = true

  ngOnInit(): void {
    setTimeout(() => {
      this.blackScreen =false
    }, 10);
  }

  ChangeBodyScroll(scroll: boolean) {
    if(!scroll) {
      this.renderer.addClass(document.body, 'prevent-scroll-y');
    } else {
      this.renderer.removeClass(document.body, 'prevent-scroll-y');
    }
  }

  onPageChanged() {
    this.blackScreen = true
    setTimeout(() => {
      this.blackScreen = false
    }, 10);
  }
  
  
}
