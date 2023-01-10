import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangerDetailsComponent } from './exchanger-details/exchanger-details.component';
import { ExchangerHomeComponent } from './exchanger-home/exchanger-home.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangerHomeComponent
  },
  {
    path: 'details',
    component: ExchangerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
