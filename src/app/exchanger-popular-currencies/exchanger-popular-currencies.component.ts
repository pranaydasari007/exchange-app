import { Component, Input, OnInit } from '@angular/core';
import { SymbolRate } from '../models/symbol-rate';
import { ExchangerService } from '../services/exchanger.service';

@Component({
  selector: 'app-exchanger-popular-currencies',
  templateUrl: './exchanger-popular-currencies.component.html',
  styleUrls: ['./exchanger-popular-currencies.component.scss']
})
export class ExchangerPopularCurrenciesComponent implements OnInit {

  popularSymbolRates: SymbolRate[] = [];
  constructor(private exchangerService: ExchangerService) { }

  ngOnInit(): void {
    this.getPopularCurrencyDetails();
  }

  getPopularCurrencyDetails() {    
    let getPopularCurrencies$ = this.exchangerService.getAllPopularCurrenciesRates();
    getPopularCurrencies$.subscribe(popularCurrenciesResponse => {
      this.popularSymbolRates = popularCurrenciesResponse;
    });
  }

}
