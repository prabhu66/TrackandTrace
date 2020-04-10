import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import {
  ILatLong
} from 'angular-maps';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class MapService {
  public geofences = new Array;
  public rest_geofences = new Array;
  public ClickIndex:number;
  public geofence;
  geo;
  modalId;
  payload;
  index:any;
  markers: Array<ILatLong> = new Array<ILatLong>();

  private state = new BehaviorSubject('zoom-in');
  currentState = this.state.asObservable();

  changeState(message: string) {
    this.messageSource.next(message)
  }

  private msgSrc = new BehaviorSubject(this.markers);
  currMarker = this.msgSrc.asObservable();

  changeMarker(newMarker: Array<ILatLong>) {
    this.msgSrc.next(newMarker);
  }

  private messageSource = new BehaviorSubject(this.geo);
  currentMessage = this.messageSource.asObservable();

  changeMessage(geo) {
    this.messageSource.next(geo)
  }
  private msg = new BehaviorSubject(this.index);
  currClick = this.msg.asObservable();

  changeClick(newIndex:number){
    console.log("inside change click");
    this.msg.next(newIndex);
  }
}