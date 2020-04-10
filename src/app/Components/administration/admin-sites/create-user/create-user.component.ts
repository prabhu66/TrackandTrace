import { Component, OnInit } from '@angular/core';
import { AssetService} from "../../../../Services/asset.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

isLinear: any;
user_name:string;
user_role:string;
user_email:string;
account:string="Wipro";
site:string="EC";
group:string;
status:string="";

  constructor(private _assetService:AssetService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){

    let payload={
     "userName": this.user_name,
     "userEmail": this.user_email,
     "role": this.user_role,
     "status": this.status

    }
    console.log(JSON.stringify(payload));
    this._assetService.createUser(JSON.stringify(payload)).subscribe(res=>{
      console.log(res);
    });
     this.router.navigate(['admin/sites/UserManagement'])
  }

  cancel(){
     this.router.navigate(['admin/sites/UserManagement'])
  }

 
}
