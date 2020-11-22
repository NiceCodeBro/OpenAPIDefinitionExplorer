import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EndpointPropertiesComponent } from './components/endpoint-properties/endpoint-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    EndpointPropertiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
