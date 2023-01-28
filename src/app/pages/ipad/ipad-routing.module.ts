import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpadComponent } from './ipad.component';

const routes: Routes = [{ path: '', component: IpadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpadRoutingModule { }
