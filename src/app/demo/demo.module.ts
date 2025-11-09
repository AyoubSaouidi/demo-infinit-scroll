import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollListComponent } from './components/scroll-list/scroll-list.component';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mock-data.service';

@NgModule({
  declarations: [
    ScrollListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    ScrollListComponent
  ],
  providers: [
    MockDataService
  ]
})
export class DemoModule { }
