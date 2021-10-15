# Interop for t##

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each team member must verify interoperability with the client and server from another team.
Each of the different aspects of the protocol must be verified.
We will discuss these issues with the other team and create defects in GitHub for any problems found in our system.
 
### Other Teams

This table lists each student in the team, the team they verified interoperability with, and the time to complete the testing.

| Name | Team | Time |
| ---- | ---- | ---- |
| Christian Carnahan | 08 | 30 min |
| Evan | t25 | 45 minutes |


### Client Problems found

We found these problems when connecting our client to another team's server.

| team | problem | github# |
| :--- |  :--- | --- |
| 08 | We do not disable features in the client and allow ourselves to connect to a team with less features implemented than ourselves. While I believe this is intentional on our end, it may be an issue that we should look at fixing in the future. | TBD |
| 25 | Distances aren't rendered yet in Itinerary | #439 |

### Server Problems found

We found these problems when connecting the other team's client to our server.

| team |  problem | github# |
| :--- |  :--- | --- |
| 08 | Unable to connect to our server. It would not register that our client exists. The name would not change nor would it show our supported features. THIS IS NOT AN ISSUE WITH OUR CODE. | N/A |
| 25 | Random doesn't return random results | #492 |