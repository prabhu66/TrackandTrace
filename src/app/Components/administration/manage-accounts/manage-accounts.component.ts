import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AssetService  } from 'src/app/Services/asset.service'

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {

 public displayList;
 public search;
 click: any;

 public  a = [{
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
     name:'Wipro',
    customer_name:'Math Stephan',
    status:'DELETED',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'SUSPENDED',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
   name:'Wipro',
    customer_name:'Math Stephan',
    status:'DISABLED',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'

  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  },
  {
    name:'Wipro',
    customer_name:'Math Stephan',
    status:'ACTIVE',
    sites:'3',
    assets:'3',
    devices:'3',
    users:'3',
    start_date:'31-01-2019'
  }
 ]

  constructor(private _assetservice:AssetService) { 
     this._assetservice.GetAccountList()
    .subscribe(res=>{
      console.log('res from account',res);
      this.displayList=res;
    })
  }

  ngOnInit() {
    // this.displayList = this.a;
  }

onDelete(i){
  this.displayList.splice(i,1);
}
}
