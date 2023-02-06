import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationOption, Option } from 'src/app/shared/configurator-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductConfiguratorService  {

  defaultModelPriceUSD: number
  configuratedOptions: ConfiguratedOption[] = []

  currentModelPriceUSD: number // not used

  initPrice = new Subject<number>() 
  onPriceChanged = new Subject<number>()

  price: number

  constructor() { }

  setDefaultPrice(priceUSD: number) {
    this.defaultModelPriceUSD = priceUSD
    this.initPrice.next(this.defaultModelPriceUSD)
  }

  registerOptionsInService(configurationOption: ConfigurationOption) {
    this.configuratedOptions.push(new ConfiguratedOption(undefined, configurationOption))
  }

  addSelectedOption(selectedOption: Option, from: ConfigurationOption) {
    for (const option of this.configuratedOptions) {
      if(option.from === from) {
        option.selectedOption = selectedOption
      }
    }

    this.recalculatePrice()
  }

  recalculatePrice() {
    this.price = 0
    for (const option of this.configuratedOptions) {
      if(option.selectedOption !== undefined && option.selectedOption.hasOwnProperty('priceUSD')) {
        this.price += +option.selectedOption?.priceUSD
      }
    }
    console.log(this.price)
    this.onPriceChanged.next(this.price)
  }
}

class ConfiguratedOption {
  public selectedOption: Option
  public from: ConfigurationOption

  constructor(selectedOption: Option, from: ConfigurationOption) {
    this.selectedOption = selectedOption
    this.from = from
  }
}
