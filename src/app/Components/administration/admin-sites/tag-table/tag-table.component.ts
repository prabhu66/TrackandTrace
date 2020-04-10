import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AssetService } from "../../../../Services/asset.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';


export interface TagDetails {
  serialNo: string;
  type: string;
  state: string;
  make: string;
  model: string;
  asset: string;

}
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css']
})
export class TagTableComponent implements OnInit {

  Select = new FormControl(false);
  public toggleView = false;
  Roles = [
    { Name: 'Name' },
    { Name: 'Email' },
    { Name: 'Id' },
  ];
  dataSource;
  data;
  array_of_tag;

  Tag: any[];

  displayedColumns: string[] = ['serialNo', 'type', 'state', 'make', 'model', 'more'];  //,'asset'
  selection = new SelectionModel<{}>(true, []);
  err:boolean;
  errMsg:string = '';
  busy:boolean = true;
  selectedTag:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('closedelModal') closedelModal;


  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private _assetService: AssetService) {

  }


  ngOnInit() {
    this.busy = true;
    this.err=false;
    this._assetService.device = "Tag";
    this.array_of_tag = new Array;
    this._assetService.GetTaglist().subscribe(res => {
      console.log("jyothi:" + res.data);
      /* 500 erroe handling */
      if (res.statusCode == 200) {
        this.err = false;
        this.Tag = res.data;
        this.dataSource = new MatTableDataSource<TagDetails>(this.Tag);
        this.data = Object.assign(this.Tag);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        this.err = true;
        this.errMsg = res.data;
      }
      this.busy = false;
    })


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
      this.dataSource.data.splice(index, 1);
      this.dataSource.paginator = this.paginator;
    });
    this.selection = new SelectionModel<TagDetails>(true, []);
  }
  onChecked(event, row) {
    event ? this.selection.toggle(row) : null;
    console.log(event, row)
    console.log(this.selection.isSelected(row));
    if (this.selection.isSelected(row)) {
      this.array_of_tag.push(row.ID)
    }
    if (!this.selection.isSelected(row)) {
      let index = this.array_of_tag.indexOf(row.ID);

      if (index > -1) {

        this.array_of_tag.splice(index, 1);
      }
    }
  }
  setTag(el){
    this.selectedTag = el;
  }
  deleteTag(element) {
    /* modified by akshay */
    let payload = {
      deviceSerialNo: this.selectedTag.DeviceSerialNo,
      type: this.selectedTag.DeviceType
    }
    this.closedelModal.nativeElement.click();
    this.busy = true;
    this._assetService.DeleteDevice(payload).subscribe(res => {
      if (res['statusCode'] == 200) {
        // alert("Tag successfully deleted
        this.snackBar.open('Tag successfully deleted', 'ok', { duration: 3000, horizontalPosition: 'center',verticalPosition:'top' });
      }
      if (res['statusCode'] == 400) {
        // alert("Asset Associated Device can't be deleted");
        this.snackBar.open("Asset Associated Device can't be deleted", 'ok', { duration: 3000, horizontalPosition: 'center' ,verticalPosition:'top'});
      }
      /* reload tag list */
    this.array_of_tag = new Array();

    this._assetService.GetTaglist().subscribe(res => {
      this.Tag = res.data;
      this.dataSource = new MatTableDataSource<TagDetails>(this.Tag);

      this.data = Object.assign(this.Tag);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<TagDetails>(true, []);
    })
    this.busy = false;
    })
  }

  // deleteTagList(){
  // if(this.array_of_tag.length>0){
  //     let payload={
  //        ID:this.array_of_tag
  //     }

  //   console.log(payload)
  //   this._assetService.DeleteDevice(payload).subscribe(res=>{
  //     console.log(res);
  //   });

  //   this.array_of_tag=new Array;

  //    this._assetService.GetTaglist().subscribe(res=>{
  //     console.log(res);
  //     this.Tag=res;
  //   this.dataSource = new MatTableDataSource<TagDetails>(this.Tag);
  //   this.data = Object.assign( this.Tag);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.selection = new SelectionModel<TagDetails>(true, []);
  //   });
  // }
  // }

  RefreshPlan() {
    this._assetService.device = "Tag";
    this.array_of_tag = new Array;
    this.Tag = [];
    this.dataSource = new MatTableDataSource<TagDetails>(this.Tag);
    this._assetService.GetTaglist().subscribe(res => {
      console.log(res);
      this.Tag = res.body;
      this.dataSource = new MatTableDataSource<TagDetails>(this.Tag);

      this.data = Object.assign(this.Tag);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  onEdit(element) {
    let payload = {
      ID: element.ID,
      deviceSerialNo: element.DeviceSerialNo,
      deviceState: element.DeviceState,
      make: element.Make,
      model: element.Model,
      deviceType: element.DeviceType,
    }
    console.log(JSON.stringify(payload))
    this._assetService.EditDevice((payload)).subscribe(
      res => {
        if (res.statusCode == 200) {
          this.router.navigate(['admin/sites/editDevice', element.ID])

        }
        if (res.body == "Cannot edit already associated") {
          this.snackBar.open("Asset Associated Device can't be edited", 'ok', { duration: 3000, horizontalPosition: 'center',verticalPosition:'top' });
        }

      });
  }
}


