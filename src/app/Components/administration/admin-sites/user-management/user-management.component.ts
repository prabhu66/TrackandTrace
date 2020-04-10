import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { AssetService} from "../../../../Services/asset.service";

export interface AccountDetails {
  name: string;
  role: string;
  email: string;
  account: string;
  site:string;
  group:string;
  status:string;
}
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  Select = new FormControl(false);
  public toggleView = false;
  Roles = [
    { Name: 'Name' },
    { Name: 'Email' },
    { Name: 'Id' },
  ];
   dataSource;
  data;
  array_of_user;

  
  Account = new Array;
  displayedColumns: string[] = ['select', 'name', 'role','email','status','more'];

  selection = new SelectionModel<{}>(true, []);
 
  err: boolean;
  errMsg: string = '';
  busy: boolean = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private _formBuilder: FormBuilder,private _assetService:AssetService) {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
       email: ['', Validators.required],
      account: ['', Validators.required],
       site: ['', Validators.required],
      group: ['', Validators.required]
    });
   }


  ngOnInit() {
    this.busy = true;
    this.err = false;
    this.array_of_user=new Array;
    this._assetService.GetUserList().subscribe(res=>{
      if (res.statusCode == 200) {
        /* 500 erroe handling */
        this.Account=res.data;
        this.dataSource = new MatTableDataSource<AccountDetails>(this.Account);
        this.data = Object.assign( this.Account);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.err = true;
        this.errMsg = res.data;
      }
      this.busy = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
 
  AbortOperation() {
    this.toggleView = !this.toggleView;
  }
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
     let index: number = this.data.findIndex(d => d === item);
     console.log(this.data.findIndex(d => d === item));
     this.dataSource.data.splice(index,1);
     this.dataSource.paginator = this.paginator;
   });
   this.selection = new SelectionModel<AccountDetails>(true, []);
 }

 onChecked(event,row){
    event ? this.selection.toggle(row) : null;
   console.log(event, row)
   console.log(this.selection.isSelected(row));
   if(this.selection.isSelected(row)){
      this.array_of_user.push(row.ID)
   }
   if(!this.selection.isSelected(row)){
     let index = this.array_of_user.indexOf(row.ID);

      if (index > -1) {

        this.array_of_user.splice(index, 1);
      }
   }
 }
 
  deleteUser(element){
      let payload;
      console.log(element);
      
    console.log(element.ID)
    if(this.array_of_user.length=1){
        let array_of_element=new Array;
        array_of_element.push(element.ID);
        payload={
          ID:array_of_element
        }
    }
     
    console.log(payload)
    this._assetService.DeleteUser(payload).subscribe(res=>{
      console.log(res);
      alert('User Successfully Deleted');
      this.ngOnInit();
    });

    this.array_of_user=new Array;

     this._assetService.GetUserList().subscribe(res=>{
      console.log(res);
      this.Account=res.body;
    this.dataSource = new MatTableDataSource<AccountDetails>(this.Account);
    this.data = Object.assign( this.Account);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<AccountDetails>(true, []);
    });
     
 }
 deleteUserList(){
  if(this.array_of_user.length>0){
      let payload={
         ID:this.array_of_user
      }
  
    console.log(payload)
    this._assetService.DeleteUser(payload).subscribe(res=>{
      console.log(res);
    })
    this.array_of_user=new Array;

     this._assetService.GetUserList().subscribe(res=>{
      console.log(res);
      this.Account=res.body;
    this.dataSource = new MatTableDataSource<AccountDetails>(this.Account);
    this.data = Object.assign( this.Account);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<AccountDetails>(true, []);
    });
  }
     
     
 }
 RefreshPlan(){
    this.array_of_user=new Array;
    this.Account=[];
    this.dataSource = new MatTableDataSource<AccountDetails>(this.Account);
    this._assetService.GetUserList().subscribe(res=>{
      console.log(res);
      this.Account=res.body;
    this.dataSource = new MatTableDataSource<AccountDetails>(this.Account);
    this.data = Object.assign( this.Account);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
 }

}
