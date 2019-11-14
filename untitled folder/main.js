
var tempData;
var tooltipPie;
var currPrice;
var myPieChart;
var totalPower;
var totalSrcPower;
var totalLoadPower;

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "Oct",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();


    return day + ' ' + monthNames[monthIndex] + ' ' + hour + ':' + minute;
}
tempData = [
    {
        name: "Wind",
        color: "#437607"
    },{
        name: "Hydro",
        color: "#0561AD"
    },
    {
        name: "Gas (CCGT)",
        color: "#FF9136"
    },
    {
        name: "Distillate",
        color: "#FF00D1"
    },
    {
        name: "Black Coal",
        color: "#000000"
    },
    {
        name: "Pumps",
        color: "#FFF300"
    },
    {
        name: "Exports",
        color: "#FF0000"
    }
];

function areaChart(chartdiv, toPlot) {
    Highcharts.chart(chartdiv, {
        chart: {
            type: 'areaspline',
            height: 350
        },

        title: {
            text: 'Generation',
            align: 'left',
            style: {
                fontSize: '15px'
            }
        },

        subtitle: {
            text: 'MW',
            align: 'left'
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%a \n %d %b'
            },
            crosshair: true,
            events: {
                setExtremes: syncExtremes
            },
            tickInterval: 24 * 3600 * 1000
        },

        yAxis: {
            gridLineDashStyle: 'longdash',
            title: {
                text: null
            },
            tickInterval: 1000,
            labels: {
                format: '{value:.0f}'
            },
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            areaspline: {
                stacking: 'normal',
                fillOpacity: 1
            }
        },


        tooltip: {
            shared: true,

            formatter: function() {

                var i;
                var j = 0;
                totalSrcPower = 0;
                totalLoadPower = 0;
                for (i = 0; i < 5; i = i + 1) {
                    totalSrcPower = totalSrcPower + this.points[i].y;
                }

                for (i = 5; i < 7; i = i + 1) {
                    totalLoadPower = totalLoadPower + this.points[i].y;
                }

                totalPower = totalSrcPower + totalLoadPower;

                for (i = 0; i < this.points.length; i = i + 1) {
                    tempData[i].y = this.points[i].y;
                }

                function formatDate(date) {
                    var monthNames = [
                        "January", "February", "March",
                        "April", "May", "June", "July",
                        "August", "September", "Oct",
                        "November", "December"
                    ];

                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var hour = date.getHours();
                    var minute = date.getMinutes();


                    return day + ' ' + monthNames[monthIndex] + ' ' + hour + ':' + minute;
                }

                var dateit = new Date(this.x)



                return null //formatDate(dateit) + '  Total : ' + totalPower.toFixed(0) + ' MW';
            }
        },

        series: [{
            name: toPlot[5].id,
            data: toPlot[5].data,
            color: "#437607"
        }, {
            name: toPlot[3].id, // hydro
            data: toPlot[3].data,
            color: "#4582B4"
        }, {
            name: toPlot[2].id,
            data: toPlot[2].data,
            color: "#FDB462"
        }, {
            name: toPlot[1].id,
            data: toPlot[1].data,
            color: "#FF00D1"
        }, {
            name: toPlot[0].id,
            data: toPlot[0].data,
            color: "#000000" // coal
        }, {
            name: toPlot[4].id,
            data: toPlot[4].data,
            color: "#88AFD0" // pump
        }, {
            name: toPlot[6].id, //expor
            data: toPlot[6].data,
            color: "#977AB1"
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

function lineChartPrice(chartdiv, toPlot) {
    Highcharts.chart(chartdiv, {


        title: {
            text: 'Price',
            align: 'left',
            style: {
                fontSize: '15px'
            }

        },
        chart: {
            height: 200
        },

        subtitle: {
            text: '$/MWh',
            align: 'left'
        },

        xAxis: {
            type: 'datetime',
            crosshair: true,
            events: {
                setExtremes: syncExtremes
            },
            tickInterval: 24 * 3600 * 1000
        },

        yAxis: {
            gridLineDashStyle: 'longdash',
            title: {
                text: null
            },
            tickInterval: 100,
            max: 300
        },
        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                lineWidth: 1


            },
            line: {
                color: "#DB1C1C"
            }
        },

        tooltip: {


            formatter: function() {
                currPrice = this.y;
                datep = new Date(this.x);
                return null;
            }
        },

        series: [{
            name: toPlot[8].id,
            data: toPlot[8].history.data
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

function lineChartTemperature(chartdiv, toPlot) {
    Highcharts.chart(chartdiv, {

        title: {
            text: 'Temperature',
            align: 'left',
            style: {
                fontSize: '15px'
            }
        },
        chart: {
            height: 200
        },

        subtitle: {
            text: "°F",
            align: 'left'
        },

        xAxis: {
            type: 'datetime',
            crosshair: true,
            events: {
                setExtremes: syncExtremes
            },
            tickInterval: 24 * 3600 * 1000
        },

        yAxis: {
            gridLineDashStyle: 'longdash',
            title: {
                text: null
            },
            tickInterval: 20,
            min: 0,
            max: 100
        },
        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            },
            line: {
                color: "#DB1C1C"
            }
        },

        tooltip: {

            formatter: function() {
                return null;
            }
        },

        series: [{
            name: toPlot[10].id,
            data: toPlot[10].history.data,
            lineWidth: 1
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

function pieChart() {
    myPieChart = Highcharts.chart('pieContainer', {
        chart: {

            type: 'pie'
        },
        title: {
            verticalAlign: 'middle',
            align: 'center',
            text: ''
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: null
        },
        plotOptions: {
            title: {
                align: 'center',
                verticalAlign: 'middle',
                text: 'MW',
                style: {
                fontSize: '13px'
                },
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{

            innerSize: '50%',
            name: 'Energy',
            colorByPoint: true,
            data: tooltipPie
        }]
    });
}

$('#makePie').click(function() {
    myPieChart.update({
        chart: {
            type: 'pie',

        },


        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        }
    });
});

$('#makeBar').click(function() {
    myPieChart.update({
        chart: {
            type: 'bar'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        }
    });
});

$('#container').bind('mousemove touchmove touchstart', function(e) {
    var chart,
        point,
        i,
        event;

    // points container
    var points = [];

    for (i = 0; i < 3; i = i + 1) {
        chart = Highcharts.charts[i];
        event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
        point = chart.series[0].searchPoint(event, true); // Get the hovered point

        if (point) {
            point.onMouseOver(); // Show the hover marker

            // store points: 
            points.push(point);

            chart.xAxis[0].drawCrosshair(event, point); // Show the crosshair
        }
	}
	

var total = document.getElementById("total");
var totalSrc = document.getElementById("totalSrc");
var totalLoad = document.getElementById("totalLoad");
var renewables = document.getElementById("renewables");

var price = document.getElementById("price");

	document.getElementById("exportspower").innerHTML = (tempData[6].y).toFixed(2);
	document.getElementById("windpower").innerHTML = (tempData[0].y).toFixed(2);
    document.getElementById("pumpspower").innerHTML = (tempData[5].y).toFixed(2);
    document.getElementById("hydropower").innerHTML = (tempData[1].y).toFixed(2);
    document.getElementById("gaspower").innerHTML = (tempData[2].y).toFixed(2);
    document.getElementById("distpower").innerHTML = (tempData[3].y).toFixed(2);
    document.getElementById("coalpower").innerHTML = (tempData[4].y).toFixed(2);

    document.getElementById("exportsdemand").innerHTML = (tempData[6].y / totalPower * 100).toFixed(2);
    document.getElementById("winddemand").innerHTML = (tempData[0].y / totalPower * 100).toFixed(2);
    document.getElementById("pumpsdemand").innerHTML = (tempData[5].y / totalPower * 100).toFixed(2);
    document.getElementById("hydrodemand").innerHTML = (tempData[1].y / totalPower * 100).toFixed(2);
    document.getElementById("gasdemand").innerHTML = (tempData[2].y / totalPower * 100).toFixed(2);
    document.getElementById("distdemand").innerHTML = (tempData[3].y / totalPower * 100).toFixed(2);
    document.getElementById("coaldemand").innerHTML = (tempData[4].y / totalPower * 100).toFixed(2);
    renewables.innerHTML = ((tempData[0].y / totalPower + tempData[1].y / totalPower) * 100).toFixed(2);
    price.innerHTML = currPrice;
    totalSrc.innerHTML = totalSrcPower.toFixed(2);
    totalLoad.innerHTML = totalLoadPower.toFixed(2);
    total.innerHTML = totalPower.toFixed(2);

    var i;
    tooltipPie = [];
    for (i = 0; i < 5; i = i + 1) {
        tooltipPie.push(tempData[i]);
    }

    myPieChart.series[0].setData(tooltipPie, true);

});



function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') {
        Highcharts.each(Highcharts.charts, function(chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) {
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                        trigger: 'syncExtremes'
                    });
                }
            }
        });
    }
}

function runfi() {
    $.getJSON('assets/springfield_converted_json.json', function(toPlot) {
        var i;
        var j;

        var sampled = [{}, {}, {}, {}, {}, {}, {}];

        var dated_data;

        for (i = 0; i < toPlot.length; i = i + 1) {
            dated_data = [];
            var datepoint;
            var point;

            if (toPlot[i].history.interval == "30m") {
                for (j = 0; j < toPlot[i].history.data.length; j = j + 1) {
                    datepoint = (toPlot[i].history.start + (j * 1800)) * 1000;
                    point = [datepoint, toPlot[i].history.data[j]];
                    dated_data.push(point);
                }
            } else {
                for (j = 0; j < toPlot[i].history.data.length; j = j + 1) {
                    datepoint = (toPlot[i].history.start + (j * 300)) * 1000;
                    if (i != 4 && i != 6) {
                        point = [datepoint, toPlot[i].history.data[j]];
                    } else {
                        point = [datepoint, -toPlot[i].history.data[j]];
                    }
                    dated_data.push(point);
                }
            }

            toPlot[i].history.data = dated_data;
        }

        for (i = 0; i < 7; i = i + 1) {
            sampled[i].id = toPlot[i].id;
            sampled[i].data = [
                [1571578200000, null]
            ];
            for (j = 1; j < toPlot[i].history.data.length; j = j + 6) {
                sampled[i].data.push(toPlot[i].history.data[j]);
            }
        }

        var chartDiv1 = document.createElement('div');
        var chartDiv2 = document.createElement('div');
        var chartDiv3 = document.createElement('div');
        chartDiv1.className = 'chart';
        chartDiv2.className = 'chart';
        chartDiv3.className = 'chart';
        document.getElementById('container').appendChild(chartDiv1);
        document.getElementById('container').appendChild(chartDiv2);
        document.getElementById('container').appendChild(chartDiv3);

        areaChart(chartDiv1, sampled);
        lineChartPrice(chartDiv2, toPlot);
        lineChartTemperature(chartDiv3, toPlot);
        pieChart();
    });
}
window.addEventListener("DOMContentLoaded", runfi);