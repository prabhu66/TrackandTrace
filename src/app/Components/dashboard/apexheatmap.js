function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  
  var heatoptions = {
    chart: {
      height: 200,
      type: "heatmap"
    },
  //   colors:  ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794','#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
  // ],
    plotOptions: {
      heatmap: {
        shadeIntensity: 1,
        // colorScale: {
        //   ranges: [{
        //       from: -30,
        //       to: 5,
        //       color: '#00A100',
        //       name: 'low',
        //     },
        //     {
        //       from: 6,
        //       to: 20,
        //       color: '#128FD9',
        //       name: 'medium',
        //     },
        //     {
        //       from: 21,
        //       to: 45,
        //       color: '#FFB200',
        //       name: 'high',
        //     }
        //   ]
        // }
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: "Jan",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Feb",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Mar",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Apr",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "May",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Jun",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Jul",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      },
      {
        name: "Aug",
        data: generateData(20, {
          min: -30,
          max: 55
        })
      }
    ],
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        if (w.globals.seriesNames[seriesIndex] !== "") {
          return series[seriesIndex][dataPointIndex];
        } else {
          return "";
        }
      }
    }
  };
  export {heatoptions};