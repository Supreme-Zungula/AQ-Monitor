
/* Draw graph on the given context */
function draw_chart(context, chartData = {}) {
    var chart = new Chart(context, chartData);
}

/* Calculate moving median */
function getMovingMedian(arr = []) {
    if (arr == null || arr.length === 0)
        return;

    var window = [];
    var movingMedianArr = [];
    var median;

    for (var i = 0; i < arr.length; i++) {
        window.push(arr[i]); /* add */
        window.sort(); /* sort */

        if (i % 2 === 0) {
            median = window[(i / 2 | 0)];
            movingMedianArr.push(median);
        }
        else {
            median = ((window[(i / 2 | 0)] + window[((i / 2 | 0)) + 1]) / 2 | 0);
            movingMedianArr.push(median);
        }
    }
    return (movingMedianArr);
}

/* Process information required to draw a chart diagram */
async function processChartData(data = {}, chartInfo = {}) {    
    var chartLabels = [];
    var chartDataset = [];
    var movingMedianData = [];

    if (data.rowsData.length >= 1) {
        var nextTime = new Date(data.rowsData[0].Date_n_Time);

        for(var i = 0; i < data.rowsData.length; i++) {
            var time = new Date(data.rowsData[i].Date_n_Time);
            
            if (time >= nextTime) {
                chartLabels.push(time.getHours() + ':' + time.getMinutes());
                chartDataset.push(data.rowsData[i].Value);
                nextTime.setMinutes(nextTime.getMinutes() + 5);
            }
        }
        movingMedianData = getMovingMedian(chartDataset); 
    }

    var ctx = document.getElementById(chartInfo.canvasID).getContext('2d');
    var data =  {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: chartLabels,
            datasets: [{
                label: chartInfo.title + ' ' + chartInfo.date,
                fill: false,
                backgroundColor: 'rgb(255, 100, 132)',
                borderColor: 'rgb(255, 200, 255)',
                data: movingMedianData      
            }]
        },
        // Configuration options go here
        options: {
            responsive: true
        }
    }
    draw_chart(ctx, data);
}

// Example POST method implementation:
async function postData(url = '', reqData = {}) {
    var data = {
        filterDate : reqData.date
    }
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json();
}  

/* Retrieve live data for the current day */
async function getLiveTVOC_Data() {
    var currentDate = new Date();
    var chartInfo = {
        title : 'TVOC Data for: ',
        canvasID : "tvoc_chartCanvas",
        date : currentDate
    }

    postData('/live/TVOC', {date: currentDate})
    .then((data) => {
        processChartData(data, chartInfo);
    });
}

/* Retrieve live Carbon dioxide data for the current day */
async function getLiveCO2_data() {
    var currentDate = new Date();
    var chartInfo = {
        title : 'CO2 Data for: ',
        canvasID : "co2_chartCanvas",
        date : currentDate
    }

    postData('/live/CO2', {date: currentDate})
    .then((data) => {
        processChartData(data, chartInfo);
    });
}

async function pollData() {
    setInterval(() => {
        getLiveCO2_data();
        getLiveTVOC_Data();
    }, 5000);
}

pollData();