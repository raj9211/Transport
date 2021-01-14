const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/signupDB", {useNewUrlParser: true});


const userSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    password2: String,
    city: String,
};

const User = mongoose.model("User", userSchema);


// ROUTES //
app.get("/", function(req,res){
    res.render("home");
});
app.get("/userprofile" ,function(req,res){
    res.render("userprofile");
});


//Auth Routes//
app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});


app.get("/signup", function(req,res){
   res.render("signup");
});

app.post("/signup", function(req,res){
   const user = new User({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     password: req.body.password,
     password2: req.body.password2,
     city: req.body.city
   });

   user.save(function(err){
      if(!err){
        res.render("userprofile");
      }
   });

});

app.post("/login", function(req,res){
   const username = req.body.username;
   const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
      if(err){
        console.log(err);
      }
      else{
        if(foundUser){
          if(foundUser.password === password){
            res.render("search")
          }
        }
      }
    });

});

app.get("/myprofile", function(req,res){
   res.render("myprofile");
});

app.post("/myprofile", function(req,res){

})






app.listen(3000, function(){
  console.log("Server started on port 3000");
});
