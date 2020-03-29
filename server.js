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
app.post('/score',postScore);


//Catch-all
app.get('*', (req,res) => res.status(404).send('This route does not exist'));


app.listen(PORT, () => console.log( `Listening on port: ${PORT}`));



function handleError(err,res){
  console.err(err);
  res.render('/');
}


















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
    });
}

function postScore(req,res){
  let score=req.body.score;
  let date=req.body.date;
  let tee_id=req.body.tee_id;
  console.log('Score: ',score);
  console.log('Date: ',date);
  console.log('Tee ID: ', tee_id);
  console.log(typeof tee_id);
  let teeStringArray = tee_id.split(',');
  tee_id=parseInt(teeStringArray[0]);
  let rating =parseFloat(teeStringArray[1]);
  let slope =parseFloat(teeStringArray[2]);
  console.log('Tee ID: ', tee_id, typeof tee_id);
  console.log('Rating: ', rating, typeof rating);
  console.log('Slope: ', slope, typeof slope);
  const sql ='insert into rounds(USER_ID,Tee_id, SCORE, differential, DATE_PLAYED)VALUES ($1,$2,$3,$4,$5)Returning id; ' ;
  let differential = calculateDifferential(score,slope,rating);
  return client.query(sql,[1,tee_id,score, differential,date])
    .then((results)=>{
      return res.redirect('/');
    });
}
function calculateDifferential(score,slope,rating){
  let differential = (((score - rating)* 113)/slope);
 return differential;
}


function getOneCourse(req, res){
  const SQL = 'select tees.id, tees.color,tees.slope,tees.rating, courses.name,courses.phone,courses.ow,courses.city,courses.region,courses.date_verified from tees inner join courses on tees.course_id = courses.id where course_id = $1 ';
  return client.query(SQL, [req.params.id])
    .then((tees)=>{
      let formattedTees = formatTeesForRender(tees.rows);
      return res.render('pages/course-detail', {tees:formattedTees})

    });

}


function formatTeesForRender(tees){
  return tees.map((tee) => {
    tee.idArray = tee.id;
    tee.nameArray = tee.name;
    tee.phoneArray =tee.phone;
    tee.webArray = tee.ow;
    tee.cityArray= tee.city;
    tee.stateArray = tee.region;
    tee.colorArray = tee.color;
    tee.slopeArray = tee.slope;
    tee.ratingArray = tee.rating;
    tee.dateArray = tee.date_verified;
    // console.log('ln 143' + course.ow);
    return tee;
  })
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
