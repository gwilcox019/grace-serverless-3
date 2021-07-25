# Technologies

### Azure Services

**Function App**
- Node.js function that communicates with the two APIs will be deployed to Azure function app
- Function will be activated by HTTP request from webpage

### APIs

**MapQuest**
- Generates quickest routes using Alternate Routes post request given start and end points
- Shows map that indicates those routes
    -> MapQuest.js to show map
    -> Get routes from original request using session ID and routeShape request
    -> Display response as a directionsLayer object

**Carbon Interface**
- Calculates carbon emission estimate for each route given distance and vehicle data
- Will display these estimates associated with each route

### Packages/Libraries/Databases

**Node-fetch**
- Sends http requests to the APIs

### Front-end Languages

**HTML**
- Executes the 'semantics' of the webpage
- Used to organize content
- Includes several text boxes, dropdowns, and a button for user to submit information and activate function

**CSS**
- To make things ~pretty~
- Used to make layout aesthetic and easy to understand

**JavaScript**
- Executes dynamic changes to webpage via 'link' to HTML file
- When user submits info, the JS function will pull the data and send it to the Node.js Azure function
- Final responses will be displayed to website via JS function that manipulates the HTML/CSS as needed

### Flowchart
After the user submits their vehicle information and starting and ending locations, the JavaScript function is called which sends the user input to the HTTP trigger Azure function via a post request. The MapQuest API is called to get the desired routes, and the distance from each route is then used in a call to the Carbon Interface API to get the carbon estimates for each route. The session ID and  information is returned to the JavaScript function, which uses the session ID to have MapQuest.js display the routes on a map. The carbon estimate is then displayed along side the map.

<img width="1022" alt="Screen Shot 2021-07-24 at 21 40 04" src="https://user-images.githubusercontent.com/78289483/126884937-5680c1c5-27fe-42d0-ae7f-21515a1a8c14.png">

Links for resources:

- MapQuest alternate routes: https://developer.mapquest.com/documentation/directions-api/alternate-routes/post/
- MapQuest routeShape: https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-directions-routeshape/
- MapQuest directionsLayer: https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-directions-layer/
- Carbon Interface vehicle estimate: https://docs.carboninterface.com/#/?id=vehicle

