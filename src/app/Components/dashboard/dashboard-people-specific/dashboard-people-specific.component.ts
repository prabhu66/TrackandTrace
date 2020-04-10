import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { heatoptions } from 'src/app/Components/dashboard/apexheatmap.js';
import { mixedoptions } from 'src/app/Components/dashboard/apexmixedmap.js';
import { ApexOptions } from 'apexcharts';
import { TruncatePipeModule } from '../../../custom-pipes/truncatepipe.module';
import { AssetService } from '../../../Services/asset.service';
import { AssetStatus } from '../../../Interfaces/assetStatus';
import { ZoneTimeDetails } from '../../../Interfaces/zoneTimeDetails';
import * as moment from 'moment';
import { Chart } from '../chart.js';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


import {
  MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,
  DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader, GoogleMapAPILoaderConfig, ILatLong
} from 'angular-maps';

@Component({
  selector: 'app-dashboard-people-specific',
  templateUrl: './dashboard-people-specific.component.html',
  styleUrls: ['./dashboard-people-specific.component.css']
})


export class DashboardPeopleSpecificComponent implements AfterViewInit, OnInit {

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
  public dates = [1, 2, 3, 4, 5, 6, 7, 7, 8, 9];
  public duration = ['9hrs', '5hrs', '7hrs', '8hrs', '7hrs', '9hrs', '5hrs', '7hrs', '8hrs']

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
  holdingAssets: number;
  assetDues: number;
  _markerTypeId;
  _options: IMapOptions;
  _box: IBox;
  _iconInfo1: IMarkerIconInfo;
  _iconGeofence: IMarkerIconInfo;
  _iconZone: IMarkerIconInfo;
  hide: boolean = false;
  className: string;
  AssetTemp: number;
  AssetHumidity: number;
  TrackMode: string;
  MonthAttendance: number;
  OnFloorTime:any;
  CurrentZoneFloorTime:any;
  totalFLoorTime={
    hour:"0",
    minute:"0",
    second:"0"
  };
  uniqueZoneTime={
    hour:"0",
    minute:"0",
    second:"0"
  };
  // Dashboard Variables Ends

  // Temp Variables

  JSONres: any;
  presentDate: any;
  creationTimeMoment: any;
  constructor(
    private el: ElementRef,
    private assetService: AssetService
  ) {


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
    this.assetService.GetPersonStatusDetailsforDashboard(this.assetId)
      .subscribe(res => {
        // console.log(res);
        this.JSONres = res.data;
        console.log('specific asset details', this.JSONres);

        // Defining Dashboard Variables
        this.AssetID = this.JSONres.AssetID;
        this.AssetName = this.JSONres.AssetName;
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
        this.AssetTemp = this.JSONres.Temperature;
        this.AssetHumidity = this.JSONres.Humidity;
        this.holdingAssets = this.JSONres.Holdingassets;
        this.assetDues = this.JSONres.AssetDue;
        this.TrackMode = this.JSONres.TrackMode;
        this.MonthAttendance = this.JSONres.MonthAttendance;
        this.OnFloorTime = this.JSONres.OnFloorTime;
        this.CurrentZoneFloorTime = this.JSONres.CurrentZoneFloorTime;


        this.OnFloorTime=moment.duration(this.OnFloorTime, 'milliseconds');
        this.totalFLoorTime.hour= this.OnFloorTime.get('hours');

        this.totalFLoorTime.minute=this.OnFloorTime.get('minutes');
        this.totalFLoorTime.second=this.OnFloorTime.get('seconds');
        console.log("new time", this.totalFLoorTime);
        
        this.CurrentZoneFloorTime=moment.duration(this.CurrentZoneFloorTime, 'milliseconds');

        this.uniqueZoneTime.hour= this.CurrentZoneFloorTime.get('hours');

        this.uniqueZoneTime.minute=this.CurrentZoneFloorTime.get('minutes');
        this.uniqueZoneTime.second=this.CurrentZoneFloorTime.get('seconds');
        
        this.NonUtilizedDays = this.AssetAge - this.UtilizedDays;
        console.log('Utilized Day: ', this.UtilizedDays);
        console.log('Non_utlized Day: ', this.NonUtilizedDays);

        this.mapfunction();
        this.Drawchart();

        // this.presentDate = moment().format('L');
        // this.creationTimeMoment = moment(this.AssetCreatedTime).format('L');
        // console.log('Creation Time: ' + this.creationTimeMoment);
        // console.log('Present Date: ' + this.presentDate);



        // fIX THING IN THIS SECTION
      });
  }
  Drawchart() {
    var labelsArr = new Array();
    var duration = new Array();
    this.assetService.GetPersonAttendanceDetailsforDashboard(this.AssetName).subscribe(res => {

      // var temp = {
      //     "AssetName": "Virat",
      //     "LoggedInTime": new Date(),
      //     "LoggedOutTime": new Date(),
      //     "AttendaceDate": new Date(),
      //     "Duration": 18

      // }
      // res.push(temp);
      console.log(res);
      res.data.forEach(element => {
        console.log(new Date(element.AttendaceDate), element.Duration);
        let time= (element.Duration);
        // if(time[0]=="00"){
        //   time[0]="0";
        // }
        console.log("new duration",time);
        
        let date = moment(element.AttendaceDate).format("MMM D")

        labelsArr.push(date);
        duration.push(time);
      });



      var ctx = document.getElementById("myChart");
      console.log("labels", labelsArr);
      console.log("duration", duration);



      var speedData = {
        labels: labelsArr,
        datasets: [{
          label: `Attendance of ${this.AssetName}`,
          data: duration,
          backgroundColor: '#10bfec',
          // borderColor: 'red',
          borderWidth: 2
        }]
      }

      var chartOptions = {
        legend: {
          display: false,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        // title: {
        //   display: true,
        //   text: 'Attendance Duration (UTC Format)'
        // },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Duration (Hr) ',
              fontSize: 11,
              fontColor: "grey",
              FontFamily: "Roboto"
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            barPercentage: 0.4,
            // categoryPercentage: 1
          
          gridLines: {
            display: false
          }
          }]
        }
      };

    

      var lineChart = new Chart(ctx, {
        type: 'bar',
        data: speedData,
        options: chartOptions
      });

      console.log(speedData, 'speedData')
      console.log(chartOptions, 'speedData')


      /*
      var myChart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: labelsArr,
          datasets: [{
            label: `Attendance of ${this.AssetName}`,
            data: duration,
            backgroundColor: '#10bfec',
        
            borderColor: '#10bfec',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          width:500,
          height:400,
          maintainAspectRatio:false,
          scales: {
            xAxes: [{
              barPercentage: 0.2,
              categoryPercentage: .4,
              // stepSize:1,
              beginAtZero:true,
              ticks: {
                // autoSkip: true,
                maxTicksLimit: 20,
                
              },
              type: 'time',
              
              time: {
                unit: 'hour',
                unitStepSize: 0.5,
                round: 'hour',
                tooltipFormat: "h:mm:ss a",
                displayFormats: {
                  hour: 'MMM D, h:mm A'
                }
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          }
        }
      }); */
    })

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
        console.log(res.status);
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

