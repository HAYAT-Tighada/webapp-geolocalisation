var label;
var dataset;

$(document).ready(function() {
	$.ajax({
		url: "PositionServlet",
		data: { action: "charge" },
		method: "POST",
		success: function(data) {
			console.log("hello");
			console.log(data);
			// var map2 = new Map(JSON.parse(JSON.stringify(data)));
			//console.log(map2);
			label = data.map(val => val["key"]);
			dataset = data.map(val => val["value"]);
			updateChart(label, dataset);
		},
		error: function(data) {
			console.log("error a kamal ", data);
			console.log(error);
		}
	});
});
function updateChart(keys, values) {
	var ctx = document.getElementById('myChart').getContext('2d');
	var color = [];
	keys.forEach(function() {
		color.push(getRandomColor());
	});
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'doughnut',
		// The data for our dataset
		data: {
			labels: keys,
			//datasets : dataset
			//labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'nombre de postion par SmartPhone',
				backgroundColor: color,
				borderColor: getRandomColor(),
				//data: [0, 10, 5, 2, 20, 30, 45]
				data: values
			}]
		},
		// Configuration options go here
		options: {
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			},
		}
	});
}

function getRandomColor() { //To give me a new rgb number everytime
	var color = (Math.floor(Math.random() * (255 - 10)) + 10);
	return `rgb(${(Math.floor(Math.random() * (255 - 10)) + 10)}, ${(Math.floor(Math.random() * (255 - 10)) + 10)}, ${(Math.floor(Math.random() * (255 - 10)) + 10)})`;
}



