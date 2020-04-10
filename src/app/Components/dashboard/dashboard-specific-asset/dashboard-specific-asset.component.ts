import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { heatoptions } from 'src/app/Components/dashboard/apexheatmap.js';
import { mixedoptions } from 'src/app/Components/dashboard/apexmixedmap.js';
import { ApexOptions } from 'apexcharts';
import { TruncatePipeModule } from '../../../custom-pipes/truncatepipe.module';
import { AssetService } from '../../../Services/asset.service';
import { AssetStatus } from '../../../Interfaces/assetStatus';
import { Chart } from '../chart.js';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

import {
  MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,
  DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader, GoogleMapAPILoaderConfig, ILatLong
} from 'angular-maps';
import { reduce } from 'rxjs/operators';
import { log } from 'util';

@Component({
  selector: 'app-dashboard-specific-asset',
  templateUrl: './dashboard-specific-asset.component.html',
  styleUrls: ['./dashboard-specific-asset.component.css']
})
export class DashboardSpecificAssetComponent implements AfterViewInit, OnInit {


  public canvas;
  public ctx: CanvasRenderingContext2D;
  public myLineChart;

  assetId: any;
  //  Date Range
  DateRange: string[] = [];
  displayDefaultmsg: boolean;
  datePickerConfig: Partial<BsDatepickerConfig>;
  displayRangeSelector: boolean;
  fromDate: string;
  toDate: string;
  public Users;
  public userName;

  // Dashboard Variables
  AssetID: number;
  AssetName: string;
  AssetType: string;
  AssetSerialNo: string;
  AssetTagSerialNo: string;
  AssetCreatedTime: string;
  AssetAge: number;
  Status: string;
  AssetBLELocation: string;
  AssetTrackerLocation: string;
  LastTrackerDateTime: string;
  LastBleDateTime: string;
  BleStatus: string;
  TrackerStatus: string;
  Custodian: string;
  AssetTrackerNo: string;
  AssetImageUrl: string;
  AssetCategory: string;
  FacilityName: string;
  FacilityLocation: string;
  FacilityImageUrl: string;
  ZoneName: string;
  GatewaySlNo: string;
  Top: string;
  Left: string;
  ZoneAccessibilityState: string;
  GeofenceName: string;
  GeoAccessibilityState: string;
  Adress: string;
  Latitude;
  Longitude;
  Alerts: number;
  Utilization: number;
  AssetUseStartTime: any;
  AssetUseEndTime: any;
  UtilizedDays: number;
  NonUtilizedDays: number;
  TrackMode:string;
  _markerTypeId;
  _options: IMapOptions;
  _box: IBox;
  _iconInfo1: IMarkerIconInfo;
  _iconGeofence: IMarkerIconInfo;
  _iconZone: IMarkerIconInfo;
  hide: boolean = false;
  className: string;
  AssetTemp:number;
  AssetHumidity:number;
  selectedTab:any;
  // Dashboard Variables Ends

  // Temp Variables
  JSONres: any;
  presentDate: any;
  creationTimeMoment: any;
  constructor(
    private el: ElementRef,
    private assetService: AssetService
  ) {

    // this.assetService.GetAllAssetList("People")
    // .subscribe(res=>{
    //   // console.log(res)
    //   this.Users = res.body;
    // })
  

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        rangeInputFormat: 'YYYY-MM-DD',
        outputFormat: 'YYYY-MM-DD',
        minDate: new Date()
      });


    Chart.defaults.global.legend.display = false;
    this.assetId = sessionStorage.getItem('assetId') || this.assetService.assetId;
    console.log('Asset Id: ', this.assetId);



  }
  mapfunction() {

    console.log(parseFloat(this.Latitude) + 1)
    // Sample Map Code --> will be refined after getting the API
    this._markerTypeId = MarkerTypeId;
    this._options = {
      disableBirdseye: false,
      disableStreetside: false,
      navigationBarMode: 1,
      zoom: 1
    };


    this._box = {
      maxLatitude: parseFloat(this.Latitude) + 1,
      maxLongitude: parseFloat(this.Longitude) + 1,
      minLatitude: parseFloat(this.Latitude) - 1,
      minLongitude: parseFloat(this.Longitude) - 1
    };

    this._iconInfo1 = {
      markerType: MarkerTypeId.ScaledImageMarker,
      url: '../../assets/icon/placeholder (1).svg',
      scale: 0.2,
      markerOffsetRatio: { x: 0, y: 0 },

    }

    this._iconGeofence = {
      markerType: MarkerTypeId.ScaledImageMarker,
      url: '../../assets/icon/geofence-placeholder.svg',
      scale: 0.06,
      markerOffsetRatio: { x: 0.5, y: 1 },
    }
    this._iconZone = {
      markerType: MarkerTypeId.ScaledImageMarker,
      url: '../../assets/icon/placeholder.svg',
      scale: 0.2,
      markerOffsetRatio: { x: 0.5, y: 1 },
    }
    this.hide = true;
  }
  ngAfterViewInit() {
    console.log(this.Latitude);
    console.log(this.Longitude);

    //  var heatchart = new ApexCharts(this.el.nativeElement.querySelector(#heatchart), heatoptions);
    //  heatchart.render();
    // var mixedchart = new ApexCharts(this.el.nativeElement.querySelector(#mixedchart), mixedoptions);
    // mixedchart.render();

  }

  ngOnInit() {
    this.assetService.GetAssetStatusDetailsforDashboard(this.assetId)
      .subscribe(res => {
        console.log("hello:"+res.data);
        this.JSONres = res.data;
        console.log('specific asset details', this.JSONres);

        // Defining Dashboard Variables
        this.AssetID = this.JSONres.AssetID;
        this.AssetName = this.JSONres.AssetName;
        console.log(this.AssetName);
        
        this.AssetType = this.JSONres.AssetType;
        this.AssetSerialNo = this.JSONres.AssetSerialNo;
        this.AssetTagSerialNo = this.JSONres.AssetTagSerialNo;
        this.AssetCreatedTime = this.JSONres.AssetCreatedTime;
        this.Status = this.JSONres.Status;
        this.AssetBLELocation = this.JSONres.AssetBLELocation;
        this.AssetTrackerLocation = this.JSONres.AssetTrackerLocation;
        this.LastTrackerDateTime = this.JSONres.LastTrackerDateTime;
        this.LastBleDateTime = this.JSONres.LastBleDateTime;
        this.BleStatus = this.JSONres.BleStatus;
        this.TrackerStatus = this.JSONres.TrackerStatus;
        this.Custodian = this.JSONres.Custodian;
        this.AssetTrackerNo = this.JSONres.AssetTrackerNo;
        this.AssetImageUrl = this.JSONres.AssetImageUrl;
        this.AssetCategory = this.JSONres.AssetCategory;
        this.FacilityName = this.JSONres.FacilityName;
        this.FacilityLocation = this.JSONres.FacilityLocation;
        this.FacilityImageUrl = this.JSONres.FacilityImageUrl;
        this.ZoneName = this.JSONres.ZoneName;
        this.GatewaySlNo = this.JSONres.GatewaySlNo;
        this.Top = this.JSONres.Top;
        this.Left = this.JSONres.Left;
        this.ZoneAccessibilityState = this.JSONres.ZoneAccessibilityState;
        this.GeofenceName = this.JSONres.GeofenceName;
        this.GeoAccessibilityState = this.JSONres.GeoAccessibilityState;
        this.Adress = this.JSONres.AssetTrackerLocation;
        this.Latitude = this.JSONres.Latitude;
        this.Longitude = this.JSONres.Longitude;
        this.Alerts = this.JSONres.Alerts;
        // this.Utilization = this.JSONres.Utilization;
        this.AssetUseEndTime = this.JSONres.AssetUseEndTime;
        this.AssetUseStartTime = this.JSONres.AssetUseStartTime;
        this.UtilizedDays = this.JSONres.UtilizedDays;
        this.AssetAge = this.JSONres.AssetAge;
        this.AssetTemp=this.JSONres.Temperature;
        this.AssetHumidity=this.JSONres.Humidity;
        this.TrackMode=this.JSONres.TrackMode;
        if(this.TrackMode=='Indoor Only'){
            this.selectedTab="nav-Floor-tab"
        }

        this.NonUtilizedDays = this.AssetAge - this.UtilizedDays;
        console.log('Utilized Day: ', this.UtilizedDays);
        console.log('Non_utlized Day: ', this.NonUtilizedDays);

        this.mapfunction();
        // this.Drawchart();

        this.presentDate = moment().format('L');
        this.creationTimeMoment = moment(this.AssetCreatedTime).format('L');
        console.log('Creation Time: ' + this.creationTimeMoment);
        console.log('Present Date: ' + this.presentDate);

        // NEED A FIX FOR THIS
        if (this.presentDate === this.creationTimeMoment ) {

          if (this.Custodian !== 'Admin') {
            this.UtilizedDays = 1;
            this.NonUtilizedDays = 0;
            this.Utilization = (this.UtilizedDays / this.AssetAge) * 100;
            this.Drawchart();
          } else if (this.Custodian === 'Admin') { // && this.UtilizedDays === 0

            if (this.UtilizedDays === 0) {
              this.UtilizedDays = 0;
              this.NonUtilizedDays = 1;
              this.Utilization = (this.UtilizedDays / this.AssetAge) * 100;
              this.Drawchart();
            } else if (this.UtilizedDays !== 0) {
              this.UtilizedDays = 1;
              this.NonUtilizedDays = 0;
              this.Utilization = (this.UtilizedDays / this.AssetAge) * 100;
              this.Drawchart();
            }

          }

        } else {
          this.Utilization = (this.UtilizedDays / this.AssetAge) * 100;
          this.Drawchart();
        }

        // fIX THING IN THIS SECTION
      });
  }
  Drawchart() {
    this.canvas = this.el.nativeElement.querySelector('#myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myLineChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['Utilized Days', 'Unutlized Days'],
        datasets: [{
          data: [this.UtilizedDays, this.NonUtilizedDays],
          backgroundColor: ['#33cc33', '#ff531a']
        }]
      },
      options: {
        tooltips: {
          enabled: true,
          titleFontSize: 32,
          bodyFontSize: 32,
          tooltipCaretSize: 50,
          // bodyFontStyle: 'bold',
          xPadding: 6,
          percentageInnerCutout: 100
        },
        // responsive: true,
        // maintainAspectRatio: false,
      }
    });
  }

  OnFloor(event){
    this.selectedTab=event.target.id;
  }
  AssociateAsset() {
    console.log('Asset ID: ', this.AssetID);
    console.log('Username: ', this.userName);
    console.log('StartDate ', this.DateRange[0]);
    console.log('EndDate ', this.DateRange[1]);

    const payload = {
      AssetId: this.AssetID,
      UserName: this.userName,
      StartTime: this.DateRange[0],
      EndTime: this.DateRange[1]
    };

    console.log(payload);
    this.assetService.AssociateAssetUser(payload)
      .subscribe(res => {
        console.log(res);
        alert('Asset has been successfully associated');
        this.ngOnInit();
      });

    // this.router.navigate(['admin/sites/AssetManagement']);
  }

  releaseAsset() {
    const releaseAssetObject = {
      AssetID: this.assetId,
      Status: 'Idle'
    };

    this.assetService.releaseAsset((releaseAssetObject))
      .subscribe(res => {
        console.log(res);
        if (res.status === 200) {

          alert('Asset: ' + this.AssetName + ' released Successfully');
          this.ngOnInit();
        }
      });
  }
  _click(index: number) {
    console.log(`Marker ${index} says: hello world...`);
  }

  _close(id: string) {
    console.log(`infobox ${id} closed...`);
  }

}
