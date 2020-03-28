'use strict';


// Application Dependencies

const express = require('express');
const superagent =require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

// Load Enviroment from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.port || 3000;

// Application Middleware
app.use(express.urlencoded({extended:true}));

// Database Setup
const client =
new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(
  methodOverride(req => {
    if (req.body && typeof req.body === 'object' && ' _method' in req.body){
      let method = req.body._method;
      delete req.body._method;
      return method;

    }
  })
);




const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=> {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  res.end('Hello World');    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});