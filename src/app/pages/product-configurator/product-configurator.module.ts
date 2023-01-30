import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfiguratorRoutingModule } from './product-configurator-routing.module';
import { ProductConfiguratorComponent } from './product-configurator.component';


@NgModule({
  declarations: [
    ProductConfiguratorComponent
  ],
  imports: [
    CommonModule,
    ProductConfiguratorRoutingModule
  ]
})
export class ProductConfiguratorModule { }
