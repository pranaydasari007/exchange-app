import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExchangerService } from './exchanger.service';

describe('ExchangerService', () => {
  let service: ExchangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,       
        FormsModule,
        CommonModule,       
        HttpClientTestingModule  
      ]
    });
    service = TestBed.inject(ExchangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
