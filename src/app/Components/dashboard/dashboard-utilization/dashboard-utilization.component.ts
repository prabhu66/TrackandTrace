import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import {Chart} from '../chart.js';
import { AssetService  } from 'src/app/Services/asset.service'
@Component({
  selector: 'app-dashboard-utilization',
  templateUrl: './dashboard-utilization.component.html',
  styleUrls: ['./dashboard-utilization.component.css']
})
export class DashboardUtilizationComponent implements AfterViewInit{
  public canvas;
  public ctx: CanvasRenderingContext2D;
  // public charts = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  public charts = [];
  public chartData =[];
  public category ="Material";

//   public peopleData = 
//   [
//   {type: 'Supervisor', image: '../../../../assets/image/manager-1.svg', total: 10, Inuse: 5, Idle: 5},
//   {type: 'Plumber', image: '../../../../assets/image/plumber-working.svg', total: 14, Inuse: 6, Idle: 8},
//   {type: 'Attendant', image: '../../../../assets/image/clerk.svg', total: 7, Inuse: 5, Idle: 2},
//   {type: 'Machine operator', image: '../../../../assets/image/worker.svg', total: 11, Inuse: 5, Idle: 6},
//   {type: 'Store Keeper', image: '../../../../assets/image/store.svg', total: 9, Inuse: 5, Idle: 4},
// ]
  public myLineChart;

  constructor(private el: ElementRef, private _assetservice:AssetService) {
    Chart.defaults.global.legend.display = false;
    this._assetservice.getUtilizationData(this.category)
    .subscribe(res=>{
      this.chartData = res.data;
    });
  }

  ngAfterViewInit() {  
    this._assetservice.getUtilizationData(this.category)
    .subscribe(res=>{
      this.chartData = res.data;
      this.mychartfunction();
    });
  }

  mychartfunction() {

    // for (let i = 0; i < this.charts.length; i++){
    //   this.canvas = this.el.nativeElement.querySelector('#peopleChart'+i);
    //   this.ctx = this.canvas.getContext('2d');
    //   this.Drawchart();
    //   }
    console.log('from my chart', this.chartData);
      if(this.chartData){
        for (let i=0; i<this.chartData.length;i++){
          this.canvas = this.el.nativeElement.querySelector('#assetChart'+i);
          if(this.canvas){
            this.ctx = this.canvas.getContext('2d');
            this.Drawchart(this.chartData[i]);
          };
          }
      }
    }

    Drawchart(item) {
      console.log('i am here')
      this.myLineChart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: ['Inuse', 'Idle'],
          datasets: [{
              data: [item.InUseAssetCount,item.IdleAssetCount],
              backgroundColor: ['#F77F00','#D62828']
          }]
      },
      options:{
        responsive: true,
        maintainAspectRatio: false,
      }
      });
    
      item.chart = this.myLineChart;
      console.log(item);
    }
  

}
