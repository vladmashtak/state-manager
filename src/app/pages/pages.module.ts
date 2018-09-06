import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GisComponent } from './gis/gis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const COMPONENTS = [
  GisComponent,
  DashboardComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: COMPONENTS
})
export class ComponentsModule {
}
