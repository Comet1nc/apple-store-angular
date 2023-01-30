import { Action } from "@ngrx/store"
import { Product } from "src/app/shared/configurator-product.model"

export const FETCH_PRODUCT = '[Configurtor-Products] Fetch product'

export class FetchProduct implements Action {
    readonly type = FETCH_PRODUCT
}

export type ConfiguratorActions = 
    | FetchProduct