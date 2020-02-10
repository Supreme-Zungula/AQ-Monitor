/* Draw Total volatile Organic Compounds graph */
async function draw_TVOC_Graph(graphLabels, graphData) {
    var ctx = document.getElementById('tvoc_chartCanvas').getContext('2d');
    var data =  {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: graphLabels,
            datasets: [{
                label: 'Total volatile organic compounds dataset',
                fill: false,
                backgroundColor: 'rgb(255, 100, 132)',
                borderColor: 'rgb(255, 200, 255)',
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

    chart.update({
        duration: 800,
        easing: 'easeOutBounce'
    });
}

/* Retrieve TVOC data and draw a line graph */
function loadData_TVOC() {
    var graphLabels = [];
    var graphData = [];
    
    fetch('/tvoc/graph').then( function(response) {
        response.json().then( function(data) {
            
            for(var i = 0; i < data.rowsData.length; i++) {
                var time = new Date(data.rowsData[i].DNT);
                graphLabels.push(time.getHours() + ':' + time.getMinutes());
                graphData.push(data.rowsData[i].Value);
            }
        });

        draw_TVOC_Graph(graphLabels, graphData);
    });
}

document.getElementById('view_TVOC_Graph').addEventListener('click', loadData_TVOC);