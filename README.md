# The Bike Store
Visit the deployed website [here](https://bike-store-agusgs.herokuapp.com/) 

### Development Setup
##### Prerequisites

The setups steps expect following tools installed on the system.

- git
- Ruby 2.7.3
- bundler 2.2.17
- Node 14.17.0
- yarn 1.22.10
- PostgreSQL

Optionally you can use docker and docker-compose to run the database server, check docker-compose.yml

##### 1. Check out the repository

```bash
git clone git@github.com:agusgs/bike-store.git
```

##### 2. Install dependencies

```bash
bundle install
yarn install
```

##### 3. Environment variables

You have an example of the required environment variables in .env-samples

##### 4. Create and setup the database

Run the following commands to create and setup the database.

```bash
bundle exec rails db:create
bundle exec rails db:setup
```

##### 5. Start the Rails server

You can start the rails server using the command given below.

```bash
bundle exec rails s
```

And now you can visit the site with the URL http://localhost:3000

##### 6. Run tests

We have tests both on backend and frontend.
To run the backend tests:
```bash
bundle exec rails test
```

To run the frontend tests:
```bash
yarn test
```

You can also run jest tests in watch mode 
```bash
yarn test-watch
```

