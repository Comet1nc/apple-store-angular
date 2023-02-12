import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/shared/configurator-product.model';
import { ConfiguratedOption } from '../product-configurator/service/product-configurator.service';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  bagItems: BagItem[] = [];
  onItemsArrived = new BehaviorSubject<BagItem[]>([]);

  constructor() {}

  addItemToBag(bagItem: BagItem) {
    this.bagItems.push(bagItem);
    this.onItemsArrived.next(this.bagItems);
  }

  removeItem(index) {
    console.log(index);
    if (index === 0) {
      this.bagItems.shift();
      this.onItemsArrived.next(this.bagItems);
      return;
    }
    this.bagItems.splice(index, index);
    this.onItemsArrived.next(this.bagItems);
  }

  getItems() {
    return this.bagItems;
  }
}

export class BagItem {
  public configuratedOptions: ConfiguratedOption[] = [];
  public product: Product;
  public price: number;

  constructor(
    configuratedOptions: ConfiguratedOption[],
    product: Product,
    price: number
  ) {
    this.configuratedOptions = configuratedOptions;
    this.product = product;
    this.price = price;
  }
}
