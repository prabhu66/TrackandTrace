import { Component, Output, EventEmitter, ElementRef, ViewChildren, QueryList , AfterViewInit} from '@angular/core';
import { AssetService  } from 'src/app/Services/asset.service'
import * as _ from 'lodash';
import {NgbPopover } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard-overview-facility',
  templateUrl: './dashboard-overview-facility.component.html',
  styleUrls: ['./dashboard-overview-facility.component.css']
})
export class DashboardOverviewFacilityComponent implements  AfterViewInit {
  @ViewChildren('cmp') components;
  @ViewChildren('popover') popovers;
  public posx;
  public posy;
  public showtooltip = [];
  public popup = [];
  public floorImage;
  public showCard = true;
  public floorList = [];
  public facility = [];
  public facilityPeople=[];
  public currentfloor;
  public selectedZone;
  public zonesAlert=new Array();
  public peopleAssetCount:number;
  public AssetCount:number;
  public AlertCount:number;
  public zonesMaterial;
  public zonesPeople;
  public x =[1,2,3,4]
  @Output() messageEvent = new EventEmitter<any>();
  @Output() zoneEvent = new EventEmitter<any>();
  constructor(private _assetservice:AssetService, private el:ElementRef) {
    this._assetservice.GetFacilityList()
    .subscribe(res=>{
      console.log('res from facility',res);
      this.floorList = res.data;
    });

    console.log('show card',this.showCard);
  }

  ngAfterViewInit() {
    console.log(this.el.nativeElement.querySelector('#cmp'));
  }
  ShowByDefault(){
    console.log('I am here');
  }

  getLocationPoints(e){
      var rect = e.target.getBoundingClientRect();
      this.posx = e.clientX - rect.left; //x position within the element.
      this.posy= e.clientY - rect.top;
      var svg = this.el.nativeElement.querySelector('#mySvg');
      var pt = svg.createSVGPoint();

      pt.x = this.posx;
      pt.y = this.posy;
    
      // return pt.matrixTransform(svg.getScreenCTM().inverse());
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      this.posx = svgP.x;
      this.posy = svgP.y;
      console.log("x=",this.posx+ ' y='+ this.posy);
  }
  public RefreshPlan(){
    this.ExpandPlan(this.currentfloor);
  }
  ExpandPlan(floor){
    this.currentfloor = floor;
    this.messageEvent.emit(floor.FacilityName)
    this._assetservice.GetZoneAssetDetails(floor.FacilityName)
    .subscribe(res=>{
      this.facility = res.data;
      this.zonesMaterial=res.data.Zones;
      var array =[];
      console.log('faciility info', res)
      
        
    });

    this._assetservice.GetZoneAssetDetails2(floor.FacilityName)
    .subscribe(res=>{
      this.facilityPeople = res.data;
      this.zonesPeople=res.data.Zones;
      var array =[];
      console.log('faciility people', res.data)
      
      // for(let i=0; i<this.facility.length;i++){
      //  let zonesMaterialCount=this.facility[i].AlertCount;
      //  let zonesPeopleCount=this.facilityPeople[i].AlertCount;
      //  this.zonesAlert.push(zonesMaterialCount+zonesPeopleCount)
      //   console.log("Alert Count",this.zonesAlert);
        
      // }
  
        
    });
   
    // this._assetservice.GetZoneAssetDetailsPoll(floor.FacilityName)
    // .subscribe(res=>{
    //   this.facility = res;
    //   console.log(res);
    // });
    this.floorImage = floor.ImageUrl;
    this.showCard = false;
    this.showtooltip.fill(false);
    this.popup.fill(false);
  }
  CloseFacility(){
    this.messageEvent.emit(null);
  }
  AssignZone(zone,i){
    // this.selectedZone=zone;
    console.log(zone);
    this.AssetCount=0;
    this.AlertCount=0;
    console.log("zones alert in materials",this.zonesMaterial);
    this.zoneEvent.emit(zone)
    // zone.AssetCount=0;
    // zone.AlertCount=0;
    console.log("index of zone",i);
    
    console.log("zones alert in people",this.zonesPeople);
    var zonesMaterial=this.zonesMaterial.filter(item=>item.ZoneName==zone.ZoneName)
    console.log("zones alert in materials",zonesMaterial[0].AssetCount);

    var zonesPeople=this.zonesPeople.filter(item=>item.ZoneName==zone.ZoneName)
    console.log("zones alert in people",zonesPeople[0].AssetCount);
    this.AssetCount=zonesMaterial[0].AssetCount;
    this.peopleAssetCount= zonesPeople[0].AssetCount;
    this.AlertCount=zonesMaterial[0].AlertCount+zonesPeople[0].AlertCount
  
    this.selectedZone = zone;
    
    console.log("zonesMaterial",this.zonesMaterial[i].AssetCount);
    
    
  }
  ShowAllByDefault(){
    this.popovers.forEach((popover: NgbPopover) => {
      console.log('iam inside',popover)
      popover.shown.subscribe(() => {

        this.popovers

        .filter(p => p !== popover)

        .forEach(p => p.open());
      });

 

      popover.hidden.subscribe(() => {

        this.popovers

        .filter(p => p !== popover)

        .forEach(p => p.close());

      });

 

    });

    }
}
