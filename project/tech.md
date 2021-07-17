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
    -> Still researching how to display routes

**Carbon Interface**
- Calculates carbon emission estimate for each route given distance and vehicle data
- Will display these estimates on the map

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

[Replace with image of final flowchart]