import * as ConfActions from './configurator.actions'
import { Product } from "src/app/shared/configurator-product.model"

export interface State {
    product: Product
}

const initialState: State = {
    product: new Product('', 0)
}

export function configuratorReducer(state: State, action: ConfActions.ConfiguratorActions) {
    switch (action.type) {
        // case ConfActions.FETCH_PRODUCT:
        //     return {
        //         ...state
        //     }
            
    
        default:
            return state
    }
}