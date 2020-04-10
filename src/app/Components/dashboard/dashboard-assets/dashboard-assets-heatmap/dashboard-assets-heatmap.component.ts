import { Component, ElementRef, AfterViewInit } from '@angular/core';
//import {ApexOptions} from 'apexcharts';
// import { heatoptions } from 'src/app/Components/dashboard/apexheatmap.js';
import { mixedoptions } from 'src/app/Components/dashboard/apexmixedmap.js';
@Component({
  selector: 'app-dashboard-assets-heatmap',
  templateUrl: './dashboard-assets-heatmap.component.html',
  styleUrls: ['./dashboard-assets-heatmap.component.css']
})
export class DashboardAssetsHeatmapComponent implements AfterViewInit {

public heatoptions;
public series = [];

  constructor(private el: ElementRef) {
    var a = [{date: '1/1/1', count: [1, 2, 3, 4, 5]},
    {date: '6/1/1', count: [10, 20, 3, 40, 5]}];
    var i = 0;
    while (i < a.length) {
      this.series.push({
        x: a[i].date,
        y: a[i].count
      });
      i++;
    }
console.log(this.series);
    var heatoptions = {
      chart: {
        height: 350,
        type: 'heatmap'
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 1,
        }
      },
      dataLabels: {
        enabled: false
      },
      series: this.series,
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          if (w.globals.seriesNames[seriesIndex] !== '') {
            return series[seriesIndex][dataPointIndex];
          } else {
            return '';
          }
        }
      }
    };
    this.heatoptions = heatoptions;
  }
  ngAfterViewInit() {
    //  var heatchart = new ApexCharts(this.el.nativeElement.querySelector("#heatchart"), this.heatoptions);
    //  heatchart.render()
    //  var mixedchart = new ApexCharts(this.el.nativeElement.querySelector("#mixedchart"), mixedoptions);
    // mixedchart.render()
  }
  }


