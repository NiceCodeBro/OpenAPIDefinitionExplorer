import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeViewComponent } from './components/treeview/treeview.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { NodeComponent } from './components/node/node.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    ArrowComponent,
    NodeComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
