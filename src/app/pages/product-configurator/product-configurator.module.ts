import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfiguratorRoutingModule } from './product-configurator-routing.module';
import { ProductConfiguratorComponent } from './product-configurator.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StickyBarComponent } from './components/sticky-bar/sticky-bar.component';
import { ConfigurationOptionsComponent } from './components/configuration-options/configuration-options.component';
import { OptionComponent } from './components/configuration-options/option/option.component';

@NgModule({
  declarations: [
    ProductConfiguratorComponent,
    StickyBarComponent,
    ConfigurationOptionsComponent,
    OptionComponent
  ],
  imports: [
    CommonModule,
    ProductConfiguratorRoutingModule,
    NzIconModule
  ]
})
export class ProductConfiguratorModule { }
