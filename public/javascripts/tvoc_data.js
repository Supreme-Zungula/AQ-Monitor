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

/* Retrieve data filtered by date */
async function postFilterDate() {
    var dateInput = document.getElementById('filterDate').value;
    var data = { filterDate: dateInput };

    // Default options are marked with *
    const response = await fetch('/tvoc/graph', {
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

    await response.json().then( (data) => {
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

        var ctx = document.getElementById('tvoc_chartCanvasFiltered').getContext('2d');
        var data =  {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'TVOC data for ' + dateInput,
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
    }); // parses JSON response into native JavaScript objects
}

document.getElementById('submitDateBtn').addEventListener('click', postFilterDate);