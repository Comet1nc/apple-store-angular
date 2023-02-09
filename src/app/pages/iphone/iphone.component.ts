import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnStartTrigger } from '../../shared/animations';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
  animations: [fadeInOnStartTrigger],
})
export class IphoneComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ConfigurateProduct(name: string) {
    this.router.navigate(['product-configurator/' + name]);
  }
}
