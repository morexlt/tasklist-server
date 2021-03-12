# BackEnd of the Tasklist

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Only Run](#only-run)
* [Run all together](#run-all-together)
* [Setup](#setup)
* [Test](#test)

## General info
This project is the BackEnd of the Tasklist Challenge
	
## Technologies
Project is created with:
* [express](https://github.com/expressjs/express) version: 0.21.1
* [axios](https://github.com/axios/axios) version: 0.21.1
* [cors](https://github.com/expressjs/cors) 2.8.5
* [mongo](https://github.com/mongodb/node-mongodb-native): 3.6.3
* [uuid](https://github.com/uuidjs/uuid): 8.2.0
* [dotenv](https://github.com/motdotla/dotenv) 8.2.0


* [wait-for-it.sh](https://github.com/vishnubob/wait-for-it) 
We need this script because as docker-compose it waits only for the container to be created and not for the service to be ready. This script waits for mongo to start normally so that the Backend can connect.

	
## Only Run
To only run this project, we need docker and docker-compose installed

First clone the project
```bash
git clone https://github.com/morexlt/tasklist-server
cd tasklist-server
```
Then you can only run the server:
```bash
docker-compose up
```

## Run all together
You can run the Backend with the Frontend with only one command

First clone the project
```bash
git clone https://github.com/morexlt/tasklist-server
git clone https://github.com/morexlt/tasklist-client
cd tasklist-server
```
Then you can only run the all:
```bash
docker-compose -f docker-compose.yml -f docker-compose.withClient.yml up
```
Then go to [http://localhost:3000](http://localhost:3000)

## Setup
To run this project localy without using npm we need a mongo server running

```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```
First clone the project
```bash
git clone https://github.com/morexlt/tasklist-server
cd tasklist-server
```
Then install dependencies
```bash
nvm install
```
```bash
cp .env.example .env
```
In order to use the extenal mongodb we need to change in .env the next variable


```bash
MONGODB_URL=localhost
```
Finally
```bash
npm install
npm start
```

## Test
To test this project you need to run this commands

```bash
nvm install
cp .env.example .env
npm install
npm run test
```
