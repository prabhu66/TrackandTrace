import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import {Chart } from '../chart.js';
import { AssetService } from '../../../Services/asset.service';
import { AssetHistory } from '../../../Interfaces/assetHistory';
import * as moment from 'moment';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.css']
})
export class HistoryTabComponent implements AfterViewInit, OnInit {
  public canvas;
  public ctx: CanvasRenderingContext2D;
  public myLineChart;
  public assetHistory: AssetHistory[] = [];
  public assetName: string;
  showNoHistory: boolean;
  temp_duration: number;
  moment_duration: any;

  constructor(private el: ElementRef,
    private assetService: AssetService) {
    Chart.defaults.global.legend.display = false;

    this.assetName = this.assetService.assetName || sessionStorage.getItem('assetName');
  this.showNoHistory = true; 
  }

   ngOnInit() {
     console.log(this.assetName);
     
    this.assetService.GetAssetHistory(this.assetName)
    .subscribe(res => {
console.log("history:"+res.data);
this.assetHistory = [];
const JSONres = res.data;
for (let i = 0; i < JSONres.length; i++) {
  this.temp_duration = 0;
  this.temp_duration = Date.parse(JSONres[i].ExitTime) - Date.parse(JSONres[i].EntryTime);
  this.moment_duration = moment.duration(this.temp_duration, 'milliseconds');
  const historyObject = {
    AssetName: JSONres[i].AssetName,
    FacilityName: JSONres[i].facilityName,
    ZoneName: JSONres[i].zoneName,
    EntryTime: JSONres[i].EntryTime,
    ExitTime: JSONres[i].ExitTime,
    Status: JSONres[i].status,

    Duration: this.temp_duration,

    Duration_years: this.moment_duration.get('years'),

    Duration_months: this.moment_duration.get('months'),

    Duration_days: this.moment_duration.get('days'),

    Duration_hours: this.moment_duration.get('hours'),

    Duration_minutes: this.moment_duration.get('minutes'),
    Duration_seconds: this.moment_duration.get('seconds')

  };
  this.assetHistory.push(historyObject);
  if (this.assetHistory.length === 0) {
    this.showNoHistory = true;
  } else {
    this.showNoHistory = false;
  }
}

console.log(this.assetHistory);
    });
   }

   reload() {
     this.assetHistory=[];
     this.ngOnInit();
   }
  ngAfterViewInit() {
    this.Drawchart();
  }
  Drawchart(){
    this.canvas = this.el.nativeElement.querySelector('#myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myLineChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3'],
        datasets: [{
            data: [10, 20],
            backgroundColor: ['#3AB2DA','#2A2B3D','#FF5A21']
        }],
        options:{
          responsive: true,
          maintainAspectRatio: false,
        }
    }
    });
  }
}

