# Sprint 3 - t17 - We Push To Main

## Goal
### *How far is it?*

## Sprint Leader: 
### Evan Ide

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate technical debt ratio less than 3.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

The first epic that we have planned is more of a half epic.  We need to finish the Interoperability epic from Sprint 2.  This shouldn't take too long, because we got a lot of it done in Sprint 2.  All we have left to do is implement the functionality for the Save button in the Server Settings Modal.  It should be unclickable when the provided server does not support the features necessary to run our website, and it should be clickable when the provided server does support the necessary features.  We also need to update our tests to ensure that the new features work as they should.  

The next epic that we intend to complete is the Distances epic.  This involves implementing a new protocol for our website.  The main focus of this epic will be to allow the user to find distances between places on their trip.  The user will also be able to see the total distance for their entire trip.  This epic will consist of both client side changes as well as server side changes, so it should be a relatively involved epic.  We will follow the provided protocol in order to maintain interoperability with all of the servers in the class.  

The third epic that we plan on completing is the load trip epic.  This epic has one main focus: to allow the user to bring up a previously made trip.  This epic will tie in closely with the next epic (save trip), and will be relatively useless without that epic.

The fourth epic that we want to complete is the save trip epic.  As stated in the previous paragraph, this epic will tie in very closely with the load trip epic.  This will allow the user to create a trip and save it to be added to or viewed at a later time.  The user will be able to save their trip in multiple formats that allow it to be opened in other applications as well. They will be able to choose a default format as well, instead of having to specify the type every time they wish to save a trip.  Files will be saved in the local filesystem.

The last epic that we plan to complete will be the Trip name epic.  This will allow the user to set a name for each trip that they create.  We plan to implement this as a small button to enable a text box that the user can enter a name into.  

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *30*   | *count* | 
| Story Points |  *69*  | *sum* | 

We completed 4 epics in Sprint 2, and almost completed one more.  We also completed 74 story points.  We had to spend a lot of time in Sprint 2 learning Javascript and React, so we couldn't finish as much as we had hoped.  We hopefully won't have to do as much learning this sprint, so we will be able to more productive.  On top of that, one of the planned epics is left over from last sprint and is mostly complete already.  

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
