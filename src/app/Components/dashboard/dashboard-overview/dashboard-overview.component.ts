import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from '../chart.js';
import { MapService } from '../../../Services/map.service';
import { AssetService } from 'src/app/Services/asset.service';
import { BreadcrumbService } from '../../../Services/breadcrumb.service';
import * as _ from 'lodash';
import { DashboardOverviewFacilityComponent } from './dashboard-overview-facility/dashboard-overview-facility.component';
import { DashboardAssetStatus } from '../../../Interfaces/DashboardAssetStatus';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements AfterViewInit {
  @ViewChild(DashboardOverviewFacilityComponent) DashboardFacilty;

  public canvas;
  public ctx: CanvasRenderingContext2D;
  public chartData;
  public click = false;
  public labels = [];
  public data = [];
  public myLineChart;
  public charts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public displayList = new Array;
  public displayPeopleList=new Array;
  public zoneList = new Array;
  public index;
  highlightStatus: Array<boolean> = [];
  public id;
  public onlineCount;
  public offlineCount;
  public onShow;
  posts: any;
  AssetTemp:number=25.6;
  public AllFacilities;
  public AllPeopleInFacilities;
  public allWorkersSpecificFac;
  public allAssetSpecificFac;
  ShowFacilityList = true;
  summaryTabCounts: DashboardAssetStatus[] = [];

  // Dashboard Counts Variables
  TotalAssetCount: number;
  InUseAssetCount: number;
  IdleAssetCount: number;
  AlertAssetCount: number;
  OnlineAssetCount: number;
  OfflineAssetCount: number;
  IndoorAssetCount: number;
  OutDoorAssetCount: number;
  TotalPeopleCount:number;
  PeopleOnDuty:number;
  PeopleOffDuty:number;
  IndoorOutDoorAssetCount: number;
  TotalFacilityCount: number;
  CurrentIndoorAlertCount: number;
  CurrentOutdoorAlertCount: number;
  TagCount: number;
  TrackerCount: number;
  GeofenceCount: number;
  category:string="Material";

  JSONres: any;
  public searchText;
  PeopleCount: any;
  FacilityCount: any;

  constructor(
    private mapService: MapService,
    private breadcrumb: BreadcrumbService,
    private el: ElementRef,
    private _assetService: AssetService) {

    Chart.defaults.global.legend.display = false;
    this.mapService.currClick.subscribe(index => this.index = index);
    this.getAssetList();

    this._assetService.GetTotalAssetStatus()
      .subscribe(res => {
        this.JSONres = res.data;               ;
        // console.log(this.JSONres);
        this.TotalAssetCount = this.JSONres.TotalAssetCount;
        this.InUseAssetCount = this.JSONres.InUseAssetCount;
        this.IdleAssetCount = this.JSONres.IdleAssetCount;
        this.AlertAssetCount = this.JSONres.AlertAssetCount;
        this.OnlineAssetCount = this.JSONres.OnlineAssetCount;
        this.OfflineAssetCount = this.JSONres.OfflineAssetCount;
        this.IndoorAssetCount = this.JSONres.IndoorCount;
        this.OutDoorAssetCount = this.JSONres.OutdoorCount;
        this.IndoorOutDoorAssetCount = this.JSONres.IndoorNOutdoorCount;
        this.PeopleCount=this.JSONres.PeopleCount;
        this.PeopleOffDuty=this.JSONres.PeopleOffDuty;
        this.PeopleOnDuty=this.JSONres.OnDutyCount;
        this.FacilityCount = this.JSONres.FacilityCount;
        this.CurrentIndoorAlertCount = this.JSONres.IndoorAlertCount;
        this.CurrentOutdoorAlertCount = this.JSONres.OutdoorAlertCount;
         console.log("Indoor Alert",this.JSONres.IndoorAlertCount,this.CurrentIndoorAlertCount);
         

        this.TagCount = this.IndoorAssetCount + this.IndoorOutDoorAssetCount;
        this.TrackerCount = this.OutDoorAssetCount + this.IndoorOutDoorAssetCount;
        this.Drawchart();
      });

    this._assetService.geofenceCount()
      .subscribe(res => {

        let temp = res.body;
        // temp = JSON.parse(temp);
        console.log(temp);
        this.GeofenceCount = temp;
      });
  }

  getAssetList() {
    this._assetService.GetAllAssetList("Material")
      .subscribe(res => {
        console.log('res from assets', res);
        this.displayList = res.data;
        for (let i = 0; i < res; i++) {
          if (res[i].BleStatus == null) {
            this.displayList[i].BleStatus = 'offline';
          }
        }
        for (let k = 0; k < this.displayList.length; k++) {
          if (this.displayList[k].BleStatus === 'online') {
            this.onlineCount++;
          } else {
            this.offlineCount++;
          }
        }
      });

      // people Asset list
      this._assetService.GetAllAssetList("People")
      .subscribe(res => {
        console.log('res from assets', res);
        this.displayPeopleList = res.data;
        for (let i = 0; i < res; i++) {
          if (res[i].BleStatus == null) {
            this.displayPeopleList[i].BleStatus = 'offline';
          }
        }
        for (let k = 0; k < this.displayPeopleList.length; k++) {
          if (this.displayPeopleList[k].BleStatus === 'online') {
            this.onlineCount++;
          } else {
            this.offlineCount++;
          }
        }
      });

    for (let i = 0; i < this.displayList.length; i++) {
      if (this.displayList[i].zone) {
        this.zoneList.push(this.displayList[i]);
      }
    }
    console.log(this.zoneList);
  }

  receiveMessage($event) {
    if (!$event) {
      this.displayList = this.AllFacilities;
      this.displayPeopleList=this.AllPeopleInFacilities
    }
    else {
      this._assetService.GetZoneAssetDetails($event)
    .subscribe(res=>{
      this.allAssetSpecificFac=res.data.Zones;
      var array =[];
      console.log('faciility info', res)
      _.forEach(res.data.Zones,element=>{
        if(element.AssetInZoneList.length >0){
         array= array.concat(element.AssetInZoneList)
        }
      });
      // console.log('concat array', array)
      this.displayList = array;
      // console.log('from child', this.displayList)
    });

    this._assetService.GetZoneAssetDetails2($event)
    .subscribe(res=>{
      this.allWorkersSpecificFac=res.data.Zones;
      var array =[];
      console.log('faciility people info', res)
      _.forEach(res.data.Zones,element=>{
        if(element.AssetInZoneList.length >0){
         array= array.concat(element.AssetInZoneList)
        }
      });
      // console.log('concat array', array)
      this.displayPeopleList = array;
      // console.log('from child people', this.displayPeopleList)
    });
      
    }
   
  }
  recieveZone($event){
    var zone=$event;
    console.log(zone);
    
    if(zone){
    
      var assetList = this.allAssetSpecificFac.filter(item=>item.ZoneName==zone.ZoneName)
      console.log('a',assetList);
      
      this.displayList=assetList[0].AssetInZoneList;
      console.log("assets",assetList[0].AssetInZoneList);
      

      var workerList = this.allWorkersSpecificFac.filter(item=>item.ZoneName==zone.ZoneName);
      console.log("workerList after filter",workerList);
      
      this.displayPeopleList=workerList[0].AssetInZoneList;
    }
    
  } 

  ngAfterViewInit() {

    this.mainChart();
    // this.displayList = this.a;

    // for(let i=0;i<this.displayList.length;i++){
    //    if(this.displayList[i].zone){
    //      this.displayList[i].address= this.displayList[i].ble.lastKnownLocation.location;
    //    }
    //    else if(this.displayList[i].tracker){
    //      this.displayList[i].address=this.displayList[i].tracker.lastKnownLocation.location;
    //    }
    //    else{
    //      this.displayList[i].address="-";
    //    }
    // }

  }

  Drawchart() {
    this.myLineChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['InUse', 'Idle'],
        datasets: [{
          data: [ this.InUseAssetCount ,  this.IdleAssetCount ],
          backgroundColor: ['#33cc33', '#ff531a']
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      }
    });
  }
  mainChart() {
    this.canvas = this.el.nativeElement.querySelector('#myChart');
    this.ctx = this.canvas.getContext('2d');
    this.Drawchart();
  }
  onClick(i) {
    this.highlightStatus = new Array;
    console.log('inside click');
    this.mapService.changeClick(i);
    this.highlightStatus[i] = !this.highlightStatus[i];
  }
  onMapClick(event) {
    let payload = {};
    console.log(event.target.id)
    this.onShow=event.target.id;
    if (event.target.id == "nav-home-tab") {
      this._assetService.GetMapDetails(payload)
        .subscribe(res => {
          this.displayList = res.data;
          this.id = "map";
        })
      console.log(this.displayList)
      this.displayPeopleList=[];
    }
  }
  onUtilizationClick(event) {
    this.onShow=event.target.id;
    if (event.target.id == "nav-utilization-tab") {
      this._assetService.GetAllAssetList("Material")
        .subscribe(res => {
          console.log('res from assets', res);
          this.displayList = res.data;
          this.id = "util"
        })
        this._assetService.GetAllAssetList("People")
        .subscribe(res => {
          console.log('res from assets', res);
          this.displayPeopleList = res.data;
          this.id = "util"
        })
    }
  }
  onFloorClick(event) {
    this.onShow = event.target.id;
    console.log(event.target.id)
    if (event.target.id === "nav-floor-tab") {
      this._assetService.GetAllAssetsInFacilitiesMaterial()
        .subscribe(res => {
          console.log('from floor', res);
          this.displayList = res.data;
          this.AllFacilities = res.data;
          this.id = "floor";
          // console.log('from floor', this.displayList);
        });
        this._assetService.GetAllAssetsInFacilities("People")
        .subscribe(res => {
          console.log('from people floor', res);
          this.displayPeopleList = res.data;
          this.AllPeopleInFacilities = res.data;
          this.id = "floor";
          // console.log('from people floor', this.displayPeopleList);
        });
    }
  }

  setAssetId(assetId,assetName){
    console.log('assetId',assetId);
    this.breadcrumb.subheader="Asset";
    this.breadcrumb.changeCurrState(assetName);
    this.breadcrumb.changeCurrSelection("Asset");
    this._assetService.assetName=assetName;
    sessionStorage.setItem('assetId', assetId);
  }
}
