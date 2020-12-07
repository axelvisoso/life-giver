var mymap = L.map('mapa');
var pers = L.icon({iconUrl:'img/persona.png',iconSize:[30, 30]});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVhbnZhY2ExOTk2IiwiYSI6ImNrZXdtYWVxNTBiNmQyc2szcWJsZ2s3cXkifQ.GpC3IyP3dgvsxAE_sluttw'
}).addTo(mymap);

function onLocationFound(e){
    var marker = L.marker(e.latlng, {icon: pers}).addTo(mymap);
    var getmarker = marker.getLatLng();
    localStorage.setItem('latitudP', getmarker.lat);
    localStorage.setItem('longitudP', getmarker.lng);
}

function onLocationError(e){
    alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

mymap.locate({setView: true, maxZoom: 15});

mymap.doubleClickZoom.disable()

var marcador;

mymap.on('click', function (e) {
    if (marcador) {
        mymap.removeLayer(marcador);
    }
    marcador = new L.Marker(e.latlng).addTo(mymap);
    var getmarcador = marcador.getLatLng();
    localStorage.setItem('latitudM', getmarcador.lat);
    localStorage.setItem('longitudM', getmarcador.lng);
});

function makePost(){
    var uid = localStorage.getItem('id');
    var latitudP = localStorage.getItem('latitudP');
    var longitudP = localStorage.getItem('longitudP');
    var latitudM = localStorage.getItem('latitudM');
    var longitudM = localStorage.getItem('longitudM');
    var lat, lng;
    
    if(latitudM == null){
        lat = latitudP;
        lng = longitudP;
    }else{
        lat = latitudM;
        lng = longitudM;
    }  

    const fname = $("#txtNombrePost").val();
    const lname = $("#txtApellidoPost").val();
    const bt = $("#tipoSangrePost").val();
    const desc = $("#txtDescriptionPost").val();
    const estatus = "Activo";

    var id = Date.now();
    firebase.database().ref('posts/' + id).set({
        autor:uid,
        firstName:fname,
        lastName:lname,
        bloodType:bt,
        description:desc,
        latitud: lat,
        longitud:lng,
        status:estatus
    });
    alert('Post creado exitosamente.'); 
    clearPost();
}
function clearPost(){
    document.getElementById("txtNombrePost").value = "";
    document.getElementById("txtApellidoPost").value = "";
    document.getElementById("tipoSangrePost").value = "";
    document.getElementById("txtDescriptionPost").value = "";
}