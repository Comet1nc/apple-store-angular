import { ActionReducerMap } from '@ngrx/store'
import * as fromConf from '../pages/product-configurator/store/configurator.reducer'

export interface AppState {
    configurator: fromConf.State
}

export const appReducer: ActionReducerMap<AppState> = {
    configurator: fromConf.configuratorReducer
}