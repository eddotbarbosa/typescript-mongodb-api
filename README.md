# Typescript MongoDB API

A project made with typescript and mongodb to experiment some approaches.

## Getting Started

## Features
* authentication
* user crud
* post crud
* tests

## Technologies
* nodejs
* npm
* editorconfig
* eslint
* dotenv
* cors
* express
* body parser
* mongoose
* bcrypt
* jest
* supertest
* jsonwebtoken

## Getting Started
### installation:
```
git init
git clone https://github.com/eddotbarbosa/typescript-mongodb-api.git
npm install
```
### configs:
.env
```
PORT="project port number, default value was set to 5000"
DB_URI="your mongodb URI"
JWT_SECRET="some secrect key"
```
### running:
project in dev mode
```
npm run dev
```
tests
```
npm test
```
build
```
npm build
```
run build
```
npm start
```

## REST API reference

### REST API endpoint list:

| HTTP method | URI path | Description |
|-------------|----------|-------------|
| POST | /users | create user |
| GET | /users/:username | read user |
| PUT | /users | update user infos |
| DELETE | /users | delete user |
| POST | /posts | create a post |
| GET | /posts/:post | read a post |
| PUT | /posts | update a post |
| DELETE | /posts | delete a post |
| POST | /auth/signin | sign in user |
| POST | /auth/signout | sign out user |
| GET | /auth/me | read some user infos |
