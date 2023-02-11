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

  ngOnInit(): void {
    this.bagItems = this.bagService.getItems();

    if (this.bagItems.length > 0) this.showItems = true;
  }

  getFullName(bagItem: BagItem) {
    let fullName = '';
    for (const option of bagItem.configuratedOptions) {
      fullName += ' ' + option.selectedOption.title;
    }
    return fullName;
  }
}
