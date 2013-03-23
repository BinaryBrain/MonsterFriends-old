# Socket.io Events
## Server -> Client

# General
`error( { type: "ERROR_???", msg: "Error: ???" })`: Send an error to the user  
`ok`: Everything is good with the request

### Fight
`welcome({ friends: [{ id: facebookID, name: facebookName, ... }, ... ] })`: The user has been authenticated with Facebook
`new-fight({ fid: fightID, id: enemyID })`: Tell the user he has been attacked by an another user
`attack({ id: attackID, name: "name", type: "type", dmg: 42, msg: "Wow! A fireball!", ... })`: The user's friends is attacked

## Client -> Server
### General

### Fight
`ask-fight({ id: enemyID })`: User asks the server to create a new fight against an enemy
`attack({ fid: fightID, aid: attackID })`: The user attack the enemy user
