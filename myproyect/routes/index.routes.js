const Book = require("../models/Books.model");
const mongoose = require("mongoose");

const router = require("express").Router();

/* GET home page */
router.get("/home", (req, res, next) => {

  res.render("home");
});

router.get("/home/user", (req, res, next)=>{
  res.render("user/user-profile", req.session.user)
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
Book.create(newBook)
.then((book)=>{
  req.session.user.books.push(book.id);
  res.redirect("/home/user")
})
.catch(error => {
  console.log("error creating book in DB", error);
  next(error);
});
})

module.exports = router;
