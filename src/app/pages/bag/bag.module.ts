import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BagRoutingModule } from './bag-routing.module';
import { BagComponent } from './bag.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [BagComponent],
  imports: [CommonModule, BagRoutingModule, NzSelectModule],
})
export class BagModule {}
