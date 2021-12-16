import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { routing } from './app.routing';

import { UserComponent } from './user/user.component';

@NgModule({
  imports:      [ BrowserModule, routing],
  declarations: [ AppComponent, UserComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
