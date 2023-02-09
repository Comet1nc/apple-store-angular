import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnStartTrigger } from '../../shared/animations';

@Component({
  selector: 'app-mac',
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.scss'],
  animations: [fadeInOnStartTrigger],
})
export class MacComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ConfigurateProduct(name: string) {
    this.router.navigate(['product-configurator/' + name]);
  }
}
