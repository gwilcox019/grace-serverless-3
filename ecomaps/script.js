window.onload = getVehicleMakes();
let makesData;
let modelsData;
var map;
let distances = [];

$(document).ready(function() {
    document.getElementById("start").addEventListener('keyup', enableDisableSubmitButton );
    document.getElementById("destination").addEventListener('keyup', enableDisableSubmitButton );
    enableDisableSubmitButton();
    getVehicleMakes();
});

function disableButton() {
    var btn = document.getElementById("button")
    btn.setAttribute("disabled", null)
}
  
function enableButton() {
    var btn = document.getElementById("button")
    btn.removeAttribute("disabled")
  
}
  
function DisableButtonAndShowProgress(){
    disableButton();
    var spinner = document.getElementById("btnspinner")
    spinner.classList.remove("d-none")
}
  
function EnableButtonAndHideProgress(){
    enableButton();
    var spinner = document.getElementById("btnspinner")
    spinner.classList.add("d-none")
}

function enableDisableSubmitButton() {
  var startData = document.getElementById("start").value;
  var destData = document.getElementById("destination").value;
  if (startData != "" && destData != "") {
    document.getElementById("button").removeAttribute("disabled");
  }
  else {
    document.getElementById("button").setAttribute("disabled", null);
  }
}

async function getVehicleMakes() {

    disableButton();
    var vehicleMakeDropDown = document.getElementById("vehicleMakeDropDown");

    let resp = await fetch('https://www.carboninterface.com/api/v1/vehicle_makes', {
        method: 'GET',
        headers: {"Authorization": "Bearer oQrDMB0AYYOP94S2WuPQIA"}
    })
    makesData = await resp.json();

    for (i = 0; i < makesData.length; i++) {
        var make = makesData[i].data.attributes.name;
        var item = document.createElement("option");
        item.text = make;
        item.value = i;
        vehicleMakeDropDown.add(item);
    } 

    getVehicleModels();
    enableButton();
}

async function getVehicleModels() {

    disableButton();

    let makeIndex = document.getElementById("vehicleMakeDropDown").value;
    let makeID = makesData[makeIndex].data.id;

    var vehicleModelDropDown = document.getElementById("vehicleModelDropDown");

    let resp = await fetch('https://www.carboninterface.com/api/v1/vehicle_makes/' + makeID + '/vehicle_models', {
        method: 'GET',
        headers: {"Authorization": "Bearer oQrDMB0AYYOP94S2WuPQIA"}
    })
    modelsData = await resp.json();

    var model = modelsData[0].data.attributes.name + " " + modelsData[0].data.attributes.year;
    var item = document.createElement("option");
    item.text = model;
    item.value = 0;
    vehicleModelDropDown.add(item);
    
    for (i = 1; i < modelsData.length; i++) {
        var model = modelsData[i].data.attributes.name + " " + modelsData[i].data.attributes.year;
        if (model != modelsData[i - 1].data.attributes.name + " " + modelsData[i - 1].data.attributes.year) {
            var item = document.createElement("option");
            item.text = model;
            item.value = i;
            vehicleModelDropDown.add(item);
        }
    } 

    vehicleModelDropDown.removeAttribute("disabled")
    enableButton();
}

async function sendData() {

    var startData = document.getElementById("start").value;
    var destData = document.getElementById("destination").value;
    if (startData == "" || destData == "") {
        alert("Enter the start and destination locations!");
        return;
    }

    DisableButtonAndShowProgress();

    showRoutes();

    let modelIndex = document.getElementById("vehicleModelDropDown").value;
    let modelID = modelsData[modelIndex].data.id;

    let resp = await fetch("https://wilcox-final-project.azurewebsites.net/api/ecomaps?code=pta3QcaZ2Sau1QHzon7zKhHh3PA9gvjCa6ECgQGuaKleAkTSRs584A==", {
        method: 'POST',
        body: {distances},
        headers: {
            'modelID' : modelID
        }
    });
    data = await resp.json();

    console.log(data);

    let responseTable = document.getElementById("results");

    let oldtableBody = document.getElementById("resultsBody");
    let tableBody = document.createElement('tbody');

    for (i = 0; i < distances.length; i++) {
        var row = document.createElement("tr");

        var cellIndex = document.createElement("td");
        var indexValue = document.createTextNode(i+1);
        cellIndex.appendChild(indexValue);
        row.appendChild(cellIndex);

        var cellDistance = document.createElement("td");
        var distance = document.createTextNode(distances[i]);
        cellDistance.appendChild(distance);
        row.appendChild(cellDistance);

        var cellEmission = document.createElement("td");
        var emission = document.createTextNode(data.estimates[i]);
        cellEmission.appendChild(emission);
        row.appendChild(cellEmission);

        tableBody.appendChild(row);
    }

    tableBody.id = "resultsBody";
    responseTable.replaceChild(tableBody, oldtableBody);

    EnableButtonAndHideProgress();

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
        if (map == undefined) {
            map = L.mapquest.map('map', {
                center: [0, 0],
                layers: L.mapquest.tileLayer('map'),
                zoom: 12
            });
        }

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

      distances[0] = response.route.distance;
      for (i = 0; i < response.route.alternateRoutes.length; i++) {
          distances[i + 1] = response.route.alternateRoutes[i].route.distance;
      }
    }
  }