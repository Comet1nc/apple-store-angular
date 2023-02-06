import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfOptionType, Option } from 'src/app/shared/configurator-product.model';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit, OnDestroy {
  
  bgColorForColorOption: string
  isSelected: boolean
  onDeselectSubscription: Subscription
  @Input() option: Option
  @Input() optionType: ConfOptionType
  @Input() deselectEvent: Observable<void>
  @Output() selectedOption = new EventEmitter<Option>()

  priceUSD: number

  ngOnInit(): void {
    this.onDeselectSubscription = this.deselectEvent.subscribe(() => {
      this.clearSelection()
    })

    this.bgColorForColorOption = this.option?.color

    this.setPrice(0)
  }

  setPrice(priceBefore: number) {
    this.priceUSD = +this.option?.priceUSD + priceBefore
  }

  getPrice() {
    return this.priceUSD
  }

  ngOnDestroy(): void {
    this.onDeselectSubscription.unsubscribe()
  }
  
  select() {
    this.selectedOption.emit(this.option)
    this.isSelected = true
  }

  clearSelection() {
    this.isSelected = false
  }
}


