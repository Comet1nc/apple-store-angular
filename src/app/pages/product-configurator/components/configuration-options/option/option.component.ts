import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  ConfOptionType,
  Option,
} from 'src/app/shared/configurator-product.model';
import { ProductConfiguratorService } from '../../../service/product-configurator.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit, OnDestroy {
  bgColorForColorOption: string;
  isSelected: boolean;
  onDeselectSubscription: Subscription;
  @Input() option: Option;
  @Input() optionType: ConfOptionType;
  @Input() deselectEvent: Observable<void>;
  @Output() selectedOption = new EventEmitter<Option>();

  priceUSD: number;

  ngOnInit(): void {
    this.onDeselectSubscription = this.deselectEvent.subscribe(() => {
      this.clearSelection();
    });

    this.bgColorForColorOption = this.option?.color;

    this.priceUSD = +this.option?.priceUSD;

    // for future versions
    // Setting price
    // this.configuratorService.setInitPriceForOptions.subscribe((cheapestModelPrice: number)=> {
    //   // console.log('called')
    //   if(this.optionType === ConfOptionType.model) {
    //     this.priceUSD = +this.option?.priceUSD
    //     return
    //   }
    //   if(!this.option?.hasOwnProperty('priceUSD')) return console.log('returned bcs of Nan')
    //   console.log(this.option?.title)
    //   this.priceUSD = cheapestModelPrice + +this.option?.priceUSD
    //   console.log(this.priceUSD + " = " + cheapestModelPrice + " + " + this.option?.priceUSD)
    // })
  }

  getPrice() {
    return this.priceUSD;
  }

  ngOnDestroy(): void {
    this.onDeselectSubscription.unsubscribe();
  }

  select() {
    this.selectedOption.emit(this.option);
    this.isSelected = true;
  }

  clearSelection() {
    this.isSelected = false;
  }
}
