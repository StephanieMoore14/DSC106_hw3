let sharedConfig = {
  layout: "3x1",
  graphset : [
    {
      // config for the energy stacked area graph
      type: 'area',
      title: {
        text: 'Generation MW',
        fontSize: 18,
      },
      "crosshair-x":{
        shared: true
      },
      plot: {
        tooltip:{
          visible: false
        },
        aspect: "spline",
        stacked: true
      },
      plotarea: {
        margin: "dynamic"
      },
      "scale-x": {
          "min-value": 1571579700000,
          "step": "30minute",
          "transform": {
              "type": "date",
              "all": "%m/%d/%Y<br>%h:%i:%s:%q %A"
          },
          "item": {
              "font-size": 9
          }
      },
      "utc": true,
      "timezone": 0,
      'scale-y': {
          values: "0:80:10",
          format: "%v",
          guide: {
            'line-style': "dotted"
          }
        },
        plotOptions: {
          series: {
              events: {
                  mouseOver: function () {
                      $report.html('Moused over')
                          .css('color', 'green');
                  },
                  mouseOut: function () {
                      $report.html('Moused out')
                          .css('color', 'red');
                  }
              }
          }
      },
      series: []
    },
    {
      // config for the price line graph
      type: "line",
      title: {
        text: 'Price $/MWh',
        fontSize: 18,
      },
      "crosshair-x":{
        shared: true
      },
      plot: {
        tooltip:{
          visible: false
        }
      },
      plotarea: {
      },
      "scale-x": {
          "min-value": 1571579700000,
          "step": "30minute",
          "transform": {
              "type": "date",
              "all": "%m/%d/%Y<br>%h:%i:%s:%q %A"
          },
          "item": {
              "font-size": 9
          }
      },
      "utc": true,
      "timezone": 0,
      'scale-y': {
        values: "0:30",
        format: "%v",
        guide: {
          'line-style': "dotted"
        }
      },
      plotOptions: {
        series: {
            events: {
                mouseOver: function () {
                    $report.html('Moused over')
                        .css('color', 'green');
                },
                mouseOut: function () {
                    $report.html('Moused out')
                        .css('color', 'red');
                }
            }
        }
    },
      series: []
    },
    {
      // config for the temperature line graph
      type: "line",
      title: {
        text: 'Temperature degreesF',
        fontSize: 18,
      },
      "crosshair-x":{
        shared: true
      },
      plot: {
        tooltip:{
          visible: false
        }
      },
      plotarea: {
      },
      "scale-x": {
          "min-value": 1571579700000,
          "step": "30minute",
          "transform": {
              "type": "date",
              "all": "%m/%d/%Y<br>%h:%i:%s:%q %A"
          },
          "item": {
              "font-size": 9
          }
      },
      "utc": true,
      "timezone": 0,
      'scale-y': {
        values: "0:80:20",
        format: "%v",
        guide: {
          'line-style': "dotted"
        }
      },
      plotOptions: {
        series: {
            events: {
                mouseOver: function () {
                    $report.html('Moused over')
                        .css('color', 'green');
                },
                mouseOut: function () {
                    $report.html('Moused out')
                        .css('color', 'red');
                }
            }
        }
    },
      series: []
    }
  ]
}

let pieConfig = {
  type: "pie",
  plot: {
      valueBox: {
          text: '%t\n%npv%'
      }
  },
  title: {
      text: 'Energy Breakup'
  },
  plotarea: {
      margin: "0 0 0 0"
  },
  plotOptions: {
    series: {
        events: {
            mouseOver: function () {
                $report.html('Moused over')
                    .css('color', 'green');
            },
            mouseOut: function () {
                $report.html('Moused out')
                    .css('color', 'red');
            }
        }
    }
},
  series: []
};

var globalEnergyData = {
  keys: [],
  values: []
};

// function to do deep-copy on the global data structure
function updateGlobalEnergyData(data) {
  globalEnergyData['values'] = [];
  for (var idx = 0; idx < data[0]['values'].length; idx ++) {
    var energyBreakup = data.map(elm => {return elm['values'][idx]});
    globalEnergyData['values'].push(energyBreakup);
  }
  globalEnergyData['keys'] = data.map(elm => elm['text']);
  console.log(globalEnergyData);
}

// this method reacts only onmouseover on any of the nodes in the shared graphs
function onMouseoverChart(e) {
  if (e['target'] === 'node') {
    var nodeSplit = e['targetid'].split('-');
    var nodeId = nodeSplit[nodeSplit.length - 1];
    if (Number.isInteger(parseInt(nodeId)) && parseInt(nodeId) < globalEnergyData['values'].length) {
      renderPieChart(parseInt(nodeId));
    }
  } 
}

// the nodeId is basically the x-axis value
// the actual breakup is retrieved from the global data-structure

function renderPieChart(nodeId) {
  var pieDataSet = globalEnergyData['keys'].map(function(elm, idx) {
    return {
      text: elm.split('.')[elm.split('.').length - 2],
      values: [globalEnergyData['values'][nodeId][idx]]
    }
  });
  pieConfig['series'] = pieDataSet;
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                var data = JSON.parse(httpRequest.responseText);
                console.log(data);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

// this function is responsible for plotting the energy on
// successfully loading the JSON data
// It also plots the pie chart for nodeId=0
function onSuccessCb(jsonData) {
  var energyData = jsonData.filter(function(elm) {
      return elm['type'] === 'power';
  }).map(function(elm) {
      return {
        values: elm['history']['data'],
        text: elm['id']
      };
  });
  updateGlobalEnergyData(energyData);

  var priceData = jsonData.filter(function(elm) {
      return elm['type'] === 'price';
  }).map(function(elm) {
      return {
        values: elm['history']['data'],
        text: elm['id']
      };
  });
  var tempData = jsonData.filter(function(elm) {
      return elm['type'] === 'temperature';
  }).map(function(elm) {
      return {
        values: elm['history']['data'],
        text: elm['id']
      };
  });
  Highcharts.chart('sharedGrid', {
    graphid: 0,
    data : energyData
  });
  Highcharts.chart('sharedGrid', {
    graphid: 1,
    data : priceData
  });
  Highcharts.chart('sharedGrid', {
    graphid: 2,
    data : tempData
  });
  
  Highcharts.chart('pieGrid', {
    data: pieConfig
  })
  renderPieChart(0);
}

function doMain() {
    fetchJSONFile('converted.js', onSuccessCb),
    console.log("Document loaded!")

};

document.onload = doMain()