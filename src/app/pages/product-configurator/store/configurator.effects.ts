

import * as ConfActions from './configurator.actions'
import * as fromApp from '../../../store/app.reducer'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";

@Injectable()
export class ConfiguratorEffects {
    fetchProduct = createEffect( () => {

    })

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}