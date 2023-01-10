import { Component, OnInit } from '@angular/core';
import { ExchangerService } from '../services/exchanger.service';

@Component({
  selector: 'app-exchanger-home',
  templateUrl: './exchanger-home.component.html',
  styleUrls: ['./exchanger-home.component.scss']
})
export class ExchangerHomeComponent implements OnInit {

  constructor(private exchangerService: ExchangerService) { }

  ngOnInit(): void {
  }

}
