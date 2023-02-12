import { Component, OnInit } from '@angular/core';
import { ConfOptionType } from 'src/app/shared/configurator-product.model';
import { BagItem, BagService } from './bag.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss'],
})
export class BagComponent implements OnInit {
  constructor(private bagService: BagService) {}

  bagItems: BagItem[] = [];
  showItems = false;
  totalPrice: number;

  // amount: number[] = [];

  ngOnInit(): void {
    this.bagItems = this.bagService.getItems();

    this.recalculateTotalPrice();

    if (this.bagItems.length > 0) this.showItems = true;

    // for (let index = 1; index < 11; index++) {
    //   this.amount.push(index);
    // }
  }

  removeItem(index) {
    this.bagService.removeItem(index);
    this.recalculateTotalPrice();
    if (this.totalPrice === 0) this.showItems = false;
  }

  recalculateTotalPrice() {
    this.totalPrice = 0;
    for (const item of this.bagItems) {
      this.totalPrice += item.price;
    }
  }

  getFullName(bagItem: BagItem) {
    let fullName = '';
    for (const option of bagItem.configuratedOptions) {
      fullName += ' ' + option.selectedOption.title;
    }
    return fullName;
  }
}
