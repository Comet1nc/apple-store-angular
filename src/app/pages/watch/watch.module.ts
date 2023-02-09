import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [WatchComponent],
  imports: [CommonModule, WatchRoutingModule, NzIconModule],
})
export class WatchModule {}
