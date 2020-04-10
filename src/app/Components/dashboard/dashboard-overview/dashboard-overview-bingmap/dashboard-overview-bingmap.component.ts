import { Component, NgModule, OnInit, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,
  DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader, GoogleMapAPILoaderConfig, ILatLong
} from 'angular-maps';
import { MapService } from "../../../../Services/map.service";
import { AssetService } from "../../../../Services/asset.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard-overview-bingmap',
  templateUrl: './dashboard-overview-bingmap.component.html',
  styleUrls: ['./dashboard-overview-bingmap.component.css']
})
export class DashboardOverviewBingmapComponent implements OnInit {

   pageTitle: string = "Map";
  avglat: number = 0;
  avglng: number = 0;
  lat1: number = 12.8367 ;
  lng1: number = 77.6599;
  hide: boolean = false;
  zoom: string;
  public specific_asset;
  posts: any;
  values: any[];
  _markers = new Array<ILatLong>();
  title = new Array;
  mark_title;
  desc;
  state;
  count = 0;
  _markerTypeId = MarkerTypeId;
  _options: IMapOptions;
  _box: IBox;
  _iconInfo1: IMarkerIconInfo;
  _iconInfo2: IMarkerIconInfo;
  _iconGeofence: IMarkerIconInfo;
  _iconZone: IMarkerIconInfo;
  geofence: boolean = false;
  zone: boolean = false;
  address: boolean = false;
  index;
  _box2:IBox;
  show:boolean=true;
  len =new Array();

  public  a = [{
    name:"TELK20",
    status:"online",
    address:"  EC3 Wipro Tower-8 Cafeteria",
    alert:"5",
    geofenceState:"IN",
    lat:12.8367,
    lng:77.6599,
    geofence:{
      name:"Wipro Tower-8"
    },
    start_date:"31-01-2019 10:20 PM"
  },{
    name:"Daikin100",
    status:"online",
    address:"  EC3 Wipro Tower-7 Entrance",
    alert:"5",
    geofenceState:"IN",
    lat:12.8374,
    lng:77.6601,
    geofence:{
      name:"Wipro Tower-7"
    },
    start_date:"31-01-2019 10:20 PM"
  },
  {
    name:"Duracell100",
    status:"online",
    address:"  EC3 Wipro Tower-18",
    alert:"5",
    geofenceState:"OUT",
    lat:12.8369,
    lng:77.6572,
    geofence:null,
    start_date:"31-01-2019 10:20 PM"
  }
  
 ]

  ngOnInit() {
    let payload={};
    console.log('oninit connection..');
    this.index="undefined";
    this.data.changeClick(this.index)
    this._markers=new Array;
    this.data.changeMarker(this._markers);

    this.data.currMarker.subscribe(marker => this._markers = marker);
    console.log('data service afterfetching call connection..');

     this._options = {
      disableBirdseye: true,
      disableStreetside: true,
      navigationBarMode: 1,
      zoom: 8
    };
    
      this._box2={
      maxLatitude: 29.744260+1,
      maxLongitude: -95.010580+1,
      minLatitude: 29.744260-1,
      minLongitude: -95.010580-1
    }

    this.assetservice.GetMapDetails(payload).subscribe(posts => {
      console.log('post data', posts);
      this.posts=new Array;
      this.posts = posts.data;
      this.specific_asset=false;
      console.log(this.specific_asset);
      console.log(this.posts);
      if(this.posts.length>0){
         this.mapFunction();
      }
      
    });

    // this.assetservice.GetMapDetails2(payload).subscribe(posts => {
    //   console.log('post data', posts);
    //   this.posts=new Array;
    //   this.posts = posts;
    //   console.log(this.posts);
    //   this.mapFunction();
    // });
    // this.posts=this.a;
    // this.mapFunction();

    this.data.currClick.subscribe(index =>{
      this.specific_asset=true;
        this.index = index;
         if (this.index>=0) {
      let _markers = new Array<ILatLong>();
      this.geofence = false;
      this.zone = false;
      this.address = false;
      console.log(this.posts);
      if (this.posts[this.index].GeoFenceState=="IN AUTHORIZED GEOFENCE") {
        this.geofence = true;
        this.desc = this.posts[this.index].Address;
        this.state=this.posts[this.index].GeoFenceState;
      }
      else if (this.posts[this.index].GeoFenceState=="IN RESTRICTED GEOFENCE") {
        this.zone = true;
        this.desc = this.posts[this.index].Address;
        this.state=this.posts[this.index].GeoFenceState;
      }
      else {
        this.address = true;
        this.desc = this.posts[this.index].Address;
        this.state=this.posts[this.index].GeoFenceState;
      }
      this.mark_title = this.posts[this.index].AssetName;
      console.log(this.mark_title);

       this._box = {
      maxLatitude: this.posts[this.index].Latitide+0.2 ,
      maxLongitude: this.posts[this.index].Longitude +0.2 ,
      minLatitude: this.posts[this.index].Latitide-0.2,
      minLongitude: this.posts[this.index].Longitude -0.2 
    };

     
      _markers.push({ latitude: this.posts[this.index].Latitide, longitude: this.posts[this.index].Longitude });
      this.data.changeMarker(_markers);
    }
    } );
   

  }

  sizeToggle() {
    if (this.zoom == "zoom-in") {
      //this.zoom = "zoom-out";
      this.data.changeMessage("zoom-out")
    }
    else if (this.zoom == "zoom-out") {
      //this.zoom = "zoom-in";
      this.data.changeMessage("zoom-in")
    }
  }


  //_markers: Array<ILatLong> = new Array<ILatLong>();


  constructor(private data: MapService,  private assetservice:AssetService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.data.currentMessage.subscribe(zoom => this.zoom = zoom);
  }

  mapFunction() {

console.log("INSIDE MAPFUNCTION");
     this.avglat=0.0;
     this.avglng=0.0;
     this.count=0.0;
    for (let j = 0; j < this.posts.length; j++) {
      console.log(this.posts[j].AssetName)
      this.title.push(this.posts[j].AssetName);
       
      if (this.posts[j].Latitide && this.posts[j].Longitude) {
        this.avglat = this.avglat + this.posts[j].Latitide;
        console.log(this.avglat);
        this.avglng = this.avglng + this.posts[j].Longitude;
        console.log(this.avglng);
        this.count++;
      }
      else {
        continue;
      }
    }
    this.avglat = this.avglat / this.count;
    this.avglng = this.avglng / this.count;

    console.log(this.avglat);
    console.log(this.avglng);

    this._options = {
      disableBirdseye: true,
      disableStreetside: true,
      navigationBarMode: 1,
      zoom: 0
    };

   

    this._box = {
      maxLatitude: this.avglat+1,
      maxLongitude: this.avglng+1,
      minLatitude: this.avglat-1,
      minLongitude: this.avglng-1 
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

    //console.log(posts[0].ts.toGMTString())
    this._markers=new Array;
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].GeoFenceState=="IN RESTRICTED GEOFENCE") {
        this.posts[i].Address = this.posts[i].GeofenceName;
        this.posts[i].zone="-";
      }
      else if (this.posts[i].GeoFenceState=="IN AUTHORIZED GEOFENCE") {
        this.posts[i].Address = this.posts[i].GeofenceName;
        this.posts[i].geofence="-";
      }
      else if (this.posts[i].GeoFenceState=="NOT REACHABLE") {
        this.posts[i].Address = this.posts[i].Address;
      }
      else if(this.posts[i].Address){
           this.posts[i].Address=this.posts[i].Address;
      }
      else if (this.posts[i].Latitide && this.posts[i].Longitude) {
        this.posts[i].Address = "latitude:" + this.posts[i].Latitide.toString() + " " + "longitude" + this.posts[i].Longitude.toString();
      }
      else {
        this.posts[i].Address = "-";
      }
      this._markers.push({ latitude: this.posts[i].Latitide, longitude: this.posts[i].Longitude });
    }
    console.log(this._markers);
    console.log(this._markers.length);
    // if(this._markers.length==0){
    //   this._box=={
    //   maxLatitude: this.lat1+1,
    //   maxLongitude: this.lng1+1,
    //   minLatitude: this.lat1-1,
    //   minLongitude: this.lng1-1 
    // }

    // }
    this.data.changeMarker(this._markers);
    this.hide = true;
      console.log(this.specific_asset);
  }

  onClick = (i) => {
    let _markers = new Array<ILatLong>();
    this.geofence = false;
    this.zone = false;
    this.address = false;
    if (this.posts[i].geofence) {
      this.geofence = true;
    }
    else if (this.posts[i].zone) {
      this.zone = true;
    }
    else {
      this.address = true;
    }
    this.mark_title = this.posts[i].sno;
    console.log(this.mark_title);
    this.desc = this.posts[i].address;
    _markers.push({ latitude: this.posts[i].lat, longitude: this.posts[i].lng });
    this.data.changeMarker(_markers);
  }

showMap(){
        console.log("inside showMap")
        this.show=!this.show;
      
    }
    RefreshPlan(){
      let payload={};
       this.assetservice.GetMapDetails(payload).subscribe(posts => {
      console.log('post data', posts);
      this.posts=new Array;
      this.posts = posts.data;
      this.specific_asset=false;
      console.log(this.specific_asset);
      console.log(this.posts);
      if(this.posts.length>0){
         this.mapFunction();
      }
      
    });
    }



  _click(index: number) {
    console.log(`Marker ${index} says: hello world...`);
  }
}


