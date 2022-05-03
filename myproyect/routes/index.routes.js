const router = require("express").Router();
const Book = require("../models/Books.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");


/* GET home page */
router.get("/home", (req, res, next)=>{
  User.find()
  .populate("books")
  .then((usersArr)=>{
    console.log(usersArr);
    // res.send("Hello");
    res.render("home", {users: usersArr});
  })
  .catch(error => {
    console.log("error displaying Books in HomePage", error);
    next(error);
  });
    
})


router.get("/home/user", (req, res, next)=>{
  console.log(req.session.user._id);
  User.findById(req.session.user._id)
  .populate("books")
  .then((user)=>{
    console.log(user);
    res.render("user/user-profile", user)
  })
  
})


router.get("/home/user/edit", (req, res, next)=>{
  res.render("user/user-edit")
})

router.get("/home/user/edit/user-create", (req, res, next)=>{
  res.render("user/user-create")
})



router.post("/home/user/edit/user-create", (req, res, next)=>{
  let newBook = {
        title: req.body.title,
        author: req.body.author,
        cover: req.body.cover
      }
let bookId;
  Book.create(newBook)
  .then((book)=>{
    bookId = book._id;
    return User.findByIdAndUpdate(req.session.user._id, {$push: {books: bookId}})
  })
  .then(user=>{
  res.redirect("/home/user")
  })
  .catch()
})






router.get("/home/user/:bookId/edit", (req, res, next) => {
  const bookId = req.params;

  console.log(bookId);

    // User.findById(bookId)




})








router.get("/home/:userId", (req, res, next) => {
  const bookId = req.params.userId;
  console.log(req.params.userId);

   User.findById(bookId)
    .populate('books')
    .then( (userObj) => {
        console.log(userObj);
       res.render('user/user-visitors', userObj);
    })
    .catch()
})


module.exports = router;
