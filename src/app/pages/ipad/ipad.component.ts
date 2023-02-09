import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnStartTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-ipad',
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.scss'],
  animations: [fadeInOnStartTrigger],
})
export class IpadComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ConfigurateProduct(name: string) {
    this.router.navigate(['product-configurator/' + name]);
  }
}
