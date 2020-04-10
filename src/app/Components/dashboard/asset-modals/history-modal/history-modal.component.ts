import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../Services/asset.service';
import { AssetHistory } from '../../../../Interfaces/assetHistory';
import * as moment from 'moment';
@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css']
})
export class HistoryModalComponent implements OnInit {

  public assetName: string;
  temp_duration: number;
  moment_duration: any;
  public assetHistory: AssetHistory[] = [];
  showLoader: boolean;
  showNoHistory: boolean;
  constructor(
    private assetService: AssetService
  ) {
    this.assetName = this.assetService.assetName;
    console.log(this.assetName);
    this.showLoader = true;
    this.showNoHistory = true; 
   }

  ngOnInit() {

    this.assetService.GetAssetName
    .subscribe( AssetName =>{
      this.assetName = AssetName;
      this.showLoader = true;
    this.assetService.GetAssetHistory(this.assetName)
    .subscribe(res => {
console.log(res.data);
this.assetHistory = [];
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
  this.assetHistory.push(historyObject);
  if (this.assetHistory.length === 0) {
    this.showNoHistory = true;
  } else {
    this.showNoHistory = false;
  }
}

this.showLoader = false;
console.log(this.assetHistory);
    });
    });
  }
  reload() {
    this.assetHistory = [];
    this.ngOnInit();
  }

}
