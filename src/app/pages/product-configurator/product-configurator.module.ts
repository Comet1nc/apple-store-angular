import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfiguratorRoutingModule } from './product-configurator-routing.module';
import { ProductConfiguratorComponent } from './product-configurator.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';

@NgModule({
  declarations: [
    ProductConfiguratorComponent
  ],
  imports: [
    CommonModule,
    ProductConfiguratorRoutingModule,
    NzAffixModule
  ]
})
export class ProductConfiguratorModule { }
