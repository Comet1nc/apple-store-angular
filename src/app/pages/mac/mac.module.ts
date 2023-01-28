import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacRoutingModule } from './mac-routing.module';
import { MacComponent } from './mac.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    MacComponent
  ],
  imports: [
    CommonModule,
    MacRoutingModule,
    NzIconModule
  ]
})
export class MacModule { }
