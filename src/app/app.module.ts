import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './customReuseStrategy';
import { CustomSerializer } from './custom-route-serializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
