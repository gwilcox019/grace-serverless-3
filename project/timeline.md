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
- [ ] Create and deploy HTTP trigger function
- [ ] Make sure function is correctly saved to Azure function app

### MapQuest API:

#### Description
- Send post request to MapQuest with start and end locations and receive back potential routes

#### ETA:
- 20 min (+ debug time)

#### Objective:
- [ ] Get access to the API key (set up account?)
- [ ] Send POST request with start and end locations, number of routes
- [ ] Get data back in readable format and have access to distance for each route

### Carbon Interface API:

#### Description
- Send post request to Carbon Interface with vehicle information and distance and receive back carbon emissions for each route

#### ETA:
- 30 min (+ debug time)

#### Objective:
- [ ] Get access to the API key (set up account?)
- [ ] Send POST request with vehicle information, distance (from MapQuest request) for each route
- [ ] Receive back carbon emissions per route

## Week 3 - FRONT END

### Make HTML webpage:

#### Description
- Make the basic webpage that users will interact with

#### ETA:
- 20 min

#### Objective:
- [ ] Create standard HTML page with the following data entry points:
- [ ] Drop down with vehicle make/model options
- [ ] Text option to submit starting and ending locations
- [ ] Output to show carbon emissions for each route

### Connect to back end:

#### Description
- Create script.js file that allows the HTML page to interact with the back end

#### ETA:
- 30 min (+ debug time)

#### Objective:
- [ ] Create script.js that sends a post request to the back end azure function
- [ ] Request should include vehicle information and starting and ending locations
- [ ] Once routes and carbon data are returned, update webpage

### Map!:

#### Description
- Display (interactive?) map and have it show the potential routes returned by MapQuest request

#### ETA:
- 1 hr (+ debugging)

#### Objective:
> Hoping to work on this during a mentor meeting/work session
- [ ] Not yet sure what this will all involve, will need help from mentor

## Week 4 - FINISHING TOUCHES

### Testing:

#### Description
- Finish up any left over debugging, continue work as needed on the map functionality

#### ETA:
- 1-2 hrs (debugging as needed)

#### Objective:
> Main things to test using Postman (back end) and LiveServer (front end)
- [ ] Back end functionality (requests to both APIs)
- [ ] Front end functionality (catching improper input, proper data display)
- [ ] Map?

### Make it pretty:

#### Description
- Have fun with CSS to make the UI easy to use and aesthetically pleasing

#### ETA:
- As long as I want/have time for

#### Objective:
- [ ] Overall layout: does placement of input/output/headers/map make sense?
- [ ] Font size/style/color
- [ ] Background colors/eco-friendly themed?
