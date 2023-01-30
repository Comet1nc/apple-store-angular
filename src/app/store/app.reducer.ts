import * as fromConf from '../pages/product-configurator/store/configurator.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
    configurator: fromConf.State
}

export const appReducer: ActionReducerMap<AppState> = {
    configurator: fromConf.configuratorReducer
}