import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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

  blackScreen = true

  ngOnInit(): void {
    setTimeout(() => {
      this.blackScreen =false
    }, 10);
  }

  onPageChanged() {
    this.blackScreen = true
    setTimeout(() => {
      this.blackScreen = false
    }, 10);
  }
  
  
}
