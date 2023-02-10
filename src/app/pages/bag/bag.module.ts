import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BagRoutingModule } from './bag-routing.module';
import { BagComponent } from './bag.component';


@NgModule({
  declarations: [
    BagComponent
  ],
  imports: [
    CommonModule,
    BagRoutingModule
  ]
})
export class BagModule { }
