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
  .catch(error => {
    console.log("error displaying User", error);
    next(error);
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
  .catch(error => {
    console.log("error creating Book in DB", error);
    next(error);
  })
})






router.get("/home/user/:bookId/edit", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
      .then(bookToEdit => {
        console.log(bookToEdit);
        
        res.render('books/book-edit.hbs', bookToEdit);
      })
      .catch(error => next(error));
})


router.post('/books/:bookId/edit', (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, cover } = req.body;

    console.log(req.body);
 
  Book.findByIdAndUpdate(bookId, { title, author, cover }, { new: true })
    .then(updatedBook => {
      res.redirect('/home/user')
    })
    .catch(error => next(error));
});







router.get("/home/:userId", (req, res, next) => {
  const bookId = req.params.userId;
  console.log(req.params.userId);

   User.findById(bookId)
    .populate('books')
    .then( (userObj) => {
        console.log(userObj);
       res.render('user/user-visitors', userObj);
    })
    .catch(error => {
      console.log("error displaying Logged in User in HomePage", error);
      next(error);
    })
})

router.post("/home/user/:bookId/delete", (req, res, next)=>{
  const id = req.params.bookId;
  Book.findByIdAndRemove(id)
  .then(()=>{
   res.redirect("/home/user")
  })
  .catch(error => {
    console.log("error deleting Book in DB", error);
    next(error);
  })
})


module.exports = router;
