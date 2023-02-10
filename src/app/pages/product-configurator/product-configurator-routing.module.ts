import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductConfiguratorComponent } from './product-configurator.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const routes: Routes = [
  { path: ':name', component: ProductConfiguratorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NzNotificationModule],
  exports: [RouterModule],
})
export class ProductConfiguratorRoutingModule {}
