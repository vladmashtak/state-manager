import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { ApiModule } from './api/api.module';
import { GisComponent } from './pages/gis/gis.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes/app-routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent,
    GisComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule,
    MatToolbarModule,
    ApiModule,
    RouterModule.forRoot(routes),
    ComponentsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
