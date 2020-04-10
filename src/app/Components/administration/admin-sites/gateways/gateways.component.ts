import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AssetService } from "../../../../Services/asset.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';

export interface GatewayDetails {
  serialNo: string;
  type: string;
  state: string;
  make: string;
  model: string;
  asset: string;

}

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent implements OnInit {
  Select = new FormControl(false);
  public toggleView = false;
  Roles = [
    { Name: 'Name' },
    { Name: 'Email' },
    { Name: 'Id' },
  ];
  dataSource;
  data;
  array_of_gateway;

  Gateway: any[];

  displayedColumns: string[] = ['serialNo', 'type', 'state', 'make', 'model', 'more'];  //,'asset'
  selection = new SelectionModel<{}>(true, []);
  /* akshay modification for smooth UI flow */
  err: boolean;
  errMsg: string = '';
  busy: boolean = true;
  selectedGateway: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('closedelModal') closedelModal;

  constructor(private _formBuilder: FormBuilder,
    private _assetService: AssetService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }


  ngOnInit() {
    this.busy = true;
    this.err = false;
    this._assetService.device = "Gateway";
    this.array_of_gateway = new Array;
    this._assetService.GetGatewayList().subscribe(res => {
      if (res.statusCode == 200) {
        console.log(' res.data', res.data);

        /* 500 erroe handling */
        this.err = false;
        this.Gateway = res.data;
        this.dataSource = new MatTableDataSource<GatewayDetails>(this.Gateway);
        this.data = Object.assign(this.Gateway);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
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
    this.selection = new SelectionModel<GatewayDetails>(true, []);
  }
  onChecked(event, row) {
    event ? this.selection.toggle(row) : null;
    console.log(event, row)
    console.log(this.selection.isSelected(row));
    if (this.selection.isSelected(row)) {
      this.array_of_gateway.push(row.ID)
    }
    if (!this.selection.isSelected(row)) {
      let index = this.array_of_gateway.indexOf(row.ID);

      if (index > -1) {

        this.array_of_gateway.splice(index, 1);
      }
    }
  }
  /* modified buy Akshay for delete modal */
  setGateway(el) {
    this.selectedGateway = el;
  }
  deleteGateway() {
    this.busy = true;
    let payload = {
      gatewaySerialNo: this.selectedGateway.GATEWAYSERIALNO
    }
    this._assetService.DeleteGateway(payload).subscribe(
      res => {
        if (res['statusCode'] == 200) {
          this.snackBar.open('Gateway successfully deleted', 'ok', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
          /* akshay delete code modification */
          this.array_of_gateway = new Array();
          this._assetService.GetGatewayList().subscribe(res => {
            console.log(res);
            this.Gateway = res.data;
            this.dataSource = new MatTableDataSource<GatewayDetails>(this.Gateway);

            this.data = Object.assign(this.Gateway);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.selection = new SelectionModel<GatewayDetails>(true, []);
          })
        }
        if (res['statusCode'] == 400) {
          this.snackBar.open("Asset Associated Device can't be deleted", 'ok', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      }

    )
    this.busy = false;
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
/* Added code by akshay for Edit Gateway */
onEdit(element){
  /* GATEWAYSERIALNO: "80EACA00072A"
GATEWAYSTATE: "IDLE"
GATEWAYTYPE: "BLE"
ID: 1
MAKE: "PINMICRO"
MODEL: "RECEIVER" */
  let payload = {
    gatewaySerialNo:element.GATEWAYSERIALNO,
    gatewayState:element.GATEWAYSTATE,
    make:element.MAKE,
    model:element.MODEL,
    gatewayType:element.GATEWAYTYPE
  }
  this.router.navigate(['admin/sites/editDevice', element.ID])
  /* this._assetService.EditDevice((payload)).subscribe(
    res => {
      if (res.statusCode == 200) {
        this.router.navigate(['admin/sites/editDevice', element.ID])

      }
      if (res.body == "Cannot edit already associated") {
        this.snackBar.open("Asset Associated Device can't be edited", 'ok', { duration: 3000, horizontalPosition: 'center',verticalPosition:'top' });
      }

    }); */
}
  RefreshPlan() {
    this._assetService.device = "Gateway";
    this.array_of_gateway = new Array;
    this.Gateway = [];
    this.dataSource = new MatTableDataSource<GatewayDetails>(this.Gateway);
    this._assetService.GetGatewayList().subscribe(res => {
      console.log(res);
      this.Gateway = res.body;
      this.dataSource = new MatTableDataSource<GatewayDetails>(this.Gateway);

      this.data = Object.assign(this.Gateway);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}



