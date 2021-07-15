//const { pathToFileURL } = require("node:url");

async function getImage(event) {
    event.preventDefault();
    if(document.getElementById('name').value != ''){
        $('#output').text("Thanks!");
    }
    else {
        alert("No name error.");
    }
    
    var payload = new FormData();
   // const file = document.getElementById("myform").files[0]; // fileInput is the file upload input element
    payload.append(document.getElementById('name').value, document.getElementById('image'));
    
    var myHeaders = new Headers();
    myHeaders.append('content-type', 'file')
    myHeaders.append('codename', document.getElementById('name').value)
    try {
        const response = await fetch(process.env.bunnimage_upload_url, {
            method: 'POST',
            body: payload, 
            headers: myHeaders
         });         
    } catch (e) {
        alert("an error occurred");
    }

    $('#output').text("Your image has been stored successfully!");
    
}