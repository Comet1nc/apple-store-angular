import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IphoneComponent } from './iphone.component';

const routes: Routes = [{ path: '', component: IphoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IphoneRoutingModule { }
