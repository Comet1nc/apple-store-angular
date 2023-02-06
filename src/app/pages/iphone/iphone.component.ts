import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/configurator-product.model';
import { fadeInOnStartTrigger } from '../../shared/animations'
import * as fromApp from '../../store/app.reducer'
import * as ConfActions from '../product-configurator/store/configurator.actions'


@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
  animations: [
    fadeInOnStartTrigger
  ]
})
export class IphoneComponent implements OnInit {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    
  }

  ConfigurateProduct(name: string) {
    
    this.router.navigate(['product-configurator/' + name])
  }

}
