import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExchangerDetailsComponent } from './exchanger-details.component';

describe('ExchangerDetailsComponent', () => {
  let component: ExchangerDetailsComponent;
  let fixture: ComponentFixture<ExchangerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerDetailsComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,       
        FormsModule,
        CommonModule,       
        HttpClientTestingModule  
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
