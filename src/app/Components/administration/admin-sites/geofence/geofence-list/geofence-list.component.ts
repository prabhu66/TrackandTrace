/// <reference path="../../../../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {
    MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
    BingMapAPILoaderConfig, BingMapAPILoader,
    GoogleMapAPILoader, GoogleMapAPILoaderConfig
} from 'angular-maps';

import { Point } from '../../../../../shared/point';
import { Geofence, AreaType } from '../../../../../shared/geofence';
import { MapService } from "../../../../../Services/map.service";
import { AssetService } from "../../../../../Services/asset.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
/* import snackbar */
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-geofence-list',
    templateUrl: './geofence-list.component.html',
    styleUrls: ['./geofence-list.component.css']
})
export class GeofenceListComponent implements AfterViewInit {

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
    private searchManager: Microsoft.Maps.Search.SearchManager;
    loadAPI: Promise<any>;
    tempGeofence = new Geofence();
    highlight: Array<boolean> = [];
    public searchText;
    geofences: any[];
    initialPoints: Point[];
    geofence;
    public currLat = 0.0;
    public currLng = 0.0;
    CoordsArr = new Array;
    Coordinates = new Array;
    show: boolean = true;
    draw: boolean = true;
    public create: boolean = false;
    retrievedGeofences: any[];
    selectedGeofence;
    filter: string;
    address: string = "";
    click: any;
    display:'none';
    searchResult;
    public edit: boolean = false;
    public geofenceEdit;
    public geofence_id;
    public lat;
    public lng;
    public loader: boolean = false;
    /* AKshay Modification */
    selectedGeofenceDel:any;
    busy:boolean;
    @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
    @ViewChild('closedelModal') closedelModal;
    public pageTitle: string = "Map";
    infobox;



    constructor(public _dataService: MapService, private _assetService: AssetService, private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
        private snackBar:MatSnackBar) {

        this.matIconRegistry.addSvgIcon(
            "cancel",
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/cancel.svg')
        );
    }

    ngAfterViewInit() {
        this.busy = true;
        this.tempGeofence.areaType = AreaType.Polygon;
        console.log("inside asset list" + this._dataService.geofence);
        // this.geofence=this._dataService.geofence;
        this._assetService.GetGeofenceList().subscribe(res => {
            this._dataService.geofence = res;
            console.log('res123456789',res);
        });
        console.log(this.geofence);
        this.highlight.fill(false);
        this.mapOnInit();
    }

    mapOnInit() {
        this._assetService.load().then(() => {

            this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
                credentials: 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw',
                center: new Microsoft.Maps.Location(this.currLat, this.currLng),
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                zoom: 1
            });

            if (!this.searchManager) {
                Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
                    this.searchManager = new Microsoft.Maps.Search.SearchManager(this.map);
                });
            }

            this.geofencesLayer = new Microsoft.Maps.Layer('geofencesLayer');
            this.map.layers.insert(this.geofencesLayer);

            this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
                visible: false
            });

            //Assign the infobox to a map instance.
            this.infobox.setMap(this.map);
            Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
                var options = {
                    maxResults: 6,
                    map: this.map
                };
                var manager = new Microsoft.Maps.AutosuggestManager(options);
                manager.attachAutosuggest('#searchBox', '#searchBoxContainer', this.selectedSuggestion);
            });
            // var center= new Microsoft.Maps.Location(51.50632, -0.12714);
            // console.log(center);
            Microsoft.Maps.Events.addHandler(this.map, 'click', e => {
                const event = e as Microsoft.Maps.IMouseEventArgs;
                console.log(event.location);
            });

        });
        this.busy = false;
    }



    selectedSuggestion = (suggestionResult) => {
        // this.searchText=suggestionResult;
        console.log(suggestionResult);
        console.log(this.map)
        this.map.entities.clear();
        this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
            credentials: 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw',
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            //   center: new Microsoft.Maps.Location(suggestionResult.location.latitude, suggestionResult.location.longitude),
            //   zoom:13
        });
        console.log(this.map)
        this.searchResult = suggestionResult;
        this.searchText = suggestionResult.formattedSuggestion;
        this.map.setView({ bounds: suggestionResult.bestView });
        this.highlight.fill(false);
        this.geofencesLayer = new Microsoft.Maps.Layer('geofencesLayer');
        this.map.layers.insert(this.geofencesLayer);
        this.infobox.setMap(this.map);

        Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
            var options = {
                maxResults: 6,
                map: this.map
            };
            var manager = new Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest('#searchBox', '#searchBoxContainer', this.selectedSuggestion);
        });

    }



    endCurrentDraw(): void {
        if (this.drawHandlerId) {
            Microsoft.Maps.Events.removeHandler(this.drawHandlerId);
            this.drawHandlerId = null;
            console.log(this.drawHandlerId);
        }
        this.CoordsArr.push(this.CoordsArr[0]);
        this.lat = this.CoordsArr[0][0];
        this.lng = this.CoordsArr[0][1];
        console.log("lat:" + this.lat, "lng:" + this.lng)
        this.Coordinates.push(this.CoordsArr);
        this.draw = true;
    }

    centerMapCoordinates(lat, lng) {
        console.log(lat, lng);
        this.map.setView({
            center: new Microsoft.Maps.Location(
                lat,
                lng
            ),
            zoom: 1
        });
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

    private centerMapOnMean(points: Point[], geofence: any) {
        var Array = [];
        if (points.length) {
            let centerLat = 0;
            let centerLong = 0;
            points.forEach(function (p) {
                centerLat += p.latitude;
                centerLong += p.longitude;
                Array.push(new Microsoft.Maps.Location(p.latitude, p.longitude))
            });

            centerLat /= points.length;
            centerLong /= points.length;

            var r = Microsoft.Maps.LocationRect.fromLocations(Array);

            this.map.setView({
                center: new Microsoft.Maps.Location(
                    centerLat,
                    centerLong
                ),
                zoom: 13
            });
            var maxLat = centerLat + 1;
            var minLat = centerLat - 1;
            var maxLong = centerLong + 1;
            var minLong = centerLong - 1;


            //    let box=new Microsoft.Maps.LocationRect(maxLat,minLong,minLat,maxLong);
            //    var rect = new Microsoft.Maps.LocationRect(mapRect.location, mapRect.height, mapRect.width);


            //    var map=new Microsoft.Maps.Map(this.myMap.nativeElement, {
            //    credentials:"Your bing map developer key",
            //    bounds: box
            //     });

            this.map.setView({ bounds: r });
        }
    }
    private resetMap() {
        this.geofencesLayer.setVisible(false);
    }
    showMap() {
        console.log("inside showMap")
        this.show = !this.show;
        this._assetService.load().then(() => {
            this.geofencesLayer.setVisible(true);

        });
    }
    showGeofence(i, geofence): void {

        this.highlight.fill(false);
        this.highlight[i] = !this.highlight[i]
        this.selectedGeofence = geofence;
        console.log("inside show geofence" + geofence)
        this._assetService.load().then(() => {
            this.resetMap();
            this.geofencesLayer.setVisible(true);
            this.geofencesLayer.clear();

            const polygonLocations = this.showGeofencePolygon(geofence, this.geofenceGreenBlue, this.genericColors[0]);
            console.log("polygon", polygonLocations, geofence);

            this.centerMapOnMean(polygonLocations, geofence);
        });


    }

    private showGeofencePolygon(
        geofence,
        fillColor,
        strokeColor,
        circularIcon = '/assets/images/circular-geofence-center-green.svg')
        : Microsoft.Maps.Location[] {

        let locations = new Array<Microsoft.Maps.Location>();

        let coords = geofence.geofences[0].geometry.coordinates[0];
        for (let j = 0; j < coords.length; j++) {
            console.log(coords[j][0]);
            let lat = coords[j][0];
            console.log(coords[j][1])
            let lng = coords[j][1];
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

    drawPolygonGeofence(initialPoints: Point[]) {
        this._assetService.load().then(() => {
            this.draw = false;
            this.CoordsArr = new Array;
            this.Coordinates = new Array;

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
                let Coords = new Array;
                console.log(Coords.length);
                if (Coords.length != null) {
                    Coords.length = null;
                }
                console.log(event.location);
                this.tempGeofence.fencePolygon.push(event.location);
                console.log("Fence Polygon" + this.tempGeofence.fencePolygon[0])
                Coords.push(event.location.latitude);
                Coords.push(event.location.longitude);
                console.log("Coords " + Coords);
                this.getArrayCoords(Coords);

                this.geofencesLayer.clear();
                if (this.tempGeofence.fencePolygon.length > 1) {
                    this.showGeofencePolygonEdit(this.tempGeofence, this.geofencePink, this.genericColors[4]);

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
    getArrayCoords(Coords) {
        this.CoordsArr.push(Coords);
        console.log(this.CoordsArr.length);
        console.log("CoordsArr" + this.CoordsArr);
    }
    private showGeofencePolygonEdit(
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

    editGeofence(geofence, i) {
        console.log("geofence from edit", geofence);

        this.create = false;
        this.edit = true;
        this.geofence_id = this._dataService.geofence[i].geofenceInfo._id;
        console.log(this._dataService.geofence[i].geofenceInfo);
        this.tempGeofence.name = this._dataService.geofence[i].geofenceInfo.name;
        this.searchResult = this._dataService.geofence[i].geofenceInfo.searchResult;
        this.showGeofence(i, this._dataService.geofence[i].geofenceInfo);
        this.geofenceEdit = this._dataService.geofence[i].geofenceInfo.geofences[0].geometry;
        console.log(this.geofenceEdit)
        this.Coordinates = new Array;
    }
    onCreate = () => {

        this.edit = false;
        this.create = true;
        this.tempGeofence.name = "";
        if (this.searchResult == null) {
            this.highlight.fill(false);
            this.mapOnInit();
        }
        else {
            this.resetMap();
            this.map.entities.clear();
            this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
                credentials: 'Avh43rwIxMpHSkLOHeo7MeaFNwaQgk8BsehjzGxYxscXNvi6VH_VlUnX_MHAyFzw',
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                // center: new Microsoft.Maps.Location(this.searchResult.location.latitude, this.searchResult.location.longitude),
                // zoom:13
            });
            console.log(this.map)
            this.map.setView({ bounds: this.searchResult.bestView });
            this.highlight.fill(false);
            this.geofencesLayer = new Microsoft.Maps.Layer('geofencesLayer');
            this.map.layers.insert(this.geofencesLayer);

            Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
                var options = {
                    maxResults: 6,
                    map: this.map
                };
                var manager = new Microsoft.Maps.AutosuggestManager(options);
                manager.attachAutosuggest('#searchBox', '#searchBoxContainer', this.selectedSuggestion);
            });
        }

        console.log(this.create);
        console.log(this.edit);
    }
    /* modified by akshay */
    setGeofence(geofence,i){
        this.selectedGeofenceDel = geofence;
    }
    deleteGeofence = () => {
        this.create = false;
        this.edit = false;
        this.loader = true;
        let arr = new Array;
        let payload = {
            id: this.selectedGeofenceDel.name
        }
        this.closedelModal.nativeElement.click();
         this.busy = true;
        this._assetService.DeleteGeofence(payload).subscribe(res => {
            this.snackBar.open('Geofence successfully deleted..!!', "Ok", {duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
            this.loader = false;
            this.geofencesLayer.clear();
            this.display='none';
            
            
            this._assetService.GetGeofenceList().subscribe(res => {
                console.log(res);
                this._dataService.geofence = res;
                /* akshay modification, refresh map after delete */
                this._assetService.load().then(() => {
                    this.resetMap();
                });
                this.RefreshPlan();
            });
        },
        
            error => {
                let JSONres = JSON.parse(error['status']);
                console.log(JSONres);
                if (JSONres == 400) {
                    this.snackBar.open("Asset Associated Geofence can't be deleted", "Ok", {duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                    this._assetService.GetGeofenceList().subscribe(res => {
                        console.log(JSON.parse(res));
                        this._dataService.geofence = res;
                    });
                    this._assetService.load().then(() => {
                        this.resetMap();
                    });
                }
            })
            this.busy = false;

    }
    RefreshPlan() {
        this._dataService.geofence = [];
        this.tempGeofence.areaType = AreaType.Polygon;
        console.log("inside asset list" + this._dataService.geofence);
        // this.geofence=this._dataService.geofence;
        this._assetService.GetGeofenceList().subscribe(res => {
            console.log(res);
           // this._dataService.geofence = res.data;
           this._dataService.geofence = res;
        });
        console.log(this.geofence);
        this.highlight.fill(false);
        //this.address="Keonics Electronic City, Bangalore";
        this.mapOnInit();
    }

    onClick = (event) => {
        this.value = event.currentTarget.id;
    }
    onClose = () => {
        if (this.edit == true) {
            this.edit = false;
        }
        else {
            this.create = false;
        }
        this.resetMap();
        this.highlight.fill(false);

    }

    onSave = () => {
        if (this.edit == true) {
            this.loader = true;
            if (this.CoordsArr.length >= 1) {
                let array_of_geofence = new Array;
                let newGeofence = {
                    name: this.tempGeofence.name,
                    createdTime: new Date(),
                    geometry: {
                        type: this.tempGeofence.areaType,
                        coordinates: this.Coordinates
                    }
                }
                array_of_geofence.push(newGeofence)
                let newObject = {
                    //   _id:this.geofence_id,
                    name: this.tempGeofence.name,
                    lat: this.lat,
                    lng: this.lng,
                    address: this.address,
                    searchResult: this.searchResult,
                    geofences: array_of_geofence
                }
                console.log(newObject);

                this._assetService.createGeofence(JSON.stringify(newObject)).subscribe(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.snackBar.open("Geofence " + this.tempGeofence.name + " edited", "Ok", {duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                        //alert("Geofence " + this.tempGeofence.name + " edited");
                        this.loader = false;
                    }
                    this._assetService.GetGeofenceList().subscribe(res => {
                        console.log(JSON.parse(res));
                       // this._dataService.geofence = res.data;
                       this._dataService.geofence = res;
                    });
                });

                this.Coordinates = new Array;

            }
            else {
                this.loader = true;
                console.log(this.geofenceEdit)
                let array_of_geofence = new Array;
                let newGeofence = {
                    name: this.tempGeofence.name,
                    createdTime: new Date(),
                    geometry: this.geofenceEdit
                }
                array_of_geofence.push(newGeofence)
                let newObject = {
                    //   _id:this.geofence_id,
                    name: this.tempGeofence.name,
                    lat: this.lat,
                    lng: this.lng,
                    address: this.address,
                    searchResult: this.searchResult,
                    geofences: array_of_geofence
                }
                console.log(newObject);

                this._assetService.createGeofence(JSON.stringify(newObject)).subscribe(res => {
                    console.log(res);
                    if (res.status == 200) {
                       // alert("Geofence " + this.tempGeofence.name + " edited");
                        this.snackBar.open("Geofence " + this.tempGeofence.name + " edited", "Ok", {duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                        this.loader = false;
                        this._assetService.GetGeofenceList().subscribe(res => {
                            console.log(JSON.parse(res));
                            //this._dataService.geofence = res.data;
                            this._dataService.geofence = res;
                        });
                    }

                });

            }
            this.edit = false;
        }

        if (this.create == true) {
            this.loader = true;
            console.log(this.tempGeofence.name, this.tempGeofence.areaType);
            console.log(this.Coordinates.length);
            if (this.tempGeofence.name == null) {
                // alert("Please select a geofence name");
                this.snackBar.open("Please select a geofence name", 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                return;
            }

            if (this.Coordinates.length == 0) {
                // alert("Please select a geofence");
                this.snackBar.open("Please select a geofence", 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                return;
            }
            else {
                let array_of_geofence = new Array;
                let newGeofence = {
                    name: this.tempGeofence.name,
                    createdTime: new Date(),
                    geometry: {
                        type: this.tempGeofence.areaType,
                        coordinates: this.Coordinates
                    }
                }
                array_of_geofence.push(newGeofence)
                let newObject = {
                    name: this.tempGeofence.name,
                    lat: this.lat,
                    lng: this.lng,
                    address: this.address,
                    searchResult: this.searchResult,
                    geofences: array_of_geofence
                }
                this._assetService.createGeofence(newObject).subscribe(res => {
                    console.log(res.status);
                    if (res.status == 200) {
                        // alert("Geofence " + this.tempGeofence.name + " created");
                        this.snackBar.open("Geofence " + this.tempGeofence.name + " created", 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                        this.loader = false;
                        this._assetService.GetGeofenceList().subscribe(res => {
                           // console.log(JSON.parse(res));
                            //this._dataService.geofence = res.data;
                            this._dataService.geofence = res;
                        });
                    }
                });

            }

            this.create = false;

        }

    }
}
