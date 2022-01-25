## CIS 4914 Project Database University of Florida

Just a Simple Express API

## To Run Locally

- Install `node` and `npm` with OS package manager

- Clone down this repository.
    - `git clone https://github.com/MenkeTechnologies/CIS4914ProjectDatabaseAPI`

- Install local libraries
    - `npm install`

- Start Server:
    - `npm start`

Server will run on `localhost:4000`

Create secret.json with format:

> secret.json

```json
{
    "connection": "mongodb://USER:PASSWORD=@IP:PORT/?authSource=admin"
}
```
