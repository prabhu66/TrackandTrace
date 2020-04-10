import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})

export class AdminOverviewComponent implements OnInit {
  public array= [{name:'John', Id:'1'},{name:'Satish', Id:'2'}, {name:'Lata', Id:'3'}];
  drop: Array<boolean> = [];
  public subdrop: Array<boolean> = [];
  public ActArray = [];
  public displayList = [];
  public searchText;
  public activities = {
    '10/12/18':[
      {
        ts:'8:50AM',
        actionType:'Assets',
        action:'deleted',
        user:'wipro',
        doer:'george',
        objects:[
          {
            assetId:'1324456',
            assetName:'printer',
            doer:'george'
          },
          {
            assetId:'1324456',
            assetName:'printer',
            doer:'george'
          },
          {
            assetId:'1324456',
            assetName:'printer',
            doer:'george'
          }

        ],
        notes:[]
      },
      {
        ts:'4:50PM',
        actionType:'user',
        action:'added',
        user:'abcd',
        objects:[
          {
            assetId:'1324456',
            assetName:'james'
          }
        ],
        notes:[]
      }
    ]
    ,
    '8/12/18':[
      {
        ts:'8:50AM',
        actionType:'asset',
        action:'deleted',
        user:'abcd',
        objects:[
          {
            assetId:'1324456',
            assetName:'wipro'
          }
        ],
        notes:[]
      }
    ]
  };

 constructor() {
  let evilResponseProps = Object.keys(this.activities);
  // Step 2. Create an empty array.
  // Step 3. Iterate throw all keys.
  _.forEach(evilResponseProps, prop=>{
    this.ActArray.push({date:prop,activity:this.activities[prop]});
  } );
  this.displayList =  this.ActArray;
  console.log(this.activities,evilResponseProps, this.ActArray);
   }

  ngOnInit() {
  }
  public SearchAsset(val){
    this.displayList = [];
    _.forEach(this.ActArray, (asset) => {
      if (asset.name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
        this.ActArray.push(asset);
      }
    });
  }
}
