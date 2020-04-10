

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
        BingMapAPILoaderConfig, BingMapAPILoader,
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

import { Point } from '../../../../../shared/point';
import { Geofence, AreaType } from '../../../../../shared/geofence';
import { MapService } from "../../../../../Services/map.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-asset-geofence-list',
  templateUrl: './asset-geofence-list.component.html',
  styleUrls: ['./asset-geofence-list.component.css']
})
export class AssetGeofenceListComponent  implements AfterViewInit {

   value;
    private readonly genericColors = ['#56A6B6', '#464E50', '#56B691', '#BF8B8A', '#E95794'];
    private readonly tripColors = ['#000CCC', '#CC0200', '#73CC15', '#00EAFF'];
    private readonly yellowSpeed = 4.4;
    private readonly greenSpeed = 13.4;
    private readonly geofenceGreenBlue = 'rgba(86,182,145,0.4)';
    private readonly geofencePink = 'rgba(233,87,148,0.4)';
    private drawHandlerId;
    private map: Microsoft.Maps.Map;
    private geofencesLayer: Microsoft.Maps.Layer;
    private loadPromise: Promise<void>;
    private tempGeofence = new Geofence();
    geofences:any[];
    initialPoints: Point[];
    geofence;
    accName;
    retrievedGeofences: any[];
    selectedGeofence;
    filter:string;

   
   
  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  public pageTitle: string = "Map";
   infobox;

   constructor(private _dataService: MapService,private router: Router,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer) { 
     this.matIconRegistry.addSvgIcon(
      "cancel",
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/cancel.svg')
    );
   }

   ngAfterViewInit(){
        
        console.log("inside asset list"+this._dataService.geofence);
        this.geofence=this._dataService.geofence;
        console.log(this.geofence);
        
        this._dataService.currentMessage.subscribe(
           geofence=>{
               this.geofence=geofence;
               this.load();
             if(this.geofence){
          this.showGeofence(this.geofence);
           }}
        );
       
        }
   
  private load(): Promise<void> {
        if (this.loadPromise) {
            return this.loadPromise;
        }// after the view completes initializaion, create the map
        
     if (typeof Microsoft !== 'undefined') {
          this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
              credentials: 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw',
              //center: new Microsoft.Maps.Location(51.50632, -0.12714),
              zoom:16
          });

          this.geofencesLayer = new Microsoft.Maps.Layer('geofencesLayer');
          this.map.layers.insert(this.geofencesLayer);

          this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
                  visible: false
              });

              //Assign the infobox to a map instance.
          this.infobox.setMap(this.map);

         // var center= new Microsoft.Maps.Location(51.50632, -0.12714);
         // console.log(center);
          Microsoft.Maps.Events.addHandler(this.map, 'click', e => {
          const event = e as Microsoft.Maps.IMouseEventArgs;
          console.log(event.location);
          });
       
        }
         this.loadPromise = new Promise(function(resolve, reject) {
                     resolve();
                  reject(new Error("…")); 
         });        
        return this.loadPromise;
  }
   endCurrentDraw(): void {
        if (this.drawHandlerId) {
            Microsoft.Maps.Events.removeHandler(this.drawHandlerId);
            this.drawHandlerId = null;
            console.log(this.drawHandlerId);
            if(this.tempGeofence.fencePolygon!==null){
                console.log(this.tempGeofence.fencePolygon);
            }
        }
    }
 centerMap(point: Point, zoom = null) {
        if (point) {
            this.map.setView({
                center: new Microsoft.Maps.Location(
                    point.latitude,
                    point.longitude
                ),
                zoom: zoom
            });
        }
    }
    private centerMapOnMedian(points: Point[]) {
        if (points.length) {
            points.sort(function (x, y) {
                return x.longitude - y.longitude;
            });
            const mid = Math.floor(points.length / 2);
            this.map.setView({
                center: new Microsoft.Maps.Location(
                    points[mid].latitude,
                    points[mid].longitude
                )
                
            });
        }
    }

    private centerMapOnMean(points: Point[]) {
        if (points.length) {
            let centerLat = 0;
            let centerLong = 0;
            points.forEach(function (p) {
                centerLat += p.latitude;
                centerLong += p.longitude;
            });

            centerLat /= points.length;
            centerLong /= points.length;

            this.map.setView({
                center: new Microsoft.Maps.Location(
                    centerLat,
                    centerLong
                )
            });
        }
    }
    private resetMap() {
        this.geofencesLayer.setVisible(false);
    }
    showGeofence(geofence): void {
        console.log("inside show geofence"+geofence)
         this.load().then(() => {
            this.resetMap();
            this.geofencesLayer.setVisible(true);
            this.geofencesLayer.clear();

            const polygonLocations = this.showGeofencePolygon(geofence, this.geofenceGreenBlue, this.genericColors[0]);

            this.centerMapOnMean(polygonLocations);
        });
    
        
    }
    drawPolygonGeofence( initialPoints: Point[]) {
        this.load().then(() => {
             this.tempGeofence.fencePolygon = initialPoints || new Array<Point>();
             this.tempGeofence.areaType = AreaType.Polygon;


            this.resetMap();
            this.geofencesLayer.setVisible(true);
            this.geofencesLayer.clear();

            // Draw initial geofence area value if it exists
            if (initialPoints && initialPoints.length > 1) {
                this.showGeofencePolygon(this.tempGeofence, this.geofenceGreenBlue, this.genericColors[0]);
            }

            // If new point added, update temp geofence and redraw
            this.drawHandlerId = Microsoft.Maps.Events.addHandler(this.map, 'click', e => {
                const event = e as Microsoft.Maps.IMouseEventArgs;
                this.tempGeofence.fencePolygon.push(event.location);
                console.log( "fence Polygon"+this.tempGeofence.fencePolygon);

                this.geofencesLayer.clear();
                if (this.tempGeofence.fencePolygon.length > 1) {
                    this.showGeofencePolygon(this.tempGeofence, this.geofencePink, this.genericColors[4]);
                } else {
                    const pushpin = new Microsoft.Maps.Pushpin(event.location, {
                        color: this.genericColors[4]
                    });
                    this.geofencesLayer.add(pushpin);
                }
         }
            );
        });
    }
    private showGeofencePolygon(
        geofence,
        fillColor,
        strokeColor,
        circularIcon = '/assets/images/circular-geofence-center-green.svg')
        : Microsoft.Maps.Location[] {

        let locations = new Array<Microsoft.Maps.Location>();

            let coords= geofence.geometry.coordinates[0];
               for(let j=0;j<coords.length;j++){
                   console.log(coords[j][0]);
                   let lat=coords[j][0];
                   console.log(coords[j][1]) 
                   let lng=coords[j][1];
                   const location = new Microsoft.Maps.Location(lat, lng);
                   locations.push(location);
                  
            }
        

        const polygon = new Microsoft.Maps.Polygon(locations,
            {
                fillColor: fillColor,
                strokeColor: strokeColor
            });

        this.geofencesLayer.add(polygon);
         console.log(locations);
        return locations;
    }

    private getCirclePolygon(center: Point, radiusInMeters): Microsoft.Maps.Location[] {
        const earthRadiusInMeters = 6371000;
        const radPerDeg = Math.PI / 180;
        const locs = new Array<Microsoft.Maps.Location>();

        if (!radiusInMeters || radiusInMeters <= 0 || radiusInMeters > earthRadiusInMeters / 2) {
            return locs;
        }

        const lat = center.latitude * radPerDeg;
        const lon = center.longitude * radPerDeg;

        const angDist = parseFloat(radiusInMeters) / earthRadiusInMeters;

        for (let i = 0; i <= 360; i++) {
            let pLatitude, pLongitude;
            const brng = i * radPerDeg;

            pLatitude = Math.asin(Math.sin(lat) * Math.cos(angDist) +
                Math.cos(lat) * Math.sin(angDist) * Math.cos(brng));

            pLongitude = lon + Math.atan2(Math.sin(brng) * Math.sin(angDist) * Math.cos(lat),
                Math.cos(angDist) - Math.sin(lat) * Math.sin(pLatitude));

            pLatitude = pLatitude / radPerDeg;
            pLongitude = pLongitude / radPerDeg;

            locs.push(new Microsoft.Maps.Location(pLatitude, pLongitude));
        }

        return locs;
    }
    
    deleteGeofence(geofence,i){
        let arr =new Array;
       
           if(geofence.name===this._dataService.geofences[i].name){
               this._dataService.geofences.splice(i, 1);
            
           
       }
       this.load().then(() => {
       this.resetMap();
    });
    }

    onClick(event){
     this.value=event.currentTarget.id;
    }
    //  createAsset(){
    //      console.log(this._dataService.assetSno)
    //       let newAsset={
    //             _c: {
    //         sno: this._dataService.assetSno
    //       },
    //       _o: {
    //         sno: this._dataService.assetSno,
    //         tagSno:this._dataService.tagSno,
    //         trackerSno:this._dataService.trackerSno,
    //         assetType:this._dataService.assetType,
    //         category:this._dataService.categories,
    //         geofences:this._dataService.geofences
    //       }
           
    //       }
    //        console.log(newAsset);
    //         this._dataService.postUpdateAssetData(newAsset).subscribe(posts => {
    //         console.log("adding one value");
    //         console.log(posts);
    //       });
    //      this.router.navigate(['assets'])
     
     
    // }
 
}
