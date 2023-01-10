import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangerComponent } from './exchanger/exchanger.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './interceptors/apikey.interceptor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { ExchangerHomeComponent } from './exchanger-home/exchanger-home.component';
import { ExchangerPopularCurrenciesComponent } from './exchanger-popular-currencies/exchanger-popular-currencies.component';
import { ExchangerDetailsComponent } from './exchanger-details/exchanger-details.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [   
    AppComponent,
    ExchangerComponent,
    ExchangerHomeComponent,
    ExchangerPopularCurrenciesComponent,
    ExchangerDetailsComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HighchartsChartModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
