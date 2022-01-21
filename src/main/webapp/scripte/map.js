/**
 * 
 */

// Initialize and add the map
var lat;
var lng;
$(document).ready(function() {

	$("#submitt").click(function() {
		var queryString = window.location.search;

		var urlParams = new URLSearchParams(queryString);
		var id = urlParams.get('id');
		console.log(id);
		console.log('lng ', lng);
		console.log('lat ', lat);
		var date = $("#inputDate").val();
		console.log(date);
		if (lng != null && lat != null && id != null) {
			$.ajax({
				url: "PositionServlet ",
				data: { action: "add", id: id, lat: lat, lng: lng, date: date},
				method: "POST",
				success: function(data) {
					console.log(data);
					//listerProf(data);
					window.location = '/index.html';
				},
				error: function(data) {
					console.log(data);
				}
			});
		}
	});


});
function initMap() {
	// The location of Uluru
	var uluru = { lat: 31.630000, lng: -8.008889 };
	// The map, centered at Uluru
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: uluru,
	});
	//listener for click on map
	google.maps.event.addListener(map, 'click',
		function(event) {
			lat = event.latLng.lat()
			lng = event.latLng.lng()
			//alert(event.latLng.lat() + "-" + event.latLng.lng())
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: map,
			});
		});
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
	/*var inf= new google.maps.InfoWindow({
		content:'<h1>Marrakech elbhja</h1>'
	});
	marker.addListener('click',function(){
		inf.open(map,marker);
	});*/
}