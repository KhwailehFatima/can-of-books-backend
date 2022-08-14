'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
 const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get('/test', handleTest)
app.get('/books', handleGetBooks);
app.get('/findBook', handleFindBookbyName); 

// handler functions:
function handleTest (req,res){
  response.send('test request received')
}
//when i receive a req from react app on  http://localhost:4000/books , the handleGetBook will be called
function handleGetBooks (req,res){
  BooksModel.find({},(error,data)=>{
    if (error) console.log(`error reading from db: ${error}`);
    else res.send(data);
  })
}
// http://localhost:3002/findCatbyName?name=book1,2,3
function handleFindBookbyName(){
  const bookName =req.query.title;
  BooksModel.find({"title": bookName}, (error,data)=>{
    if (error) console.log(`error finding the books in db: ${error}`);
    else res.send(data);
  })
}

//Database code
// sudo service mongodb start
// 1. connect my express server to mongodb server using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/booksDB');

// 2. create a schema for the data i want to store in the database
const booksSchema=new mongoose.Schema({
  // filled name: datatype of this field
  title : String,
  description : String,
  status: String
});

// 3. create a model for the schema
const BooksModel= mongoose.model('BooksModel', booksSchema);

const book1= new BooksModel ({
  title: "The Silent Patient",
  description: "a women may or maynot have killed her husband and a theapist is deter ...",
  status: "LIFE-CHANGING"
})
console.log(book1)
book1.save();

const book2= new BooksModel ({
  title: "The Growth Mindset",
  description: "a women may or maynot have killed her husband and a theapist is deter ...",
  status: "LIFE-CHANGING"
})
console.log(book2)
book2.save();

const book3= new BooksModel ({
  title: "The Blind Assassin",
  description: "a women may or maynot have killed her husband and a theapist is deter ...",
  status: "LIFE-CHANGING"
})
console.log(book3)
book3.save();

app.listen(PORT, () => console.log(`listening on ${PORT}`));
