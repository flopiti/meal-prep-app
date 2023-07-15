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

## Screen mock ups

<img width="867" alt="Screenshot 2023-06-12 at 2 40 31 PM" src="https://github.com/flopiti/meal-prep-app/assets/72895761/226c79cb-ffbc-4191-9ca8-7c5d07bbf1bb">
<img width="864" alt="Screenshot 2023-06-12 at 2 41 06 PM" src="https://github.com/flopiti/meal-prep-app/assets/72895761/3d637b5a-90b9-4c33-815a-aa4bb6bd7179">
<img width="878" alt="Screenshot 2023-06-12 at 2 41 24 PM" src="https://github.com/flopiti/meal-prep-app/assets/72895761/14a2c36e-e996-4839-a711-c1a075d9c8b1">
