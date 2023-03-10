import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfOptionType } from 'src/app/shared/configurator-product.model';
import {
  ConfiguratedOption,
  ProductConfiguratorService,
} from '../../service/product-configurator.service';

@Component({
  selector: 'configurator-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  allOptionsSelected: boolean = false;
  configuratedOptions: ConfiguratedOption[] = [];

  @Output() onItemAddedToBag = new EventEmitter<void>();
  price: number;
  fullName: string;
  modelName: string;

  constructor(private configuratorService: ProductConfiguratorService) {}

  ngOnInit(): void {
    this.configuratorService.onAllOptionsSelected.subscribe(
      ([expression, data]) => {
        this.allOptionsSelected = expression;
        this.configuratedOptions = data;

        this.fullName = '';
        if (expression === true) {
          this.setProperties();
        }
      }
    );

    this.configuratorService.onPriceChanged.subscribe((price) => {
      this.price = price;
    });
  }

  setProperties() {
    for (const option of this.configuratedOptions) {
      if (option.from.type === ConfOptionType.model) {
        this.modelName = option.selectedOption.title;
      }

      this.fullName += ' ' + option.selectedOption.title;
    }
  }

  addItemToBag() {
    this.configuratorService.addItemToBag();
    this.onItemAddedToBag.emit();
  }
}
