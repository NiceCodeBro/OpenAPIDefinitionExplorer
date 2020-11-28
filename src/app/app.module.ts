import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeViewChildComponent } from './components/treeview-child/treeview-child.component';
import { TreeViewComponent } from './components/treeview/treeview.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { NodeComponent } from './components/node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewChildComponent,
    TreeViewComponent,
    ArrowComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
