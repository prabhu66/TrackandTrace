import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../Services/breadcrumb.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from '../../../Services/asset.service';
import { AssetStatus } from '../../../Interfaces/assetStatus';

@Component({
  selector: 'app-dashboard-people-status',
  templateUrl: './dashboard-people-status.component.html',
  styleUrls: ['./dashboard-people-status.component.css']
})
export class DashboardPeopleStatusComponent implements OnInit {

  public assetList;
  public assetObject: AssetStatus;
  JSONres: any;
  public asset_status;
  showModal: boolean;
  modalAssetName: string;
  modalAssetType: string;
  AssetTemp:number=25.6;
  category:string="People";
  
  
  constructor(
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private assetService: AssetService) {
      this.assetList = [];
      this.showModal=false;
     }

  ngOnInit() {
    this.breadcrumb.curstate.subscribe(asset_status => this.asset_status = asset_status);

    this.assetService.GetAllAssetStatusforDashBoard(this.category)
      .subscribe(res => {
        console.log("people status",res.data);
        
        this.assetList=res.data;
       
      });
  }

  reload() {
    this.assetList = [];
    this.ngOnInit();
  }
  setAssetName(assetId, assetName) {
    this.assetService.assetId = assetId;
    this.assetService.assetName = assetName;
    this.assetService.setAssetName(assetName);
    sessionStorage.setItem('assetName', assetName);
    sessionStorage.setItem('assetId', assetId);
    console.log('inside specific assets');
    this.breadcrumb.changeCurrState(assetName);
    this.router.navigate(['/dashboard/people-specific']);
  }

  setAssetForModal(assetId, assetName,assetType) {
    this.assetService.assetId = assetId;
    this.assetService.assetName = assetName;
    sessionStorage.setItem('assetName', assetName);
    sessionStorage.setItem('assetId', assetId);
    this.modalAssetName = assetName;
    this.modalAssetType = assetType;
    this.showModal = true;
    console.log("showModal",this.showModal);
    
    this.assetService.setAssetName(assetName);
  }

}

