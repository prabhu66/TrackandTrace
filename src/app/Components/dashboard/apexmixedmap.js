var mixedoptions = {
    chart: {
      height: 220,
      width:1000,
      type: 'line',
    },
    series: [{
      name: 'Total Asset',
      type: 'column',
      data: [44, 50, 41, 67, 22, 41, 20, 35, 75, 32, 25, 23]
    }, {
      name: 'Utilization',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    stroke: {
      width: [0, 4]
    },
    title: {
      // text: 'Traffic Sources'
    },
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      title: {
        // text: 'Website Blog',
      },

    }, {
      opposite: true,
      title: {
        // text: 'Social Media'
      }
    }]

  }
  export {mixedoptions};