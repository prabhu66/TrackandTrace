import { Component, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import { baroptions } from 'src/app/Components/dashboard/apexbarmap.js';
import { AssetService } from '../../../Services/asset.service';
import { AssetHistory } from '../../../Interfaces/assetHistory';
import * as moment from 'moment';

@Component({
  selector: 'app-alerts-tab',
  templateUrl: './alerts-tab.component.html',
  styleUrls: ['./alerts-tab.component.css']
})
export class AlertsTabComponent implements AfterViewInit, OnInit {

  public assetName: string;
  temp_duration: number;
  moment_duration: any;
  showNoAlert: boolean;
  public assetAlertHistory: AssetHistory[] = [];

  constructor(private el: ElementRef,
    private assetService: AssetService) {
      this.assetName = this.assetService.assetName || sessionStorage.getItem('assetName');
      this.showNoAlert = true;
    }


  ngAfterViewInit() {
    // var barchart = new ApexCharts(this.el.nativeElement.querySelector("#barchart"), baroptions);
    // barchart.render()
  }

  ngOnInit() {

      this.assetService.GetAssetAlertHistory(this.assetName)
    .subscribe(res => {
console.log("jyothi"+res.data);
this.assetAlertHistory = [];
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
    Duration_seconds: this.moment_duration.get('seconds'),

  };
  this.assetAlertHistory.push(historyObject);
}

// this.showLoader = false;
console.log(this.assetAlertHistory);
if (this.assetAlertHistory.length == 0){
  this.showNoAlert = true;
} else{
  this.showNoAlert = false;
}
    });

  }

  reload() {
    this.assetAlertHistory = [];
    this.ngOnInit();
  }
}
