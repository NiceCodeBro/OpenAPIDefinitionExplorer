import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeViewComponent } from './components/treeview/treeview.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { NodeComponent } from './components/node/node.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    ArrowComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
