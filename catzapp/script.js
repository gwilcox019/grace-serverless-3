async function y1k3s() {
    try {
        let params = new URLSearchParams({
            "name1" : document.getElementById("name1").value,
            "name2" : document.getElementById("name2").value,
            "name3" : document.getElementById("name3").value,
            "name4" : document.getElementById("name4").value,  
        })
        const response = await fetch('https://wilcox-serverless-1.azurewebsites.net/api/twocatz?code=3QyUKIUhnjAWoylP8ea7cLzJNva0cs6uQB/sDpYRwGQuuTSoGnD/zA==' + '&' + params.toString(), {
            method: 'GET', 
        });  
        $('#output').text("Thanks!"); 
        let data = await response.json()
        console.log(data);
        document.getElementById("image1").src = "data:image/png;base64," + data.cat1
        document.getElementById("image2").src = "data:image/png;base64," + data.cat2
        document.getElementById("image3").src = "data:image/png;base64," + data.cat3
        document.getElementById("image4").src = "data:image/png;base64," + data.cat4
    } catch (e) {
        alert("an error occurred");
    } 
}