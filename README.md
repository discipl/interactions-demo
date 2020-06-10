# Docker Jolocom RPC Demo

## Usage Instructions

Clone the repository locally then in one terminal:
```sh
docker-compose up
```

Wait for the servers to spin up (see terminal output)

Then visit the frontend development server at http://localhost:3000 

Click 'Start RPC Demo' to create a new RPC session. The frontend will provide a
`docker-compose` command to run the `rpc_agent`. It will look something like

```sh
docker-compose run rpc_agent start eyiusdbfisudfbksdjbs...sdfjkhsdjkfshk
```