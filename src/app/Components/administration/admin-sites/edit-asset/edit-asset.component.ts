import { Component, OnInit } from '@angular/core';

import { MapService } from '../../../../Services/map.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssetService } from 'src/app/Services/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

// Added By ABhishek
import { AppSetting } from '../../../constants/AppSetting';
import { ISasToken } from '../provision-asset/azure-storage/azureStorage';
import { BlobStorageService } from '../provision-asset/azure-storage/blob-storage.service';
import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
// Abhishek Declaration ENds Here

interface IUploadProgress {
  filename: string;
  progress: number;
}

export interface Facility {
  FacilityId: string;
  FacilityName: string;
  ZoneId: string;
  ZoneName: string;
}

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {
//  @VeiwChild('zonecheckbox')
//  zonecheck:ElementRef;
  subList1: Array<boolean> = [];
  subList2: Array<boolean> = [];
  geofences = new Array;
  rest_geofence = new Array;
   facilities = new Array;
  geofence;
  // drop1:boolean;
  drop2: boolean;
  drop3: boolean;
  drop4: boolean;
  drop5: boolean;
  drop6: boolean;
  GPSTracker: string="";
  zones1 = new Array;
  zones2 = new Array;
  save_zone_object = new Array();
  array_of_param = new Array;
  monitor_params: string[] = ['shock', 'Temperature', 'humidity'];
  mon_param;
  public asset_categories:string[]=['Indoor Only','Outdoor Only', 'Indoor and Outdoor'];
  public assetCategory:string ="Indoor Only";
  public assetType="People";
  public people:string[]=["Janitor","WorkerStaff","Electrician","Engineer","Software Developers"];
  public products:string[]=['Swings','Laptops','Printer'];
  public product_type;
  public product_names;
  public product_name;
  public asset_name;
  public asset_id;
  public assetBleTag:string="";
  public array_of_ble=new Array;
  public array_of_gps= new Array;
  accessible_facility: Array<Facility> = [];
  res_facility: Array<Facility> = [];
  public demo_facility = {
    FacilityId: '',
    FacilityName: '',
    ZoneId: '',
    ZoneName: ''
  };

    public demo_facility2 = {
    FacilityId: '',
    FacilityName: '',
    ZoneId: '',
    ZoneName: ''
  };
 
  submitted = false;

  
  // Asset Image Related Variables
  fileInfo: any;
  uploadProgress$: Observable<IUploadProgress[]>;
  filesSelected = false;
  fileName: String;
  blobAccessUrl = AppSetting.blobAccessUrl;
  fileUploadProgress: number;
  showLoader: boolean;
  showUploadComplete: boolean;
  imageRefUrl = '';
  showImageUploaded: boolean;
  assetDetails:any;
  public drop1 = false;
  public i=0;
  public j=0;
  public m=0;
  public arr = [];
  constructor(
    private fb: FormBuilder,
    private _dataService: MapService,
     private _assetservice: AssetService,
     private router: Router,
     private blobStorage: BlobStorageService,
     private snackBar: MatSnackBar,
     ) { 
       this.showImageUploaded = false;
     }


  // Upload Asset Image Section Here =================================================
  onFileChange(event: any): void {
    this.showLoader = true;
    this.showUploadComplete = false;
    this.filesSelected = true;

    this.uploadProgress$ = from(event.target.files as FileList).pipe(
      map(file => this.uploadFile(file)), // Getting FIle Details HEre
      combineAll()
    );


  }

  uploadFile(file: File): Observable<IUploadProgress> {
    this.fileName = file.name;

    const accessToken: ISasToken = {
      container: 'assetimages',
      filename: file.name,
      storageAccessToken: AppSetting.SAS_Token,
      // tslint:disable-next-line:max-line-length
      // storageUri: 'https://titanstorageaccnt.blob.core.windows.net/' + AppSetting.SAS_Token,
      storageUri: AppSetting.storageLink + AppSetting.SAS_Token,
     // Add SAS Token After .net/ --> If the token Expires in Future
    };

    this.imageRefUrl = this.blobAccessUrl + this.fileName;
    console.log(this.imageRefUrl);
    // console.log(accessToken.storageUri);
    return this.blobStorage
      .uploadToBlobStorage(accessToken, file)
      .pipe(map(progress => this.mapProgress(file, progress)));
  }

  private mapProgress(file: File, progress: number): IUploadProgress {
    console.log(progress);

       if (progress === 100) {
         this.showLoader = false;
         this.showUploadComplete = true;
         this.filesSelected = false;
         this.showImageUploaded = true;
       }
       console.log(progress);
       return {
         filename: file.name,
         progress: progress
       };
      
     }

  // Upload Asset Image Section ENds Here =============================================

  ngOnInit() {
    // this.form = this.fb.group({
    //   asset_type: ['', Validators.required],
    //   asset_name: ['', Validators.required],
    //   asset_id: ['', Validators.required],
    //   asset_category: ['', Validators.required],
    //   assetBleTag: ['', Validators.required],
    //   GPS_Tracker: ['', Validators.required],
    // });

    this.assetDetails= this._assetservice.editAsset;
    console.log(this.assetDetails);

    this.asset_name=this.assetDetails.AssetName;
    this.product_type= this.assetDetails.AssetType;
    this.asset_id=this.assetDetails.AssetSerialNo;
    this.GPSTracker=this.assetDetails.AssetTrackerNo;
    this.assetBleTag = this.assetDetails.AssetTagSerialNo;
    this.accessible_facility = this.assetDetails.AccessibleZones;
    console.log(this.accessible_facility);
    
    this.res_facility = this.assetDetails.RestrictedZones;
    this.geofences = this.assetDetails.AccessibleGeofence;
    this.rest_geofence = this.assetDetails.RestrictedGeofence;
    this.imageRefUrl = this.assetDetails.AssetImageUrl;
    this.assetType = this .assetDetails.AssetCategory;
    this.assetCategory = this.assetDetails.TrackMode;
   
    if(this.imageRefUrl){
      this.showImageUploaded=true;
    }


  
    
    this._dataService.modalId = '#exampleModalLong';
    this._assetservice.GetGeofenceList().subscribe(res=>{
           console.log(JSON.parse(res));
            this._dataService.geofences=JSON.parse(res).res;
            this._dataService.rest_geofences=JSON.parse(res).res;
          });
    this._assetservice.GetFacilityList()
      .subscribe(res => {
        console.log('res from facility', res);
        this.facilities = res;
        console.log(this.facilities);
        for (let i = 0; i < this.facilities.length; i++) {
          this.subList1.push(false);
          this.subList2.push(false);
          console.log(this.facilities[i].FacilityName)
          this._assetservice.GetZonebyFacility(this.facilities[i].FacilityName)
          .subscribe(res => {
            console.log( res);
            this.arr[this.facilities[i].FacilityName]=res;
            console.log(this.arr);
          });
        }
      });
      this._assetservice.GetTaglist().subscribe(res=>{
        console.log('res from tag',res)
        for(let i=0;i<res.length;i++){
            this.array_of_ble.push(res[i].deviceSerialNo);
        }
        
      })
       this._assetservice.GetTrackerList().subscribe(res=>{
        console.log('res from tracker',res)
        for(let i=0;i<res.length;i++){
            this.array_of_gps.push(res[i].deviceSerialNo);
        }
        
      })

    this._dataService.currentMessage.subscribe(geofence => this.geofence = geofence);
  }
 

  onClick1(value, i) {
    // this.subList.fill(false);
    this.subList1[i] = !this.subList1[i];
    let zonecheckbox  = document.getElementsByName('zonecheck')
    console.log((zonecheckbox));
    for (let i = 0; i < zonecheckbox.length; i++) {
      var item = zonecheckbox[i];
      console.log(item);
      
    }
    
  
  }

  
    onClick2(value, i) {
    // this.subList.fill(false);
    this.subList2[i] = !this.subList2[i];

  }

  onSelect(value) {
    console.log(value);
    this.array_of_param.push(value);
  }
  delete(i) {
    this.array_of_param.splice(i, 1);
  }
  showGeofence(geofence) {
    console.log('Inside provision asset' + geofence);
    this.geofence = geofence.name;
    this._dataService.changeMessage(geofence);
  }
  onCheckboxChange1(event, zone, k) {
     const demo_facility2 = {
           FacilityId: '',
           FacilityName: '',
           ZoneId: '',
           ZoneName: ''
  };
  let flag = 0;
    console.log(zone);
    console.log('checkbox1');
    if (event.target.checked) {
       if (this.res_facility.length > 0) {
            for (let m = 0; m < this.res_facility.length; m++) {
          if (this.res_facility[m].ZoneName === zone.ZoneName) {
            // alert(zone.ZoneName + 'not allowed');
            this.snackBar.open(zone.ZoneName + 'not allowed', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
            event.target.checked = false;

          } else {
              continue;
          }

       }
       if (flag == 0) {
             this.accessible_facility.push(demo_facility2);
            this.accessible_facility[this.i].FacilityId = this.facilities[k].FacilityID;
             this.accessible_facility[this.i].FacilityName = this.facilities[k].FacilityName;
              this.accessible_facility[this.i].ZoneId = zone.ZoneID;
              console.log(this.accessible_facility[this.i].ZoneId);
              this.accessible_facility[this.i].ZoneName = zone.ZoneName;
              this.i++;
       }


       console.log(this.accessible_facility);
       } else {

         this.accessible_facility.push(demo_facility2);
         console.log(this.demo_facility2);
         console.log(this.accessible_facility);
         this.accessible_facility[this.i].FacilityId = this.facilities[k].FacilityID;
           this.accessible_facility[this.i].FacilityName = this.facilities[k].FacilityName;
          this.accessible_facility[this.i].ZoneId = zone.ZoneID;
          console.log(this.accessible_facility[this.i].ZoneId);
          this.accessible_facility[this.i].ZoneName = zone.ZoneName;
          this.i++;
       }

    }
     if (!event.target.checked) {
      for (let j = 0; j < this.accessible_facility.length; j++) {
        if (this.accessible_facility[j].ZoneName === zone.ZoneName) {
           this.accessible_facility.splice(j, 1);
           this.i = this.i - 1;
        }
      }

     }
    // }  this.facility[i].zones.push(value);

  }
  onCheckboxChange2(event, zone, k) {

   const demo_facility = {
           FacilityId: '',
           FacilityName: '',
           ZoneId: '',
           ZoneName: ''
  };
  let flag = 0;
  console.log(k, zone, this.facilities[k]);
     console.log('checkbox2');
    if (event.target.checked) {
       if (this.accessible_facility.length > 0) {
            for (let m = 0; m < this.accessible_facility.length; m++) {
              console.log(m, this.accessible_facility.length, this.accessible_facility[m]);
             if (this.accessible_facility[m].ZoneName === zone.ZoneName) {
                // alert(zone.ZoneName + 'not allowed');
                this.snackBar.open(zone.ZoneName + 'not allowed', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
                 event.target.checked = false;
                  flag = 1;
              } else {
            continue;
          }
       }
       if (flag === 0) {
               this.res_facility.push(demo_facility);
             this.res_facility[this.j].FacilityId = this.facilities[k].FacilityID;
             this.res_facility[this.j].FacilityName = this.facilities[k].FacilityName;
              this.res_facility[this.j].ZoneId = zone.ZoneID;
              this.res_facility[this.j].ZoneName = zone.ZoneName;
              this.j++;
       }


       } else {
         this.res_facility.push(demo_facility);
          this.res_facility[this.j].FacilityId = this.facilities[k].FacilityID;
           this.res_facility[this.j].FacilityName = this.facilities[k].FacilityName;
          this.res_facility[this.j].ZoneId = zone.ZoneID;
          this.res_facility[this.j].ZoneName = zone.ZoneName;
          this.j++;
       }

    }
     if (!event.target.checked) {
      for (let j = 0; j < this.res_facility.length; j++) {
        if (this.res_facility[j].ZoneName === zone.ZoneName) {
           this.res_facility.splice(j, 1);
           this.j = this.j - 1;
        }
      }

     }
  }

  onCheckboxChange3(event, geofence, k) {
    const demo_geofence = {
        GeofenceName: '',
};
 let flag = 0;
  if (event.target.checked) {
    if (this.rest_geofence.length > 0) {
      for (let i = 0; i < this.rest_geofence.length; i++) {
        if (this.rest_geofence[i].GeofenceName === geofence.name) {
          // alert(geofence.name + 'not allowed');
          this.snackBar.open(geofence.name + 'not allowed', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
           event.target.checked = false;
           flag = 1;
        } else {
          continue;
        }
      }
      if (flag === 0) {
         this.geofences.push({'GeofenceName': geofence.name});
         console.log(this.geofences);
      }
    } else {
       this.geofences.push({'GeofenceName': geofence.name});
       console.log(this.geofences);
    }

  }
 if (!event.target.checked) {
      for (let j = 0; j < this.geofences.length; j++) {
     if (this.geofences[j].GeofenceName === geofence.name) {
        this.geofences.splice(j, 1);

     }
   }
 }
}

onCheckboxChange4(event, geofence, k) {

  let flag = 0;
   if (event.target.checked) {
     if (this.geofences.length > 0) {
       console.log(this.geofences.length);
       for (let i = 0; i < this.geofences.length; i++) {
         console.log(this.geofences[i], geofence.name);
         if (this.geofences[i].GeofenceName === geofence.name) {
          //  alert(geofence.name + 'not allowed');
           this.snackBar.open(geofence.name + 'not allowed', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
            event.target.checked = false;
            flag = 1;
         } else {
           continue;
         }
       }
       if (flag === 0) {
          this.rest_geofence.push({'GeofenceName': geofence.name});
          console.log(this.rest_geofence);
       }
     } else {
        this.rest_geofence.push({'GeofenceName': geofence.name});
        console.log(this.rest_geofence);
     }

   }
  if (!event.target.checked) {
        for (let j = 0; j < this.rest_geofence.length; j++) {
      if (this.rest_geofence[j].GeofenceName === geofence.name) {
         this.rest_geofence.splice(j, 1);

      }
    }
  }
}
  onSubmit(formValue: any) {
    console.log('inside submit');
    console.log(this.accessible_facility.length);
   console.log(this.geofences);
   console.log(this.rest_geofence);
   console.log(this.assetCategory);

     this.submitted = true;

    // stop here if form is invalid
    // if (formValue.invalid) {
    //   console.log("inside form invalid")
    //   this.submitted=false;
    //   return;
    // }

    if(this.assetCategory=="Indoor Only"){
      if(this.accessible_facility.length==0 || this.assetBleTag==""){
        console.log("1");
        // alert("Please select  a ble tag and an accessible zone");
      this.snackBar.open('Please select  a ble tag and an accessible zone', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
        this.submitted=false;
        return;
      }
    }
    else if(this.assetCategory=="Outdoor Only" ){
      if(this.geofences.length==0 || this.GPSTracker=="" ){
        console.log("2");
        // alert("Please select  a gps tracker and an accessible geofence");
        this.snackBar.open('Please select  a gps tracker and an accessible geofence', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
        this.submitted=false;
        return;
      }
    }
    else{
      if(this.accessible_facility.length==0 || this.geofences.length==0 || this.assetBleTag=="" || this.GPSTracker=="" ){
        console.log("3");
        // alert("Please select  ble tag, gps tracker and accessible zone and accessible geofence")
        this.snackBar.open('Please select  ble tag, gps tracker and accessible zone and accessible geofence', 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
        this.submitted=false;
        return;
      }
    }
    
    if(this.submitted==true){
      
        let payload = {
      AssetName: this.asset_name,
      AssetType: this.product_type,
      AssetSerialNo: this.asset_id,
      AssetTrackerNo: this.GPSTracker,
      AssetTagSerialNo: this.assetBleTag,
      AccessibleZones: this.accessible_facility,
      RestrictedZones: this.res_facility,
      AccessibleGeofence: this.geofences,
      RestrictedGeofence: this.rest_geofence,
      AssetImageUrl: this.imageRefUrl,
      AssetCategory:this.assetType,
      TrackMode: this.assetCategory,
    };
    console.log(JSON.stringify(payload));
    this._assetservice.createAsset(JSON.stringify(payload)).subscribe(res => {
      console.log('RES FROM CREATE',res);
    });


   console.log(JSON.stringify(payload));

    this.router.navigate(['admin/sites/AssetManagement']);
    }
    
  }
  cancel() {
    this.router.navigate(['admin/sites/AssetManagement']);
  }


}

