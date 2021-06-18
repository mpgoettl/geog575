/* Stylesheet by Martin P. Goettl, 2021 */
/*console.log("hello world!");*/

$(document).ready(function() {

	var cities;	
	var map = L.map("map", { 
		defaultExtentControl: true,
		center: [39.34, -99.85], 
		zoom: 4,	
		minZoom: 4,
		scrollWheelZoom: true,
		tap: false
		
	});				
				// display Stamen_TonerLite tiles with light features and labels
	L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
		attribution: 'Map tiles by &copy <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'})

	
	.addTo(map);
	
});

$.getJSON("data/cityData.json")
	.done(function(data) {
		var info = processData(data);
		createPropSymbols(info.timestamps, data);
	 })
.fail(function() { alert("There has been a problem loading the data.")});
	
	
	
	
function processData(data) {
	var timestamps = [];
	var min = Infinity;
	var max = -Infinity;
	
	for (var feature in data.features) {
		
		var properties = data.features[feature].properties;
		
		for (var attribute in properties) {
			
			if ( attribute != "id" &&
				attribute != "name" &&
				attribute != "lat" &&
				attribute != "lon" ) {
						
					if ( $.inArray(attribute,timestamps) === -1) {
						timestamps.push(attribute);
					}
					
					if (properties[attribute] < min) {
						min = properties[attribute];
					}
					
					if (properties[attribute] > max) {
						max = properties[attribute];
					}
			}
		}
	}
	
	return {
		timestamps : timestamps,
		min : min,
		max : max
	}
}

function createPropSymbols(timestamps, data) {
		
	cities = L.geoJson(data).addTo(map); 
	
}