import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from 'src/app/shared/configurator-product.model';
import * as fromApp from '../../store/app.reducer'
import * as ConfActions from '../product-configurator/store/configurator.actions'

@Component({
  selector: 'app-product-configurator',
  templateUrl: './product-configurator.component.html',
  styleUrls: ['./product-configurator.component.scss']
})
export class ProductConfiguratorComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router,) { }
 
  productName: string
  product: Product
  subsription: Subscription
  loadingData: boolean

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productName = params['name']
      if(this.CheckName(this.productName)) {
        // dispatch
        console.log(this.productName)
        this.store.dispatch(new ConfActions.FetchProduct(this.productName))
      }
    })


    this.SubscribeToStore()

    window.scroll(0,0)
    
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe()
  }

  CheckName(name: string) {
    switch (name) {
      case 'iphone-14':
        return true
      case 'iphone-14-pro': 
        return true
      default:
        console.log('Wrong route')
        this.router.navigate([''])
        return false
    }
  }

  SubscribeToStore() {
    this.loadingData = true

    this.subsription = this.store.select('configurator').pipe(map(confState => {
      return confState.product
    }))
    .subscribe({
      next: (product: Product) => {
        this.product = product
        this.loadingData = false
      },
      error: (e) => {
        console.log('store resub')
        setTimeout(() => {
          this.subsription.unsubscribe()
          this.SubscribeToStore()
        }, 100);
      },
    }) 
  }
}
