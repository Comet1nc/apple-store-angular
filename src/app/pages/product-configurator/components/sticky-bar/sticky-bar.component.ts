import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Product } from 'src/app/shared/configurator-product.model';
import { ProductConfiguratorService } from '../../service/product-configurator.service';

@Component({
  selector: 'configurator-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss'],
  animations: [
    trigger('sticky-bar', [
      transition(':enter', [
        style({
          transform: 'translateY(-200px)',
        }),
        animate(
          '450ms ease-in-out',
          style({
            transform: '*',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '350ms ease-in-out',
          style({
            transform: 'translateY(-200px)',
          })
        ),
      ]),
    ]),
  ],
})
export class StickyBarComponent implements OnInit {
  priceUSD: number;
  priceAnimation: boolean;

  @Input() product: Product;
  @Input() barActive: boolean = false;

  constructor(private configuratorService: ProductConfiguratorService) {}

  ngOnInit(): void {
    this.configuratorService.initPrice.subscribe((priceUSD: number) => {
      this.priceUSD = priceUSD;
    });

    this.configuratorService.onPriceChanged.subscribe((priceUSD: number) => {
      if (this.priceUSD !== priceUSD) {
        this.playPriceAnimation();
      }

      setTimeout(() => {
        // timeout used for nice transition
        this.priceUSD = priceUSD;
      }, 750);
    });
  }

  playPriceAnimation() {
    this.priceAnimation = false;
    setTimeout(() => {
      this.priceAnimation = true;
    }, 10);
  }
}
