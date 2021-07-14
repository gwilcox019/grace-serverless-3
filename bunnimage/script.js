//const { pathToFileURL } = require("node:url");

async function getImage(event) {
    event.preventDefault();
    if(document.getElementById('name').value != ''){
        $('#output').text("Thanks!");
    }
    else {
        alert("No name error.");
    }
    
    var bunniForm = document.getElementById("myform");
    var payload = new FormData(bunniForm);
    const file = fileInput.files[0]; // fileInput is the file upload input element
    payload.append(document.getElementById('name').value, file);
    
    var myHeaders = new Headers();
    myHeaders.appends('content-type', 'file')
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