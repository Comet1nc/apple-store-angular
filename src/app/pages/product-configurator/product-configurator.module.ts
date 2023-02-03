import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfiguratorRoutingModule } from './product-configurator-routing.module';
import { ProductConfiguratorComponent } from './product-configurator.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    ProductConfiguratorComponent
  ],
  imports: [
    CommonModule,
    ProductConfiguratorRoutingModule,
    NzIconModule
  ]
})
export class ProductConfiguratorModule { }
