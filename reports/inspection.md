# Inspection - Team *T17* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | *tripName.js* |
| Meeting | *10/15/21, 5pm, Microsoft Teams* |
| Checklist | *t17/reports/checklist.md* |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Christian | 40 min |
| Evan | 35 min |
| Ethan | 30 min |
| Dylan | 30 min |



### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| TripName.js:47,48,50 | Boolean operators should be !==/=== instead of !=/== | low | Evan | #513 |
| TripName.js:41 | Move TripInput function to own file | med | Christian (carnhy) | #501 |
| TripName.js:62-78 | Move LoadTripButton to own file | med | Christian (carnhy) | #502 |
| TripNAme.js:21-23 | handleClick should be deleted, all calls to handleClick should be a call to changeCursor | low | Dylan | #516 |
|  TripName.js:41-59 | Move TripInput function to own file | med | Ethan (ethamCS) | #501 |
|  TripName.js:62-78 | Move LoadTripButton to own file | med | Christian (carnhy) | #502 |

