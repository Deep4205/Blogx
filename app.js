//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port;

const ejs = require("ejs");
const res = require("express/lib/response");
const _=require("lodash");

const homeStartingContent = "Hey! Welcome to my Blogging Website. This is just A sample of a simple blogging website.";
const aboutContent = "This is a simple Blogging website that I've created using HTML, CSS, JavaScript. I've used various technologies in this website like Node.js, Express.js, Body-Parser, Lodash and EJS Templating.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// var post = {};
var posts = [];
var post;
var postT;
var serchFound;

app.get("/",function(req,res){
  res.render("home",{homeStartingContent : homeStartingContent , posts:posts,postT:postT});
})

app.get("/about",function(req,res){
  res.render("about",{ aboutContent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
post = {
   title : req.body.postTitle,
   content : req.body.postBody
 };
 posts.push(post);

posts.forEach(function(post){
  // console.log(post.title);
  postT=post.title;
});

 res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);
  
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
  
  if (storedTitle === requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content}
      )}
    })
  });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
