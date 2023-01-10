import { Component, OnInit } from '@angular/core';
import { ExchangerService } from '../services/exchanger.service';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, take } from 'rxjs';

@Component({
  selector: 'app-exchanger-details',
  templateUrl: './exchanger-details.component.html',
  styleUrls: ['./exchanger-details.component.scss']
})
export class ExchangerDetailsComponent implements OnInit {

  constructor(private exchangerService: ExchangerService, private activatedRoute: ActivatedRoute) { }
  highCharts = Highcharts;
  chartOptions: any = [];
  isChartEnabled: boolean | undefined;
  fromCurrencyName: string | undefined;
  isHistoricalDataRefreshed:boolean | undefined;
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (params && params.from && params.to) {
          this.exchangerService.fromCurrencySubject$.next(params.from);
          this.exchangerService.toCurrencySubject$.next(params.to);
        }
      });
    this.exchangerService.symbolsSubject$.subscribe(response => {
      this.fromCurrencyName = response.find((x: any) => x.code == this.exchangerService.fromCurrencySubject$.value)?.name;
      this.fromCurrencyName = this.exchangerService.fromCurrencySubject$.value + (this.fromCurrencyName ? ' - ' + this.fromCurrencyName : '');
    });
   
    combineLatest([this.exchangerService.fromCurrencySubject$,this.exchangerService.toCurrencySubject$]).subscribe(response=>{
      this.getCurrencyHistoricalData();
    });
    
  }

  plotLineChart(inputData: any[]) {
    this.chartOptions = {
      series: [
        {
          data: inputData.map(x => x.amount),
          name: `${this.exchangerService.fromCurrencySubject$.value} - ${this.exchangerService.toCurrencySubject$.value}`
        },
      ],
      xAxis: {
        categories: inputData.map(x => x.period),
        title: {
          text: 'Periods'
        }
      },
      yAxis: {
        title: {
          text: "Exchange Rates"
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      chart: {
        type: 'line',
      },
      title: {
        text: `${this.exchangerService.fromCurrencySubject$.value} - ${this.exchangerService.toCurrencySubject$.value} Historical Rates Chart`,
      },
    };
    this.isChartEnabled = true;
  }

  getCurrencyHistoricalData() {
    let endDate = moment();
    let startDate = moment().subtract(1, 'year');
    var lastDatesOfMonth: any[] = [];
    while (startDate.isBefore(endDate)) {
      lastDatesOfMonth.push(startDate.format("YYYY-MM-01"));
      startDate.add(1, 'month');
    }
    startDate = moment().subtract(1, 'year');
    this.exchangerService.getExchangeHistoricalData(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")).subscribe(response => {
      var historicalData = [];
      for (var i = 0; i < response.length; i++) {
        let date = response[i].date!;
        if (lastDatesOfMonth.some(x => x == response[i].date)) {
          let dateString = new Date(date);
          let monthName = dateString.toLocaleString('default', { month: 'short' });
          let year = moment(dateString).year()
          historicalData.push({ period: `${monthName}-${year}`, amount: Number(response[i]?.amount) })
        }
      }
      this.plotLineChart(historicalData);
    });
  }
}

