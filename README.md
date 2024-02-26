# Setup

## Environement variables

```
cd frontend # (do the same with backend and e2e-tests folders after copying .env like below)
cp .env.example .env
```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add it to `.env.example`.

# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

### Start the DB

```sh
docker-compose up db
```

This will start a postgresql db listening on localhost:5432.

### Start the backend

```sh
cd backend
npm i && npm run dev
```

### Start the front

```sh
cd frontend
npm i && npm run dev
```
