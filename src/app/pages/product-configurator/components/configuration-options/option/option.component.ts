import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfOptionType, Option } from 'src/app/shared/configurator-product.model';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit, OnDestroy {
  
  isSelected: boolean
  onDeselectSubscription: Subscription
  @Input() option: Option
  @Input() optionType: ConfOptionType
  @Input() deselectEvent: Observable<void>

  bgColorForColorOption: string

  @Output() selectedOption = new EventEmitter<Option>()

  ngOnInit(): void {
    this.onDeselectSubscription = this.deselectEvent.subscribe(() => {
      this.clearSelection()
    })

    this.bgColorForColorOption = this.option?.color
  }

  getPrice() {
    return this.option?.priceUSD
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


