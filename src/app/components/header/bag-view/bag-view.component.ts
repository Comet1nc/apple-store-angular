import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BagItem, BagService } from 'src/app/pages/bag/bag.service';

@Component({
  selector: 'header-bag-view',
  templateUrl: './bag-view.component.html',
  styleUrls: ['./bag-view.component.scss'],
})
export class BagViewComponent implements OnInit, OnDestroy {
  items: BagItem[] = [];
  itemsArrivedSubscription: Subscription;

  constructor(private bagService: BagService) {}

  ngOnInit(): void {
    this.itemsArrivedSubscription = this.bagService.onItemsArrived.subscribe(
      (items: BagItem[]) => {
        this.items = items;
      }
    );
  }

  ngOnDestroy(): void {
    this.itemsArrivedSubscription.unsubscribe();
  }

  @Output() changeBagVisibility = new EventEmitter<void>();
  @Output() linkClick = new EventEmitter<void>();

  ChangeBagViewVisibility() {
    this.changeBagVisibility.emit();
  }

  onLinkClick() {
    this.linkClick.emit();
  }
}
