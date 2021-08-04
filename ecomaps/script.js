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
        "start" : "Columbus, OH",
        "destination" : "Cleveland, OH",
        "maxRoutes" : 3,
        //"modelID" : modelID
        "modelID" : "randomID"
    })

    let resp = await fetch("https://wilcox-final-project.azurewebsites.net/api/ecomaps?code=pta3QcaZ2Sau1QHzon7zKhHh3PA9gvjCa6ECgQGuaKleAkTSRs584A==" + '&' + params.toString(), {
        method: 'POST',
    });
    data = await resp.json();

    console.log(data);
}