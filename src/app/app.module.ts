import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pl_PL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterComponent } from './components/footer/footer.component';
import { ColumnComponent } from './components/footer/column/column.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { ConfiguratorEffects } from './pages/product-configurator/store/configurator.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BagViewComponent } from './components/header/bag-view/bag-view.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ColumnComponent,
    BagViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzPopoverModule,
    NzBadgeModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ConfiguratorEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [{ provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
