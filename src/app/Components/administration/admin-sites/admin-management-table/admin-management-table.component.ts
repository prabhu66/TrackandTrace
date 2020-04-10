import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
export interface AccountDetails {
  name: string;
  role: string;
  email: string;
  account: string;
  site:string;
  group:string;
  status:string;
}
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-admin-management-table',
  templateUrl: './admin-management-table.component.html',
  styleUrls: ['./admin-management-table.component.css']
})
export class AdminManagementTableComponent implements OnInit {

  toggleView: any;
  Account = [{
 name: 'Mylee', serialNo: '1235', state: 'active', type: 'ab35617', category: 'ECy1873' , bletag:'IMG', tracker:'active'
 },
 {
  name: 'Tom', serialNo: '1235', state: 'active', type: 'ab35617', category: 'ECy1873' , bletag:'IMG', tracker:'active'
  }
]
  displayedColumns: string[] = ['select', 'name', 'serialNo','state', 'type','category', 'bletag','tracker','action'];
  dataSource = new MatTableDataSource<{}>(this.Account);
  selection = new SelectionModel<{}>(true, []);
  data = Object.assign( this.Account);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private _formBuilder: FormBuilder) {


  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
 
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
     let index: number = this.data.findIndex(d => d === item);
     console.log(this.data.findIndex(d => d === item));
     this.dataSource.data.splice(index,1);
     this.dataSource.paginator = this.paginator;
   });
   this.selection = new SelectionModel<{}>(true, []);
 }
}
