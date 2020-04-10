import { Component, OnInit } from '@angular/core';
import { AssetService  } from 'src/app/Services/asset.service'
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


declare var jQuery:any;

@Component({
  selector: 'app-associate-user',
  templateUrl: './associate-user.component.html',
  styleUrls: ['./associate-user.component.css']
})
export class AssociateUserComponent implements OnInit {

options: FormGroup;
public Users;
public assetName;
public userName;
public enddate;
public startdate;
public assetId;
public asset:any[];
public category: string="Material"

  constructor(fb: FormBuilder,private _assetservice:AssetService,private snackBar: MatSnackBar,private router: Router,private route: ActivatedRoute) { 
      this.options = new FormGroup({
      startdate: new FormControl(),
      enddate: new FormControl()
   });
   this.route.params.forEach((params: Params) => {
          this.assetId = +params['id'];
          console.log(this.assetId)
      });
      this._assetservice.GetAllAssetList(this.category).subscribe(res=>{
        console.log(res.body);
        for(let i=0;i<res.body.length;i++){
          console.log(res.body[i].AssetID)
           if(res.body[i].AssetID ==this.assetId){
              this.assetName=res.body[i].AssetName;
              break;
           }
        }
        })
  }

  ngOnInit() {
    this._assetservice.GetAllAssetList("People")
    .subscribe(res=>{
      console.log(res.body)
      this.Users = res.body;
    })
  }
  onSubmit(){
    console.log(this.options.value)
    this.enddate = new Date(this.options.value.enddate.toISOString());
    this.startdate = new Date(this.options.value.startdate.toISOString());
  
  
    const payload ={
      AssetId: this.assetId,
      UserName: this.userName,
      StartTime: this.startdate ,
      EndTime:  this.enddate 
    }
    console.log(payload);
    this._assetservice.AssociateAssetUser(payload)
  .subscribe(res=>{
    console.log(res);
  });
  // alert("Asset has been successfully associated");
  this.snackBar.open("Asset has been successfully associated", 'ok',{duration: 3000,horizontalPosition:'center', verticalPosition:'top'});
  this.router.navigate(['admin/sites/AssetManagement']);
  }

  cancel(){
    this.router.navigate(['admin/sites/AssetManagement'])
  }

}
