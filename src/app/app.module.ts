import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { AppRouting } from './app.routing';
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModuleService } from './services/module.service';
import { OrderService } from './services/order.service';

import { GearboxComponent } from './gearbox/gearbox.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    StockComponent,
    ModuleDetailComponent,
    GearboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRouting,
    BrowserAnimationsModule,
    Angular2PromiseButtonModule.forRoot({
      // your custom config goes here
        spinnerTpl: '<div class="loader"></div>',
        // disable buttons when promise is pending
        disableBtn: true,
        // the class used to indicate a pending promise
        btnLoadingClass: 'is-loading',
        // only disable and show is-loading class for clicked button,
        // even when they share the same promise
        handleCurrentBtnOnly: true})
  ],
  providers: [OrderService, ModuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
