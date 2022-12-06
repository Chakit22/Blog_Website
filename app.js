//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var posts = [];

const homeStartingContent = "Hey Guys!! This is my first Blog Website made from scratch. Hope you like it!!";
const aboutContent = "First Blog Website.";
const contactContent = "If you like the content then please do reach out to me at ";
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res) => {
  console.log("Inside /");
  res.render("home",{startingContent:homeStartingContent,posts_home:posts});
});

app.get("/posts/:postName",function(req,res){
  const required_title = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    if(_.lowerCase(post.title) === required_title){
      res.render("post",{postTitle:post.title,postContent:post.content});
    }
  });
});

app.get("/about",(req,res) => {
  console.log("Inside /about");
  res.render("about",{about_content:aboutContent});
});

app.get("/contact",(req,res) => {
  console.log("Inside /contact");
  res.render("contact",{contact_content:contactContent});
});

app.get("/compose",(req,res) => {
  console.log("Inside /compose get");
  res.render("compose");
});

app.post("/compose",(req,res) => {
  console.log("Inside /compose post");
  var obj = {
    title:req.body.postTitle,
    content:req.body.postBody,
  };
  posts.push(obj);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
