import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ConfigurationOption,
  Option,
  Product,
} from 'src/app/shared/configurator-product.model';
import { BagItem, BagService } from '../../bag/bag.service';

@Injectable({
  providedIn: 'root',
})
export class ProductConfiguratorService {
  defaultModelPriceUSD: number;
  configuratedOptions: ConfiguratedOption[] = [];

  product: Product;

  initPrice = new Subject<number>();
  onPriceChanged = new Subject<number>();
  onAllOptionsSelected = new Subject<[boolean, ConfiguratedOption[]]>();
  // setInitPriceForOptions = new BehaviorSubject<number>(0)
  setNewPriceForOption = new Subject<[number, string]>();

  price: number;

  constructor(public bagService: BagService) {}

  clearService() {
    this.price = 0;
    this.configuratedOptions = [];
    this.defaultModelPriceUSD = 0;
  }

  setDefaultPrice(priceUSD: number) {
    this.defaultModelPriceUSD = priceUSD;
    this.initPrice.next(this.defaultModelPriceUSD);
    // this.changeInitPriceForOption()
  }

  registerOptionsInService(configurationOption: ConfigurationOption) {
    this.configuratedOptions.push(
      new ConfiguratedOption(undefined, configurationOption)
    );
  }

  unregisterOptionsInService(configurationOption: ConfigurationOption) {
    this.configuratedOptions = [];
  }

  // changeInitPriceForOption() {
  //   this.setInitPriceForOptions.next(this.defaultModelPriceUSD)
  // }

  addSelectedOption(selectedOption: Option, from: ConfigurationOption) {
    for (const option of this.configuratedOptions) {
      if (option.from === from) {
        option.selectedOption = selectedOption;
      }
    }

    this.onAllOptionsSelected.next([
      this.checkIfAllOptionsSelected(),
      this.configuratedOptions,
    ]);

    this.recalculateTotalCost();
  }

  checkIfAllOptionsSelected() {
    let result = this.configuratedOptions.every((element) => {
      return element.selectedOption !== undefined;
    });
    return result;
  }

  recalculateTotalCost() {
    this.price = 0;
    for (const option of this.configuratedOptions) {
      if (
        option.selectedOption !== undefined &&
        option.selectedOption.hasOwnProperty('priceUSD')
      ) {
        this.price += +option.selectedOption?.priceUSD;
      }
    }
    this.onPriceChanged.next(this.price);
  }

  setProduct(product: Product) {
    this.product = product;
  }

  addItemToBag() {
    this.bagService.addItemToBag(
      new BagItem(this.configuratedOptions, this.product)
    );
  }
}

export class ConfiguratedOption {
  public selectedOption: Option;
  public from: ConfigurationOption;

  constructor(selectedOption: Option, from: ConfigurationOption) {
    this.selectedOption = selectedOption;
    this.from = from;
  }
}
