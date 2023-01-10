import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppSettings } from '../appsettings';
import { CurrencyConvertResponse } from '../models/currency-convert-response';
import { HistoricalCurrencyRate } from '../models/historical-currency-rate';
import { Symbol } from '../models/symbol';
import { SymbolRate } from '../models/symbol-rate';

@Injectable({
  providedIn: 'root'
})
export class ExchangerService {
  symbolsSubject$: BehaviorSubject<Array<Symbol>> = new BehaviorSubject<Array<Symbol>>([]);
  swapCurrencySubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fromCurrencySubject$: BehaviorSubject<any> = new BehaviorSubject<any>(AppSettings.defaultFromCurrency);
  toCurrencySubject$: BehaviorSubject<any> = new BehaviorSubject<any>(AppSettings.defaultToCurrency);
  constructor(private http: HttpClient) {
    this.getCurrencies();
  }

  getCurrencies() {
    if (this.symbolsSubject$.value.length == 0) {
      this.http.get(`${environment.baseAddress}/symbols`).subscribe((response: any) => {
        var symbols: Symbol[] = Object.keys(response.symbols).map((key) => { return { code: key, name: response.symbols[key] } });
        this.symbolsSubject$.next(symbols);
      });
    }
  }

  convertCurrenciesRatesByCode(amount: any): Observable<any> {
    let fromCurrency = this.fromCurrencySubject$.value;
    let toCurrencies = this.toCurrencySubject$.value;
    let url = `${environment.baseAddress}/convert?from=${fromCurrency}&to=${toCurrencies}&amount=${amount}`;

    return this.http.get(`${url}`).pipe(map((response: any) => {
      var rates: CurrencyConvertResponse = { amount: response.result, rateInfo: response.info };
      return rates;
    }),
      catchError(error => of(`Error : ${error}`)));
  }

  getAllPopularCurrenciesRates(): Observable<any> {
    let baseCurrency = this.fromCurrencySubject$.value;
    let url = `${environment.baseAddress}/latest?symbols=${AppSettings.defaultPopularCurrencies}&base=${baseCurrency}`;

    return this.http.get(`${url}`).pipe(map((response: any) => {
      var symbolRates: SymbolRate[] = Object.keys(response.rates).map((key) => { return { code: key, amount: response.rates[key] } });
      return symbolRates;
    }),
      catchError(error => throwError(() => error)));
  }

  getExchangeHistoricalData(startDate: any, endDate: any) {
    let baseCurrency = this.fromCurrencySubject$.value;
    let toCurrency = this.toCurrencySubject$.value;
    let url = `${environment.baseAddress}/timeseries?symbols=${toCurrency}&base=${baseCurrency}&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get(`${url}`).pipe(map((response: any) => {
      var symbolRates: HistoricalCurrencyRate[] = Object.keys(response.rates).map((key) => {
        return {
          date: key,
          amount: response.rates[key][toCurrency]
        }
      });
      return symbolRates;
    }),
      catchError(error => throwError(() => error)));
  }
}

