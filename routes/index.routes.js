const router = require("express").Router();
const Book = require("../models/Books.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { findById } = require("../models/User.model");
const { default: axios } = require("axios");
const Movie = require("../models/Movie.model");


/* GET home page */
router.get("/home", (req, res, next)=>{
  User.find()
  .populate("books")
  .then((usersArr)=>{
    res.render("home", {users: usersArr});
  })
  .catch(error => {
    console.log("error displaying Books in HomePage", error);
    next(error);
  });
    
})

router.get("/home/user", (req, res, next)=>{
  User.findById(req.session.user._id)
  .populate("books")
  .populate("movies")
  .then((user)=>{
    res.render("user/user-profile", user)
  })
  .catch(error => {
    console.log("error displaying User", error);
    next(error);
  })
  
})



//quilting
router.get("/home/book-test-api", (req, res, next) => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=lordoftheringstwotowers")
    .then(response => {
      let dataObj = response.data.items
      
      let coverLink = "";
      for (let i = 0; i < dataObj.length; i++) {
        if(response.data.items[i].volumeInfo.imageLinks) {
          coverLink = response.data.items[i].volumeInfo.imageLinks
          break;
        }
        
      }
      console.log(coverLink);
      // console.log(response.data.items[4].volumeInfo);
      res.render('books/book-test-api', coverLink)
    })
    .catch(err => {
      console.log('Error getting character from API...', err);
    })
})



router.get("/home/user/user-create", (req, res, next)=>{
  res.render("user/user-create")
})

router.post("/home/user/user-create", (req, res, next)=>{
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
        res.render('books/book-edit.hbs', bookToEdit);
      })
      .catch(error => next(error));
})

router.post('/books/:bookId/edit', (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, cover } = req.body;
 
  Book.findByIdAndUpdate(bookId, { title, author, cover }, { new: true })
    .then(updatedBook => {
      res.redirect('/home/user')
    })
    .catch(error => next(error));
});

router.get("/home/:userId", (req, res, next) => {
  const bookId = req.params.userId;

   User.findById(bookId)
    .populate('books')
    .then( (userObj) => {
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

router.post("/home/user/:bookId/addwatchlist", (req, res, next)=>{
  const id = req.params.bookId;
  User.findByIdAndUpdate(req.session.user._id,  {$push: {booksWatchlist: id}})
  .then(()=>{
    res.redirect(`/home/user/watchlist`)
  })
  .catch()

})

router.get("/home/user/watchlist", (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("booksWatchlist")
    .then((user) => {
      res.render("user/user-watchlist", {watchlist: user.booksWatchlist});
    })

    .catch((error) => {
      console.log("error displaying User", error);
      next(error);
    });
});

router.post("/home/user/movie-create", (req, res, next)=>{
let search = req.body.search
console.log(search);

  axios.get(`http://www.omdbapi.com/?s=${search}&apikey=b3be331c`) 
    .then(response=>{
      // console.log(response.data.Search);
      res.render("user/movie-create", {movies: response.data.Search})
    })
})

router.get("/home/user/movie-create", (req, res, next)=>{
  res.render("user/movie-create", {movies: response.data})
})

router.post("/home/user/movie-create/add", (req, res, next)=>{
      let newMovie = {
        imdbID: req.body.imdbID,
        title: req.body.title,
        cover: req.body.cover,
        year: req.body.year,
        type: req.body.type
      }
      console.log(newMovie);

      Movie.create(newMovie)
      .then(movie=>{
        let id = movie._id
        console.log(movie);
        return User.findByIdAndUpdate(req.session.user._id, {$push: {movies: id}})
      })
      .then(()=>{
        res.redirect("/home/user")
      })
       .catch(error => {
        console.log("error creating Book in DB", error);
        next(error);
      })
})


router.post("/home/user/:movieId/delete", (req, res, next)=>{
  const id = req.params.movieId;
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