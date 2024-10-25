# TEST BASIC CRUD

build with express, postgresql 14, typescript

### USAGE

- clone the project :

``` bash
git clone https://github.com/Stoic2002/test-farmagitechs.git
```

- open the folder :

``` bash
cd test-farmagitechs
```

``` bash
cd 'test basic crud'
```

- install package :

``` bash
npm install
```

- set up the .env file :

```
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=24h
```

- database migrate :

``` bash
npm run migrate
```

- add user to database :

``` bash
npm run seed
```
- default user:
```
username : admin
passowrd : admin 
```
- run server :

``` bash
npm run dev
```

### POSTMAN DOCUMENTATION

https://documenter.getpostman.com/view/29122257/2sAY4si4Pc






