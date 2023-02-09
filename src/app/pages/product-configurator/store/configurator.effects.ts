import * as ConfActions from './configurator.actions';
import * as fromApp from '../../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/configurator-product.model';

@Injectable()
export class ConfiguratorEffects {
  fetchProduct = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConfActions.FETCH_PRODUCT),
        switchMap((action: ConfActions.FetchProduct) => {
          return this.http.get<Product[]>(
            `https://apple-store-779a3-default-rtdb.europe-west1.firebasedatabase.app/${action.payload.route}.json?orderBy="routeName"&equalTo="${action.payload.productName}"`
          );
        }),
        map((products) => {
          return new ConfActions.SetProduct(products[Object.keys(products)[0]]);
        })
      );
    },
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
