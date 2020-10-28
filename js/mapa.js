var mymap = L.map('mapa');
var hosp = L.icon({iconUrl:'img/hospital.png',iconSize:[20, 20]});
var pers = L.icon({iconUrl:'img/persona.png',iconSize:[30, 30]});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVhbnZhY2ExOTk2IiwiYSI6ImNrZXdtYWVxNTBiNmQyc2szcWJsZ2s3cXkifQ.GpC3IyP3dgvsxAE_sluttw'
}).addTo(mymap);

function onEachFeature(feature, layer){
    var popupContent = "";
    if (feature.properties && feature.properties.popupContent){
        popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
}

L.geoJSON(hospitales, {
    style: function(feature){
        return feature.properties && feature.properties.style;
    },
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: hosp
        });
    }
}).addTo(mymap);

function onLocationFound(e){
    var radius = e.accuracy/2;
    L.marker(e.latlng, {icon: pers}).addTo(mymap).bindPopup("Te encuentras dentro de este radio...").openPopup();
    L.circle(e.latlng, radius, {color:'#004B51'}).addTo(mymap);
}

function onLocationError(e){
    alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

mymap.locate({setView: true, maxZoom: 15});