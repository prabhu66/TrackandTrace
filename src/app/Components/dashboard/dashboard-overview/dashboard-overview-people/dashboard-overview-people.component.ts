import { Component, OnInit } from '@angular/core';
import { AssetService  } from 'src/app/Services/asset.service'

@Component({
  selector: 'app-dashboard-overview-people',
  templateUrl: './dashboard-overview-people.component.html',
  styleUrls: ['./dashboard-overview-people.component.css']
})
export class DashboardOverviewPeopleComponent implements OnInit {

  // public peopleData = 
  //   [
  //   {type: 'Supervisor', image: '../../../../assets/image/manager-1.svg', total: 10, OnDuty: 5, OffDuty: 5},
  //   {type: 'Plumber', image: '../../../../assets/image/plumber-working.svg', total: 14, OnDuty: 6, OffDuty: 8},
  //   {type: 'Attendant', image: '../../../../assets/image/clerk.svg', total: 7, OnDuty: 5, OffDuty: 2},
  //   {type: 'Machine operator', image: '../../../../assets/image/worker.svg', total: 11, OnDuty: 5, OffDuty: 6},
  //   {type: 'Store Keeper', image: '../../../../assets/image/store.svg', total: 9, OnDuty: 5, OffDuty: 4},
  // ]
  public peopleData;
  public category="People";
  constructor( private _assetservice:AssetService) {
    this._assetservice.getUtilizationDataPeople()
    .subscribe(res=>{
      this.peopleData = res.data;
      
    });
   }

  ngOnInit() {
  }

}
