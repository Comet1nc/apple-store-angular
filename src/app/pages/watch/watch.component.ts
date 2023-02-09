import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnStartTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  animations: [fadeInOnStartTrigger],
})
export class WatchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ConfigurateProduct(name: string) {
    this.router.navigate(['product-configurator/' + name]);
  }
}
