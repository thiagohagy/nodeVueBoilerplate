VueBase is a Boilerplate for vuejs, a quick way to create administrative systems with login and password already built with jwt

# Technologies

* Backend in nodejs
* Frontend in javascript (Vuejs) and BootstrapVue

# Support

* Uploads with authenticated routes
* Https

# Features

* Generic components on frontend: Nav, Pagination, CrudHeader and AlertMessage
* Global Mixin
* Complete user and client CRUD (User with upload, we are using Multer on backend )
* Authentication using Vuex
* Http with axios
* VueRouter for route manage

login: _admin_, password: _admin_

# SETUP

```
sudo npm install -g nodemon
```

```
cd backend
cp config.js.dist config.js
npm install
nodemon index.js

cd ..
cd frontend
npm install
npm run serve
```

## Go to:

http://localhost:9090/api/fixture/usuario/1

### this is just to create admin user, login: admin, pass: admin

## Access

http://localhost:8080

And thats all folks!
