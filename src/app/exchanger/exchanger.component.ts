import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppSettings } from '../appsettings';
import { CurrencyConvertResponse } from '../models/currency-convert-response';
import { RateInfo } from '../models/rate-info';
import { Symbol } from '../models/symbol';
import { SymbolRate } from '../models/symbol-rate';
import { ExchangerService } from '../services/exchanger.service';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss']
})
export class ExchangerComponent implements OnInit {
  @Input() enableMoreDetails: boolean = true;
  @Input() enableFromCurrency: boolean = false;
  @Input() enableToCurrency: boolean = false;
  symbols: Symbol[] = [];
  amount: number = AppSettings.defaultAmount;
  fromCurrency: string | undefined;
  toCurrency: string | undefined;
  resultAmount: number | undefined;
  selectedRatesInfo!: RateInfo;
  popularSymbolRates: SymbolRate[] | undefined;
  constructor(private exchangerService: ExchangerService, private router: Router) { }

  ngOnInit(): void {
    this.fromCurrency = this.exchangerService.fromCurrencySubject$.value;
    this.toCurrency = this.exchangerService.toCurrencySubject$.value;
    this.exchangerService.symbolsSubject$.subscribe(response => {
      this.symbols = response;
    });
  }

  checkExchange() {
    return (this.amount ?? 0) <= 0 || (!this.fromCurrency && !this.toCurrency);
  }

  changeFromCurrency() {
    this.exchangerService.fromCurrencySubject$.next(this.fromCurrency);
    if ((this.amount ?? 0) > 0 && (this.resultAmount ?? 0) > 0) {
      this.exchange();
    }
  }

  changeToCurrency() {
    this.exchangerService.toCurrencySubject$.next(this.toCurrency);
    if ((this.amount ?? 0) > 0 && (this.resultAmount ?? 0) > 0) {
      this.exchange();
    }
  }

  swap() {
    let temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.exchangerService.fromCurrencySubject$.next(this.fromCurrency);
    this.exchangerService.toCurrencySubject$.next(this.toCurrency);
    this.exchange();
  }

  exchange($event?: any) {
    let convertCurrency$ = this.exchangerService.convertCurrenciesRatesByCode(this.amount ?? 1);
    convertCurrency$.subscribe((convertResponse: CurrencyConvertResponse) => {
      this.resultAmount = convertResponse.amount;
      this.selectedRatesInfo = convertResponse.rateInfo;
    });
  }

  getMoreDetails() {
    this.router.navigate(['details'], { queryParams: { from: this.exchangerService.fromCurrencySubject$.value, to: this.exchangerService.toCurrencySubject$.value } });
  }

}
