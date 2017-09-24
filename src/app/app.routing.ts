import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'sklad', pathMatch: 'full' },
  { path: 'objednavka', component: OrderComponent },
  { path: 'sklad', component: StockComponent},
  { path: 'module-detail/:gearbox/:module', component: ModuleDetailComponent},
  //{ path: '**', redirectTo: 'sklad' }, //always last
];

export const AppRouting = RouterModule.forRoot(appRoutes);
