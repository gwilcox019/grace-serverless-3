# Technologies

### Back-end

**JavaScript**
- Communicates with UI, APIs, and Azure Function
- Requests and displays makes/models drop downs
- Gets route information from MapQuest and sends distances to Azure function
- Receives and displays final emissions estimates

**Azure Function App**
- Node.js function that communicates with Carbon Interface API
- Sends route information, receives emissions estimates
- HTTP trigger called from main JavaScript function

### APIs

**MapQuest**
- API: Generates distances of routes using Alternate Routes request given start and end points
- SDK: Generates and displays routes on interactive map

**Carbon Interface**
- Request lists of makes and models for user selection
- Calculates carbon emission estimate for each route given distance and vehicle data 

### Packages/Libraries/Databases

**Node-fetch**
- Sends http requests to the APIs

### Front-end Languages

**HTML**
- User input: text inputs for start/destination, select menus for makes/models, button for submission
- Output: table of routes and emissions data, interactive map via MapQuest SDK

**CSS**
- BootStrap used for styling of input, dropdowns, etc

### Flowchart
When the webpage loads, the JS function retrieves the makes list and displays it to the page. The process is repeated with the models list once a make selection is made. Upon the submission of the vehicle information and starting and ending locations, the JS function sends requests to both the MapQuest SDK and API. The former generates and displays the routes directly to the webpage, while the API is simply used to get distance data, which is then sent to the Azure Function. The HTTP trigger function send emissions requests to Carbon Interface for each route, and then returns that data to the JS function. With all necessary data collected, the JS function updates the HTML page to display the routes and emissions in a table.

Links for resources:

- MapQuest API and SDK: https://developer.mapquest.com/documentation/
- Carbon Interface vehicle estimate: https://docs.carboninterface.com/#/?id=vehicle

