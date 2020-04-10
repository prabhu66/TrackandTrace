import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import {Chart } from '../chart.js';
import { AssetService } from '../../../Services/asset.service';
import { AssetHistory } from '../../../Interfaces/assetHistory';
import * as moment from 'moment';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  public canvas;
  public ctx: CanvasRenderingContext2D;
  public myLineChart;
  public assetHistory=[];
  public assetName: string;
  showNoHistory: boolean;
  temp_duration: number;
  moment_duration: any;
  clickedTime='utcTime';

  constructor(private el: ElementRef,
    private assetService: AssetService) {
    Chart.defaults.global.legend.display = false;

    this.assetName = this.assetService.assetName || sessionStorage.getItem('assetName');
  this.showNoHistory = true; 
  }

   ngOnInit() {
    this.assetService.GetAssetHistory(this.assetName)
    .subscribe(res => {
    console.log("movement:"+res._data);
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
    EntryTime: new Date(JSONres[i].EntryTime),
    ExitTime: new Date(JSONres[i].ExitTime),
    Status: JSONres[i].status,

    Duration: this.temp_duration,

    Duration_years: this.moment_duration.get('years'),

    Duration_months: this.moment_duration.get('months'),

    Duration_days: this.moment_duration.get('days'),

    Duration_hours: this.moment_duration.get('hours'),

    Duration_minutes: this.moment_duration.get('minutes'),
    Duration_seconds: this.moment_duration.get('seconds'),

  };
  // let d = historyObject.EntryTime;
  // let v=Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
  // d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
  // historyObject.EntryTime= new Date(v);
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
    // this.Drawchart();
  }


  navigateTo(value){
  this.clickedTime=value;

  }
}

