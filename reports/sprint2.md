# Sprint 2 - *t17* - *We Push To Main*

## Goal
### *Find places to go.*

## Sprint Leader: 
### *Christian Carnahan*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

The first epic that our team chose to take on is the "Find Places" epic. The purpose of this epic is to allow a user to input a string in order to find a place to add to their trip. Given the string, we are going to produce a list of matching places and the details of those places and allow the user to select one or more of these places to add to their trip. In order to implement this epic, we are going to need to implement the protocol find feature. In order to implement the find protocol we are going to need to break it down into a bunch of smaller tasks. Some of these tasks include adding FindRequest.json and FindResponse.json to the schemas directory, implementing the Find Request Class and creating tests in order to test the find feature.

The second epic that our team chose to take on is the "Interoperability" epic. The purpose of this epic is to allow the client to be able to use different services (other teams servers) in order to plan their trip. This epic is going to allow for a seamless user experience no matter which server they want to use to plan their trip. This epic is going to allow the users to change to a different server and then list the features that are avaliable to the client on that server. Our client also need to verify that the barebones features are avaliable and if they are not, we need to let the users know.

The third epic that our team chose to take on is the "Where Am I?" epic. This epic is very straight forward. This epic is going to allow the client to add their current location to the trip rather than just adding the base home location. 
<p>The fourth epic will be adding highlighting to the user experience. This will allow the user to select a place in the trip list and have it highlighted with a marker on the screen.</p>
<p>
The last epic that we hope to complete is the "Where is?" epic.  The purpose behind this epic is to enhance the user experience and allow them to have more control over their trip planning.  For example, when the user enters a latitude and longitude the map should update to reflect the values that were entered.  The user should also have the option to add that specific location to their trip.  Like with all user input, the inputted values should be validated once entered.  After the map is updated to show the location which the user entered, it should also show more details about the location using reverse geocoding.
</p>

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *0* |
| Tasks |  *6*   | *0* | 
| Story Points |  *7*  | *0* | 

<p>We feel confident in getting all of these tasks completed. Based on the last sprint, we were able to get all tasks done within the 2 week period. Judging by the extra week for this sprint, and not having to spend a week setting up VS Code, we should be able to complete all of the tasks we selected.</p>

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *9/14/21* | *none, ...* | *#126, #127, 128, #130, #131* | Dylan's Computer Keeps Breaking. | 


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time