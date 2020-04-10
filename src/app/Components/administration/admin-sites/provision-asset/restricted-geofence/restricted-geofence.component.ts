// <reference path="../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
        BingMapAPILoaderConfig, BingMapAPILoader,
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import {FormControl, Validators} from '@angular/forms';

import { Point } from '../../../../../shared/point';
import { Geofence, FenceType, AreaType } from '../../../../../shared/geofence';
import { MapService } from "../../../../../Services/map.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


declare var jQuery:any;
@Component({
  selector: 'app-restricted-geofence',
  templateUrl: './restricted-geofence.component.html',
  styleUrls: ['./restricted-geofence.component.css']
})
export class RestrictedGeofenceComponent implements AfterViewInit {

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
     AreaType = AreaType;
     accounts;
     accountId;
     accountsName= new Array;
     accSelected;
     tempGeofence=new Geofence;
     status:boolean=false;
     createdBy:string="Davian Carrillo";
     CoordsArr= new Array;
     Coordinates=new Array;
     createdTime;
     polygon:string;
     draw:boolean=true;
     submitted = false;
     geofenceArray=new Array;

  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  public pageTitle: string = "Map";
   infobox;
   constructor(private _dataService: MapService,private snackBar: MatSnackBar,private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { 
      
       this.matIconRegistry.addSvgIcon(
      "edit",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icon/edit.svg")
    );
   }

   ngAfterViewInit(){
     this.status=true;
       this.tempGeofence.areaType = AreaType.Polygon;
       this.load();
       this.CoordsArr= new Array;
   }
   

  private load(): Promise<void> {
       console.log(typeof Microsoft);
        if (this.loadPromise) {
            return this.loadPromise;
        }// after the view completes initializaion, create the map
     if (typeof Microsoft !== 'undefined') {
        console.log(typeof Microsoft);
          this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
              credentials: 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw',
              center: new Microsoft.Maps.Location(12.8370363546,77.657227814),
              zoom:16
          });
          this.geofencesLayer = new Microsoft.Maps.Layer('geofencesLayer');
         this.map.layers.insert(this.geofencesLayer);

        this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
                  visible: false
              });

              //Assign the infobox to a map instance.
          this.infobox.setMap(this.map);

          var center= new Microsoft.Maps.Location(51.50632, -0.12714);
          console.log(center);
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
        }
        
        this.Coordinates.push(this.CoordsArr);
        this.draw=true;
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
    showGeofence(geofence: Geofence): void {
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
           this.draw=false;
           this.CoordsArr= new Array;
           this.Coordinates=new Array;
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
                 let Coords=new Array;
                    console.log(Coords.length);
                    if(Coords.length!=null){
                        Coords.length=null;
                    }
                console.log(event.location);
                this.tempGeofence.fencePolygon.push(event.location);
                console.log("Fence Polygon"+ this.tempGeofence.fencePolygon[0])
                Coords.push(event.location.latitude);
                Coords.push(event.location.longitude);
                console.log("Coords "+Coords);
                this.getArrayCoords(Coords);

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
    getArrayCoords(Coords){
        this.CoordsArr.push(Coords);
        console.log(this.CoordsArr.length);
        console.log("CoordsArr"+this.CoordsArr);
    }
    private showGeofencePolygon(
        geofence: Geofence,
        fillColor,
        strokeColor,
        circularIcon = '/assets/images/circular-geofence-center-green.svg')
        : Microsoft.Maps.Location[] {

        let locations = new Array<Microsoft.Maps.Location>();

        if (geofence.areaType === AreaType.Polygon) {
            for (const p of geofence.fencePolygon) {
                const location = new Microsoft.Maps.Location(p.latitude, p.longitude);
                locations.push(location);
            }
        } else if (geofence.areaType === AreaType.Circular) {
            locations = this.getCirclePolygon(geofence.fenceCenter, geofence.radiusInMeters);

            const pushpin = new Microsoft.Maps.Pushpin(
                new Microsoft.Maps.Location(geofence.fenceCenter.latitude, geofence.fenceCenter.longitude),
                {
                    color: strokeColor,
                    icon: circularIcon,
                    anchor: new Microsoft.Maps.Point(12, 12)
                });
            this.geofencesLayer.add(pushpin);
        }

        const polygon = new Microsoft.Maps.Polygon(locations,
            {
                fillColor: fillColor,
                strokeColor: strokeColor
            });

        this.geofencesLayer.add(polygon);

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
    onSubmit(){

      if(this.status==true){
        
         this.submitted = true;
        console.log(this.tempGeofence.name, this.tempGeofence.areaType);
        console.log(this.Coordinates.length);
        console.log(this.accSelected);
        
         if(this.tempGeofence.name==null){
            //   alert("Please select a geofence name");
              this.snackBar.open('Please select a geofence name', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
         }
        if(this.Coordinates.length==0){
            // alert("Please select a geofence");
            this.snackBar.open('Please select a geofence', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
        }
        else{
            let newGeofence={
               
            name: this.tempGeofence.name,
            createdTime: new Date(),
            geometry:{
                type:this.tempGeofence.areaType,
                coordinates:this.Coordinates
            }
          }
          this._dataService.rest_geofences.push(newGeofence);
            console.log(newGeofence);
               alert("Geofence "+this.tempGeofence.name+"created");

              jQuery('#exampleModalLong3').modal('hide');

        }
       
      }
        
        
       
    }
   
 
}