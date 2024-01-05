import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LatticeImageComponent } from './lattice-image/lattice-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LatticeImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
