//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const crud = require(__dirname + "/crud.js");
const { aboutContent, contactContent } = require(__dirname + '/content');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


///////////////////////////////////////////////////////////////////////////////
//                                 Pages                                     //
///////////////////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {
  crud.getAllItems()
    .then((data) => { posts = data})
    .then(() => res.render("home", {newPost: posts}))
    .catch((err) => {console.log(err)});
});

app.get("/about", function(req, res) {
  res.render("about", {contentAbout: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contentContact: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

///////////////////////////////////////////////////////////////////////////////
//                            Compose Page                                   //
///////////////////////////////////////////////////////////////////////////////

app.post("/compose", function(req, res){
  const post = {
    title: req.body.inputBox,
    post: req.body.textArea
  };

  if (post === undefined || post === null) {
    return res.redirect("/compose");
  } else if (post.title === undefined || post.title === null) {
    return res.redirect("/compose");
  } else if (post.post === undefined || post.post === null) {
    return res.redirect("/compose");
  } else if (post.title === "" || post.post === "") {
    return res.redirect("/compose");
  };

  crud.addItem(post)
    .then(() => {res.redirect("/")})
    .catch((err) => {console.log(err)});
});

///////////////////////////////////////////////////////////////////////////////
//                          Dynamic post generator                           //
///////////////////////////////////////////////////////////////////////////////

app.get('/posts/:postName', (req, res) => {
  const postLink = _.kebabCase(req.params.postName);

  for (let i = 0; i < posts.length; i++) {
      if (_.kebabCase(posts[i].title) === postLink) {
              res.render("post", {title: posts[i].title, content: posts[i].post});
      };
  };
});

///////////////////////////////////////////////////////////////////////////////
//                           Start Express Server                            //
///////////////////////////////////////////////////////////////////////////////

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
