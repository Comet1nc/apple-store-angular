import { AfterContentInit, Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ConfigurationOption, Option } from 'src/app/shared/configurator-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductConfiguratorService {

  defaultModelPriceUSD: number
  configuratedOptions: ConfiguratedOption[] = []

  initPrice = new Subject<number>() 
  onPriceChanged = new Subject<number>()
  onAllOptionsSelected = new Subject<[boolean, ConfiguratedOption[]]>()
  // setInitPriceForOptions = new BehaviorSubject<number>(0)
  setNewPriceForOption = new Subject<[number, string]>()

  price: number

  setDefaultPrice(priceUSD: number) {
    this.defaultModelPriceUSD = priceUSD
    this.initPrice.next(this.defaultModelPriceUSD)
    // this.changeInitPriceForOption()
  }

  registerOptionsInService(configurationOption: ConfigurationOption) {
    this.configuratedOptions.push(new ConfiguratedOption(undefined, configurationOption))
  }

  // changeInitPriceForOption() {
  //   this.setInitPriceForOptions.next(this.defaultModelPriceUSD)
  // }

  addSelectedOption(selectedOption: Option, from: ConfigurationOption) {
    for (const option of this.configuratedOptions) {
      if(option.from === from) {
        option.selectedOption = selectedOption
      }

     
    }

    this.onAllOptionsSelected.next([this.checkIfAllOptionsSelected(), this.configuratedOptions])

    this.recalculateTotalCost()
  }

  checkIfAllOptionsSelected() {
    let result = this.configuratedOptions.every(element => {
      return element.selectedOption !== undefined
    })
    return result
  }

  recalculateTotalCost() {
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

export class ConfiguratedOption {
  public selectedOption: Option
  public from: ConfigurationOption

  constructor(selectedOption: Option, from: ConfigurationOption) {
    this.selectedOption = selectedOption
    this.from = from
  }
}
