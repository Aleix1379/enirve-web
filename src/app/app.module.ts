import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ComponentsModule} from './components/components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PipesModule} from './pipes/pipes.module';
import {HttpClientModule} from '@angular/common/http';
import {InterceptorModule} from './interceptor.module';
import {MatListModule, MatSidenavModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    InterceptorModule,
    PipesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
