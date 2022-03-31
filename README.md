# Small webstore app with user and admin UI

- An Express web server
- A PostgreSQL database
- A React client part with Redux central state manager

And you want it to work locally as well as be easy to deploy?

We've got your back:

## Deployment

Web application was deployed to https://damp-garden-20186.herokuapp.com/

## Local Development

Clone repository to your local folder and run `npm i`

To seed dummy data just run `npm run db:build` script

Run `npm run server:dev` to start the web server.

In a second terminal navigate back to the local repo and run `npm run client:dev` to start the react server.

This is set up to run on a proxy, so that you can make calls back to your `api` without needing absolute paths.

Once both dev commands are running, you can start developing... the server restarts thanks to `nodemon`, and the client restarts thanks to `react-scripts`.

### Project Structure

```bash
├── db
│   ├── index.js
│   ├── init_db.js
│   └── ...different db calls
├── middleware
│   ├── ...different middleware services
├── index.js
├── package.json
├── public
│   ├── index.html
│   └── fav.ico
├── routes
│   ├── index.js
│   └── ...different routes
└── src
    ├── api
    │   └── ...different api calls
    ├── index.js
    ├── components
    │   ├── App.js
    │   ├── App.css
    │   └── ...other components
    ├── pages
    │   └── ...app pages
    ├── store
    │   └── ...redux store slices
    └── index.js
```

Top level `index.js` is Express Server. Server is responsible for setting up API, starting server, and connecting to database.

Inside `/db` you could see `index.js` which is responsible for creating all of your database connection functions, and `init_db.js` which runs when you need to rebuild tables and seed data.

Inside `/routes` you could see `index.js` which is responsible for building the `apiRouter`, which is attached in the express server. This was built all routes that React application uses to send/receive data via JSON.

Lastly `/public` and `/src` are the two puzzle pieces for React front-end part of application. `/public` contains any static files necessary for your front-end. This can include images, a favicon, and most importantly the `index.html` that is the root of your React application.
