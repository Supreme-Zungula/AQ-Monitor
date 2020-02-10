/* Draw Carbon dioxide graph */
async function draw_CO2_Graph(graphLabels, graphData) {
    var ctx = document.getElementById('co2_chartCanvas').getContext('2d');
    var data =  {
        // The type of chart we want to create
        type: 'line',
        responsive: true,
        // The data for our dataset
        data: {
            labels: graphLabels,
            datasets: [{
                label: 'Carbon dioxide dataset',
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 199, 132)',
                data: graphData
            }]
        },
        // Configuration options go here
        options: {
            responsive: true
        }
    }

    await console.log(data);
    var chart = new Chart(ctx, data);
}


/* Retrieve Carbon dioxide data and draw a line graph */
function loadData_CO2() {
    var graphLabels = [];
    var graphData = [];
    
    fetch('/CO2/graph').then( function(response) {
        response.json().then( function(data) {
            console.log(data);
            for(var i = 0; i < data.rowsData.length; i++) {
                var time = new Date(data.rowsData[i].DNT);
                graphLabels.push(time.getHours() + ':' + time.getMinutes());
                graphData.push(data.rowsData[i].Value);
            }
        });

        draw_CO2_Graph(graphLabels, graphData);
    });
}

document.getElementById('view_CO2_Graph').addEventListener('click', loadData_CO2);
