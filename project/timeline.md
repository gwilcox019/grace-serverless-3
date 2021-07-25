# Timeline

## Week 1 - PROJECT IDEA AND ORGANIZATION

### Finish provided final project steps:

#### Description
- Follow steps provided by camp to 'lay the groundwork' and get my project started

#### ETA:
- a few hours

#### Objective:
- [ ] Come up with basic project idea
- [ ] Determine what technologies will be needed and create flowchart to show their functionality
- [ ] Create project timeline

## Week 2 - BACK END

### Create Azure Function:

#### Description
- Make the basic Azure function to make sure new Azure account is up and running

#### ETA:
- 10 mins

#### Objective:
- [ ] Create and deploy HTTP trigger function -> 2 min
- [ ] Make sure function is correctly saved to Azure function app -> 5 min

### MapQuest API:

#### Description
- Send post request to MapQuest with start and end locations and receive back potential routes

#### ETA:
- 3-4 hrs

#### Objective:
- [ ] Get access to the API key (set up account?) -> 10 min
- [ ] Send POST request with start and end locations, number of routes via Postman -> 1 hr
- [ ] Code POST request to MapQuest API in Azure function, test with Postman -> 1 hr
- [ ] Organize response to include session ID and distance for each route -> 1 hr

### Carbon Interface API:

#### Description
- Send post request to Carbon Interface with vehicle information and distance and receive back carbon emissions for each route

#### ETA:
- 3-4 hrs (+ debug time)

#### Objective:
- [ ] Get access to the API key (set up account?) -> 10 min
- [ ] Send POST request with vehicle information, distance to Carbon Interface API via Postman -> 1 hr
- [ ] Write function that sends that POST request from Azure Function, test with Postman -> 1 hr
- [ ] Create loop that calls that function for each route received from MapQuest -> 30 min
- [ ] Organize carbon emission estimates -> 30 min

## Week 3 - FRONT END

### Make HTML webpage:

#### Description
- Make the basic webpage that users will interact with

#### ETA:
- 2-3 hrs

#### Objective:
- [ ] Create visual graphic of UI -> 1 hr
- Start with standard HTML page with the following data entry points (to match the graphic): -> 1 hr
- [ ] Drop down with vehicle make/model options
- [ ] Text option to submit starting and ending locations
- [ ] Output to show carbon emissions for each route
- [ ] Add map from MapQuest.js -> 30 min

### Connect to back end:

#### Description
- Create script.js file that allows the HTML page to interact with the back end

#### ETA:
- 6 hrs

#### Objective:
- [ ] Create script.js that sends a post request to the back end Azure function on submit -> 1 hr
- [ ] Add carbon emissions data to webpage upon return from Azure function -> 1 hr
- [ ] Use session ID from Azure function to get a routeShape from MapQuest.js in Postman -> 1 hr
- [ ] Write code to send routeShape request and create directionsLayer from script.js -> 1 hr
- [ ] Test (and probably debug) entire mechanism via LiveServer! -> 2 hrs

## Week 4 - FINISHING TOUCHES

### Testing and debugging:

#### Description
- Finish up any left over debugging and account for all potential errors

#### ETA:
- 1-2 hrs (debugging as needed)

#### Objective:
> Main things to check for:
- [ ] APIs are down/ratelimiting
- [ ] Azure is down
- [ ] Improper user input (locations, vehicle info, # of routes)

### Make it pretty:

#### Description
- Have fun with CSS to make the UI easy to use and aesthetically pleasing

#### ETA:
- As long as I want/have time for

#### Objective:
- [ ] Overall layout: does placement of input/output/headers/map make sense?
- [ ] Font size/style/color
- [ ] Background colors/eco-friendly themed?
