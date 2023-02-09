import { Component, OnInit } from '@angular/core';
import { fadeInOnStartTrigger } from '../../shared/animations';

@Component({
  selector: 'app-mac',
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.scss'],
  animations: [fadeInOnStartTrigger],
})
export class MacComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
