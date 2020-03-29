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

// Routes
app.get('/', homepage);
app.get('/newuser',userForm);
app.post('/newuser',postUser);
app.get('/courses', courseLookup);
app.get('/courses/:id',getOneCourse);


//Catch-all
app.get('*', (req,res) => res.status(404).send('This route does not exist'));


app.listen(PORT, () => console.log( `Listening on port: ${PORT}`));

function homepage(req,res){
  res.render('pages/index');
}

function userForm(req,res){
  return res.render('pages/newuser')
}
function courseLookup(req,res){
  let SQL = 'Select * from courses;';
  return client.query(SQL)
    .then((courses) => {
      const formattedCourses = formatCoursesForRender (courses.rows);
      //   console.log('ln 66' + formattedCourses);
      return res.render('pages/courses', {courses:formattedCourses});
    })
}
function getOneCourse(req, res){
  let courses;
  const SQL = 'SELECT * FROM Courses where id=$1;';
  return client.query(SQL, [req.params.id])
    .then((courses=>{
      formattedCourses = formatCoursesForRender(courses.rows);
      console.log(courses);
      // let teeSQL= 'SELECT * From TEES where course_id=$1;';
      // return client.query(teeSQL,[req.params.id])
      //   .then((teeResult)=>{

      return res.render('pages/course-detail', {courses,formattedCourses})

    } )

}


function formatCoursesForRender(courses){
  return courses.map((course) => {
    course.idArray = course.id;
    course.nameArray = course.name;
    course.phoneArray = course.phone;
    course.webArray = course.ow;
    course.cityArray= course.city;
    course.stateArray = course.region;
    course.dateArray = course.date_verified;
    // console.log('ln 73' + course.ow);
    return course;
  })
}


function postUser(req,res){
  const username = req.body.username;
  const sqlSelect = 'SELECT * FROM users Where name=$1';
  client.query(sqlSelect,[username])
    .then((result)=> {
    //   console.log(result1);
      //   return res.redirect ('/');
      if (result.rowCount > 0) {
        return res.redirect('/');
      }else {
        const sqlInsert= 'INSERT INTO users (name) values ($1) returning id';
        client.query(sqlInsert,[username])
          .then((result) =>{
            res.redirect('/')
          } ).catch(error => handleError(error));
      }
    }).catch(error => handleError(error));
}
