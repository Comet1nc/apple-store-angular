import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { headerPosition, HeaderService } from 'src/app/services/header.service';
import { Product } from 'src/app/shared/configurator-product.model';
import * as fromApp from '../../store/app.reducer'
import * as ConfActions from '../product-configurator/store/configurator.actions'

@Component({
  selector: 'app-product-configurator',
  templateUrl: './product-configurator.component.html',
  styleUrls: ['./product-configurator.component.scss']
})
export class ProductConfiguratorComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router,
    private headerService: HeaderService  
  ) { }
 
  productName: string
  product: Product
  subsription: Subscription
  loadingData: boolean

  ngOnInit(): void {

    
    this.headerService.onChangeHeaderPosition.next(headerPosition.absolute)

    this.loadingData = true
    
    this.subsription = this.store.select('configurator').pipe(map(confState => {
      if(confState === undefined) {
        console.log('Store is empty')
        return undefined
      }
      return confState.product
    })).subscribe((product) => {

      if(product === undefined) return 

      this.product = product
      this.loadingData = false
    })

    
    this.route.params.subscribe(params => {
      this.productName = params['name']
      if(this.CheckName(this.productName)) {
        // dispatch
        this.store.dispatch(new ConfActions.FetchProduct(this.productName))
      }
    })

    window.scroll(0,0)
    
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe()

    this.headerService.onChangeHeaderPosition.next(headerPosition.fixed)
  }

  CheckName(name: string) {
    switch (name) {
      case 'iphone-14':
        return true
      case 'iphone-14-pro': 
        return true
      default:
        console.log('Wrong route')
        this.router.navigate(['xyz'])
        return false
    }
  }
}
