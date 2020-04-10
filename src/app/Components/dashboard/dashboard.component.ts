import { Component,OnInit } from '@angular/core';
import { BreadcrumbService } from '../../Services/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
 public asset_status;
 public selected="Executive";
  accSelected="0";
  accounts: any;
  click: any;
 constructor( public breadcrumb: BreadcrumbService) { }

 ngOnInit() {
    this.breadcrumb.subheader="Executive";
    if(this.breadcrumb.subheader=="Asset"){
      this.breadcrumb.asset_status="Status";
    }
    this.breadcrumb.curstate.subscribe(asset_status=>this.asset_status=asset_status);
    this.breadcrumb.curSelected.subscribe(selection=>this.selected=selection);
  }
  onClick=(event)=>{
    console.log( "event is "+event.currentTarget.id);
    this.breadcrumb.subheader=event.currentTarget.id;
    if(this.breadcrumb.subheader=="Asset"){
      this.breadcrumb.changeCurrState("");
    }
    this.selected=event.currentTarget.id;
     //this.breadcrumb.changeCurrState(this.subheader);
   }
   filterForeCasts(filterVal: any) {
  console.log(filterVal);
  console.log(this.accSelected);
  this.breadcrumb.accountSelected=this.accSelected;
  
}
}
