// const mongoose = require('mongoose');
// const Book = require('../models/Books.model');

// const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/myproyect';

// mongoose
//   .connect(MONGO_URI)
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });


//   const books = [
//     {
//       title: "In Search of Lost Time",
//       author: "Marcel Proust",
//       cover: "https://m.media-amazon.com/images/I/41L3OmUINNL.jpg"
//     },
//     {
//       title: "Ulysses",
//       author:"James Joyce",
//       cover: "https://c8.alamy.com/comp/EXTFE5/1960s-uk-ulysses-book-cover-EXTFE5.jpg"
//     },
//     {
//       title: "Don Quixote",
//       author: "Miguel de Cervantes",
//       cover: "https://kbimages1-a.akamaihd.net/392971e9-4f19-4827-a041-3abe4d0e1f54/1200/1200/False/don-quixote-111.jpg"
//     }
//   ];


// Book.create(books)
// .then(booksFromDB => {
//     console.log(`Created ${booksFromDB.length} books`);

//     // Once created, close the DB connection
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));
