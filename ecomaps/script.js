window.onload = getVehicleMakes();
let makesData;
let modelsData;

$(document).ready(function() {
    $('.search').select2();
});

async function getVehicleMakes() {

    /*var vehicleMakeDropDown = document.getElementById("vehicleMakeDropDown");

    let resp = await fetch('https://www.carboninterface.com/api/v1/vehicle_makes', {
        method: 'GET',
        headers: {"Authorization": "Bearer yuOUDR0mdVvYdwadfdR7Sg"}
    })
    makesData = await resp.json();

    for (i = 0; i < makesData.length; i++) {
        var make = makesData[i].data.attributes.name;
        var item = document.createElement("option");
        item.text = make;
        item.value = i;
        vehicleMakeDropDown.add(item);
    } */

    var vehicleMakeDropDown = document.getElementById("vehicleMakeDropDown");

    var item1 = document.createElement("option");
    item1.text = "Toyota";
    vehicleMakeDropDown.add(item1);

    var item2 = document.createElement("option");
    item2.text = "Honda";
    vehicleMakeDropDown.add(item2);
}

async function getVehicleModels() {
    /*let makeIndex = document.getElementById("vehicleMakeDropDown").value;
    let makeID = makesData[makeIndex].data.id;

    var vehicleModelDropDown = document.getElementById("vehicleModelDropDown");

    let resp = await fetch('https://www.carboninterface.com/api/v1/vehicle_makes/' + makeID + '/vehicle_models', {
        method: 'GET',
        headers: {"Authorization": "Bearer yuOUDR0mdVvYdwadfdR7Sg"}
    })
    modelsData = await resp.json();

    for (i = 0; i < modelsData.length; i++) {
        var model = modelsData[i].data.attributes.name + " " + modelsData[i].data.attributes.year;
        if (i > 0 && model != modelsData[i - 1].data.attributes.name + " " + modelsData[i - 1].data.attributes.year) {
            var item = document.createElement("option");
            item.text = model;
            item.value = i;
            vehicleModelDropDown.add(item);
        }
    } */

    var vehicleModelDropDown = document.getElementById("vehicleModelDropDown");

    var item1 = document.createElement("option");
    item1.text = "car1";
    vehicleModelDropDown.add(item1);

    var item2 = document.createElement("option");
    item2.text = "car2";
    vehicleModelDropDown.add(item2);
}

async function sendData() {
    /*let modelIndex = document.getElementById("vehicleModelDropDown").value;
    let modelID = modelsData[modelIndex].data.id;*/

    let params = new URLSearchParams({
        "start" : document.getElementById("start"),
        "destination" : document.getElementById("destination"),
        "maxRoutes" : 3,
        //"modelID" : modelID
        "modelID" : "randomID"
    })

    let resp = await fetch("https://wilcox-final-project.azurewebsites.net/api/ecomaps?code=pta3QcaZ2Sau1QHzon7zKhHh3PA9gvjCa6ECgQGuaKleAkTSRs584A==" + '&' + params.toString(), {
        method: 'POST',
    });
    data = await resp.json();

    console.log(data);

    showRoutes();

    let table = document.getElementById("results");
    for (i = 0; i < data.distances.length; i++) {
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(-1);
        var name = document.createElement("td");
        name.text = i + 1;
        cell1.appendChild(name);

        var cell2 = row.insertCell(-1);
        var time = document.createElement("td");
        time.text = data.times[i];
        cell2.appendChild(time);

        var cell3 = row.insertCell(-1);
        var distance = document.createElement("td");
        distance.text = data.distances[i];
        cell3.appendChild(distance);

        var cell4 = row.insertCell(-1);
        var estimate = document.createElement("td");
        estimate.text = data.estimates[i];
        cell4.appendChild(estimate);
    }
}

function showRoutes() {
    L.mapquest.key = '9UBCaLZa6RAYnOH5gKrOWperISGcAITh';

    var directions = L.mapquest.directions();
    directions.route({
      start: document.getElementById("start").value,
      end: document.getElementById("destination").value,
      options: {
          timeOverage: 100,
          maxRoutes: document.getElementById("numRoutes").value,
        }
    }, createMap);

    function createMap(err, response) {
      var map = L.mapquest.map('map', {
        center: [0, 0],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
      });

      var customLayer = L.mapquest.directionsLayer({
        startMarker: {
          icon: 'circle',
          iconOptions: {
            size: 'sm',
            primaryColor: '#1fc715',
            secondaryColor: '#1fc715',
            symbol: 'A'
          },
          title: 'Drag to change location'
        },
        endMarker: {
          icon: 'circle',
          iconOptions: {
            size: 'sm',
            primaryColor: '#1fc715',
            secondaryColor: '#1fc715',
            symbol: 'B'
          },
          title: 'Drag to change location'
        },
        routeRibbon: {
          color: "#00FF00",
          opacity: 1.0,
          showTraffic: false
        },
        directionsResponse: response
      });

      customLayer.addTo(map);
      
      customLayer.on('route_selected', function(eventResponse) {
        console.log(eventResponse);
      });
    }
  }