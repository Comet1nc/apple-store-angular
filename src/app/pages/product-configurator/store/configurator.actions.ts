import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/configurator-product.model';

export const FETCH_PRODUCT = '[Configurtor-Products] Fetch product';
export const SET_PRODUCT = '[Configurtor-Products] Set product';

export class FetchProduct implements Action {
  readonly type = FETCH_PRODUCT;

  constructor(public payload: { productName: string; route: string }) {}
}

export class SetProduct implements Action {
  readonly type = SET_PRODUCT;

  constructor(public payload: Product) {}
}

export type ConfiguratorActions = FetchProduct | SetProduct;
