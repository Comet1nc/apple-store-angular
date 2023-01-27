import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IphoneRoutingModule } from './iphone-routing.module';
import { IphoneComponent } from './iphone.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    IphoneComponent
  ],
  imports: [
    CommonModule,
    IphoneRoutingModule,
    NzIconModule,
  ]
})
export class IphoneModule { }
