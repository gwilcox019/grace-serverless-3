async function getImage(event) {
    //event.preventDefault(); // keeps page from refreshing
    // check that there is name input
    if(document.getElementById('username').value != ''){
        $('#output').text("Thanks!");
        // create form data object from file upload
        var payload = new FormData();
        payload.append("file", document.getElementById("image").files[0]);

        // send post request
        try {
            const response = await fetch('https://wilcox-serverless-1.azurewebsites.net/api/bunnimage-upload?code=gT38MPUIena5VZ287xpoF3LDoC4ceWwCPATmTfYdNxsnMdyt3mE59g==', {
                method: 'POST',
                body: payload, 
                headers: {
                    'codename' : document.getElementById('username').value
                }
            });  
            $('#output').text("Your image has been stored successfully!");       
        } catch (e) {
            alert("an error occurred");
        } 
    }
    else {
        alert("No name error.");
    }
}

async function downloadImage() {
    if(document.getElementById('downloadusername').value != ''){
        $('#output').text("Thanks!");
        try {
            const response = await fetch('https://wilcox-serverless-1.azurewebsites.net/api/bunnimage-download?code=v5VZDxyEfBF/DeeRHiej0t/PFlTp21HPxCczinbnC4dPr8Zx84e1ug==', {
                method: 'GET',
                headers: {
                    'username' : document.getElementById('downloadusername').value
                }
            });
            $('#output').text("Your image has been found!");
            let data = await response.json();
            window.open(data.downloadUri, "_self");
        } catch(e) {
            alert("an error occurred");
        }
    } else {
        alert("No name error.");
    }
}