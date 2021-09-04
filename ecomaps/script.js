window.onload = getVehicleMakes(); //autopopulate the vehicle makes and models dropdowns on load

let makesData; // list of vehicle makes
let modelsData; // list of vehicle models for the given make
var map; // map
let distances = []; // list of distances for each route

// button functionality: disable button when page is loading and vehicle options are populating
$(document).ready(function() {
    document.getElementById("start").addEventListener('keyup', enableDisableSubmitButton );
    document.getElementById("destination").addEventListener('keyup', enableDisableSubmitButton );
    enableDisableSubmitButton();
    getVehicleMakes();
});

// disables button
function disableButton() {
    var btn = document.getElementById("button")
    btn.setAttribute("disabled", null)
}
  
// enables button
function enableButton() {
    var btn = document.getElementById("button")
    btn.removeAttribute("disabled")
  
}
  
// disables button and shows progress spinner
function DisableButtonAndShowProgress(){
    disableButton();
    var spinner = document.getElementById("btnspinner")
    spinner.classList.remove("d-none")
}
  
// enables button and gets rid of spinner
function EnableButtonAndHideProgress(){
    enableButton();
    var spinner = document.getElementById("btnspinner")
    spinner.classList.add("d-none")
}

// disables button if missing start or destination data
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

// retrieves list of vehicle makes from Carbon Interface and shows them in drop down
async function getVehicleMakes() {

    disableButton();
    var vehicleMakeDropDown = document.getElementById("vehicleMakeDropDown");

    try {
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
    } catch(error) {
        console.log("Vehicle makes request failed")
        alert("Could not retrieve vehicle makes :( Try again!");
    }

    getVehicleModels();
    enableButton();
}

// retrieves list of vehicle models for given make and displays in drop down
async function getVehicleModels() {

    disableButton();

    let makeIndex = document.getElementById("vehicleMakeDropDown").value;
    let makeID = makesData[makeIndex].data.id;

    var vehicleModelDropDown = document.getElementById("vehicleModelDropDown");

    try {
        for (i = vehicleModelDropDown.options.length - 1; i >= 0; i--)
            vehicleModelDropDown.remove(i);

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
    } catch (error) {
        console.log("Vehicle models request failed")
        alert("Could not retrieve vehicle models :( Try again!");
    }

    vehicleModelDropDown.removeAttribute("disabled")
    enableButton();
}

// generates map and routes, sends distances to get estimates
async function sendData() {

    // check that start and destination have been input
    var startData = document.getElementById("start").value;
    var destData = document.getElementById("destination").value;
    if (startData == "" || destData == "") {
        alert("Enter the start and destination locations!");
        return;
    }

    DisableButtonAndShowProgress();

    // generate map
    try { 
        showRoutes(); 
    } catch (error) {
        console.log("map display failed");
        alert("Looks like something went wrong :( Try again!");
        return;
    } 

    // get routes and distances from MapQuest
    try {
        let routesResp = await fetch('http://www.mapquestapi.com/directions/v2/alternateroutes?key=9UBCaLZa6RAYnOH5gKrOWperISGcAITh&from=' 
            + startData + '&to=' + destData + '&maxRoutes=' + document.getElementById("numRoutes").value 
            + '&timeOverage=100');
        let routesInfo = await routesResp.json();

        // save distances from each route
        distances[0] = routesInfo.route.distance;
        if (routesInfo.route.hasOwnProperty('alternateRoutes')) {
            for (i = 0; i < routesInfo.route.alternateRoutes.length; i++) {
                distances[i + 1] = routesInfo.route.alternateRoutes[i].route.distance;
            }
        }
    } catch (error) {
        console.log("MapQuest API alternate routes call failed");
        alert("Looks like something went wrong :( Try again!");
        return;
    }

    // get vehicle model ID
    let modelIndex = document.getElementById("vehicleModelDropDown").value;
    let modelID = modelsData[modelIndex].data.id;

    // send request to Azure function to get estimates
    try {
        let resp = await fetch("https://wilcox-final-project.azurewebsites.net/api/ecomaps?code=pta3QcaZ2Sau1QHzon7zKhHh3PA9gvjCa6ECgQGuaKleAkTSRs584A==", {
            method: 'POST',
            body: JSON.stringify(distances),
            headers: {
                'modelID' : modelID,
                'Content-Type' : 'application/json'
            }
        });
        estimatesData = await resp.json();
    } catch (error) {
        console.log("Azure function call failed");
        alert("Looks like something went wrong :( Try again!");
        return;
    }

    // display information in table
    let responseTable = document.getElementById("results");
    responseTable.style.display = "block";

    let oldtableBody = document.getElementById("resultsBody");
    let tableBody = document.createElement('tbody');

    for (i = 0; i < distances.length; i++) {
        var row = document.createElement("tr");

        // route number
        var cellIndex = document.createElement("td");
        var indexValue = document.createTextNode(i+1);
        cellIndex.appendChild(indexValue);
        row.appendChild(cellIndex);

        // distance
        var cellDistance = document.createElement("td");
        var distance = document.createTextNode(distances[i] + " mi");
        cellDistance.appendChild(distance);
        row.appendChild(cellDistance);

        // carbon estimate
        var cellEmission = document.createElement("td");
        var emission = document.createTextNode(estimatesData.estimates[i].data.attributes.carbon_lb + " lbs carbon");
        cellEmission.appendChild(emission);
        row.appendChild(cellEmission);

        tableBody.appendChild(row);
    }

    tableBody.id = "resultsBody";
    responseTable.replaceChild(tableBody, oldtableBody);

    EnableButtonAndHideProgress();
}

// generates map and displays routes
function showRoutes() {
    L.mapquest.key = '9UBCaLZa6RAYnOH5gKrOWperISGcAITh';

    // get directions
    var directions = L.mapquest.directions();
    directions.route({
      start: document.getElementById("start").value,
      end: document.getElementById("destination").value,
      options: {
          timeOverage: 100,
          maxRoutes: document.getElementById("numRoutes").value,
        }
    }, createMap);

    // create map (call back function)
    function createMap(err, response) {
        if (map == undefined) {
            map = L.mapquest.map('map', {
                center: [0, 0],
                layers: L.mapquest.tileLayer('map'),
                zoom: 12
            });
        }

      // layer to display the routes
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