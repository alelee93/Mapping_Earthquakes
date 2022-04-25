// python -m http.server 8000

// ****************************************************************
/* PART 1: MAP A SINGLE GEOJSON POINT*/
// ****************************************************************

// Create the map object with center at the San Francisco airport.
// let map = L.map("mapid").setView([37.5, -122.5], 10);

// Add GeoJSON data.
// let sanFranAirport = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {
//         id: "3469",
//         name: "San Francisco International Airport",
//         city: "San Francisco",
//         country: "United States",
//         faa: "SFO",
//         icao: "KSFO",
//         alt: "13",
//         "tz-offset": "-8",
//         dst: "A",
//         tz: "America/Los_Angeles"
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-122.375, 37.61899948120117]
//       }
//     }
//   ]
// };

//grabbing our GeoJSON data
// L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
// We turn each feature into a marker on the map.
//   pointToLayer: function (feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng).bindPopup(
//       "<h2>" + feature.properties.city + "</h2>"
//     );
//   }
// }).addTo(map);

// Other way of grabbing GeoJSON data using onEachFeature
// L.geoJson(sanFranAirport, {
//   onEachFeature: function (feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + feature.properties.city + "</h2>");
//   }
// }).addTo(map);

// Note: To display data on a map with a popup marker, we have to bind the marker with the GeoJSON layer, L.geoJSON(), using a callback function.

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer(
//   "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
//   }
// );

// streets.addTo(map);

// ****************************************************************
/* PART 2: MAP MULTIPLE GEOJSON POINTS*/
// ****************************************************************

// Create the map object with center and zoom level.
// let map = L.map("mapid").setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  }
);

// We create the tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  }
);

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map("mapid", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// streets.addTo(map);

// Accessing the airport GeoJSON URL
// let airportData =
//   "https://raw.githubusercontent.com/alelee93/Mapping_Earthquakes/main/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods =
  "https://raw.githubusercontent.com/alelee93/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle2 = {
  color: "#ffffa1",
  weight: 2
};

d3.json(torontoHoods).then(function (data) {
  console.log(data);
  L.geoJson(data).addTo(map);
});
