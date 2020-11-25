import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeViewChildComponent } from './components/treeview-child/treeview-child.component';
import { TreeViewComponent } from './components/treeview/treeview.component';
import { ArrowComponent } from './components/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewChildComponent,
    TreeViewComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
