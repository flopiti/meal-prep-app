
## Set variables

What's up, to get started you only need to set auth0 variables. 

First copy the the `.env.template` file and call it `.env.local`, you'll see you have two values missing:

- AUTH0_SECRET: to get that value, use the following command to generate the string randomly: 
```
openssl rand -hex 32
```
- AUTH0_CLIENT_SECRET: That one is available in your Auth0 Dashboard.


## Run

Then you have two options to get started to run it locally:

1. Mock Data: 

If you are developing locally using only the front-end app, you can use our mock-data json server. To get it all started at once, just run the following command:

```
docker compose -f docker-compose.dev.yml up --build
```


2. Local Backend:

If you want to run the front-end connected a back-end also running locally, you can do so by running the following command:
```
docker compose -f docker-compose.dev.yml -f docker-compose.local-backend.yml up --build
```
