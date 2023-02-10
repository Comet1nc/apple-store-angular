import { Component, OnInit } from '@angular/core';
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
    // this.bagService.onItemsArrived.subscribe((bagItems: BagItem[]) => {
    //   this.showItems = true;
    //   this.bagItems = bagItems;
    //   console.log(this.showItems);
    // });

    this.bagItems = this.bagService.getItems();

    if (this.bagItems.length > 0) this.showItems = true;
  }
}
