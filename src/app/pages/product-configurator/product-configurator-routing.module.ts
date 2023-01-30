import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductConfiguratorComponent } from './product-configurator.component';

const routes: Routes = [{ path: '', component: ProductConfiguratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductConfiguratorRoutingModule { }
