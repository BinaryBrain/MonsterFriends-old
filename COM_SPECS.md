# Socket.io Events
## Server -> Client

# General
`error( { type: "ERROR_???", msg: "Error: ???" })`: Send an error to the user  
`ok`: Everything is good with the request

### Fight
`welcome({ friends: [{ id: fbid, name: fbname, ... }, ... ] })`: The user has been authenticated with Facebook
`new-fight({ id: enemyID })`: Tell the user he has been attacked by an another user  

## Client -> Server
### General

### Fight
`new-fight({ id: enemyID })`: User creates a fight against an enemy
