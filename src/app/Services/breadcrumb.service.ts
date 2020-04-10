import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
public subheader;
public asset_status;
public accountSelected;

  private msgsrc = new BehaviorSubject('Status');
  curstate = this.msgsrc.asObservable();

  constructor() { }


 changeCurrState(message: string) {
    this.msgsrc.next(message);
}

private selected = new BehaviorSubject('Executive');
curSelected = this.selected.asObservable();

changeCurrSelection(message: any) {
this.selected.next(message);
}
}

