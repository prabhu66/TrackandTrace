import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../Services/asset.service';
import { AssetHistory } from '../../../../Interfaces/assetHistory';
import * as moment from 'moment';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  public assetName: string;
  temp_duration: number;
  moment_duration: any;
  showNoData: boolean;
  public assetAlertHistory: AssetHistory[] = [];
  constructor(
    private assetService: AssetService
  ) {
    this.assetName = this.assetService.assetName;
    console.log(this.assetName);
  }

  ngOnInit() {

    this.assetService.GetAssetName
    .subscribe( AssetName =>{
      this.assetName = AssetName;
      this.assetService.GetAssetAlertHistory(this.assetName)
    .subscribe(res => {
console.log(res);
this.assetAlertHistory = [];
let JSONres = res.data;
for (let i = 0; i < JSONres.length; i++) {
  this.temp_duration = 0;
  this.temp_duration = Date.parse(JSONres[i].ExitTime) - Date.parse(JSONres[i].EntryTime);
  this.moment_duration = moment.duration(this.temp_duration, 'milliseconds');
  let historyObject = {
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
  console.log(this.assetAlertHistory.length);
  if (this.assetAlertHistory.length === 0) {
this.showNoData = true;
  } else {
    this.showNoData = false;
  }
}

// this.showLoader = false;
console.log(this.assetAlertHistory);
    });
    });
  }

  reload() {
    this.assetAlertHistory = [];
    this.ngOnInit();
  }

}
