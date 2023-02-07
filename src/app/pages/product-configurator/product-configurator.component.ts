import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { headerPosition, HeaderService } from 'src/app/services/header.service';
import { Product } from 'src/app/shared/configurator-product.model';
import * as fromApp from '../../store/app.reducer'
import * as ConfActions from '../product-configurator/store/configurator.actions'
import { ProductConfiguratorService } from './service/product-configurator.service';


@Component({
  selector: 'app-product-configurator',
  templateUrl: './product-configurator.component.html',
  styleUrls: ['./product-configurator.component.scss'],
  
})
export class ProductConfiguratorComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('TriggerForStickyBar') leftColumn: ElementRef<HTMLDivElement>
 
  productName: string
  subsription: Subscription

  product: Product

  barActive: boolean = false

  nzOffsetTop = 20
  nzOffsetBottom = false
  
  onBarCollide = new IntersectionObserver( 
    ([e]) => {
      if(e.isIntersecting === false) {
        this.barActive = true
      } else if ( e.isIntersecting === true){
        this.barActive = false
      }
    },
    {threshold: [1], rootMargin: '-110px 100px 500px 100px'}
  );

  constructor(
    private store: Store<fromApp.AppState>, 
    private route: ActivatedRoute, 
    private router: Router,
    private headerService: HeaderService,
    private configuratorService: ProductConfiguratorService
  ) { }

  ngOnInit(): void {
    
    this.headerService.onChangeHeaderPosition.next(headerPosition.absolute)
    
    this.subsription = this.store.select('configurator').pipe(map(confState => {
      if(confState === undefined) {
        console.log('Store is empty')
        return undefined
      }
      return confState.product
    })).subscribe((product) => {

      if(product === undefined) return 

      this.product = product

      let smallestPrice: number

      for (const confOption of product?.configurationOptions) {
        if(confOption.type === 'model') {
          for (const option of confOption?.options) {
            if(smallestPrice === undefined) {
              smallestPrice = +option.priceUSD
            } else if(option.priceUSD < smallestPrice) {
              smallestPrice = option.priceUSD
            }
          }
        }
      }

      if(smallestPrice !== undefined) {
        this.configuratorService.setDefaultPrice(smallestPrice)
        // 
      }
    })

    this.route.params.subscribe(params => {
      this.productName = params['name']
      const route = this.GetRouteDestination(this.productName)
      if(route !== '') {
        this.store.dispatch(new ConfActions.FetchProduct({productName: this.productName, route: route}))
      }
    })

    window.scroll(0,0)
  }
  
  ngAfterViewInit(): void {
    this.onBarCollide.observe(this.leftColumn.nativeElement)
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe()

    this.headerService.onChangeHeaderPosition.next(headerPosition.fixed)
  }

  GetRouteDestination(name: string) {
    switch (name) {
      case 'iphone-14':
        return 'iphones'
      case 'iphone-14-pro': 
        return 'iphones'
      default:
        console.log('Wrong route')
        this.router.navigate(['not-found'])
        return ''
    }
  }
}
