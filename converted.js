// function plotPie() {
//   // Create the chart
//   chart = new Highcharts.Chart({
//     chart: {
//       renderTo: 'pieGrid',
//       type: 'pie',
//       events: {
//         load: function(event) {
//           var chart = this,
//             points = chart.series[0].points,
//             len = points.length,
//             total = 0,
//             i = 0;

//           for (; i < len; i++) {
//             total += points[i].y;
//           }

//           chart.setTitle({
//             text: total + " MW",
//             align: 'center',
//             verticalAlign: 'middle',
//             y: 14,
//             style: {
//               fontWeight: 'bold',
//               fontSize: '12px'
//             },
//           });
//         }
//       }
//     },
//     series: [{
//                 name: 'Browsers',
//                 data: [["Firefox",6],["MSIE",4],["Chrome",7]],
//                 size: '60%',
//                 innerSize: '40%',
//                 showInLegend:false,
//                 dataLabels: {
//                     enabled: false
//                 }
//             }]
//         });
// };