import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpadRoutingModule } from './ipad-routing.module';
import { IpadComponent } from './ipad.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [IpadComponent],
  imports: [CommonModule, IpadRoutingModule, NzIconModule],
})
export class IpadModule {}
