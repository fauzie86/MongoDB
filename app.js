const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('bson');

// init app middleware
const app = express();
app.use(express.json())

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening to port 3000')
            db = getDb()
        })
    }

    // routes
    app.get('/books', (req, res) => {

        // current page
        const page = req.query.p || 0
        const bookPerPage = 3

        let books = []

        db.collection('books')
            .find()
            .sort({ author: 1 })
            .skip(page * bookPerPage)
            .limit(bookPerPage)
            .forEach(book => books.push(book))
            .then(() => {
                res.status(200).json(books)
            })
            .catch(() => {
                res.status(500).json({ error: 'could not fetch the document' })
            })
    })
})

app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'could not fetch the docs' })
            })
    } else {
        res.status(500).json({ error: 'could not fetch the documents' })
    }

})

// post requests
app.post('/books', (req, res) => {
    const book = req.body
    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: 'could not create a new document' })
        })
})

// delete request

app.delete('/books/:id' , (req,res)=>{
   
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'could not delete the document'})
        })
    }else{
        res.status(500).json({error: 'could not fetch the document'})
    }

})

// patch request

app.patch('/books/:id' , (req,res)=>{
    const updates = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)} , {$set: updates })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error: 'could not update the document'})
        })
    }else{
        res.status(500).json({error: 'not a valid doc'})
    }
})






































//==============================================================

//task1
/*const express = require('express');
const { connectToDb, getDb } = require('./db');

// init app middleware
const app = express();

// db connection
let db;

connectToDb((err) => {
    if (!err) {
        db = getDb();

        app.listen(3000, () => {
            console.log('app listening to port 3000');
        });
    }

    // routes
    app.get('/books', (req, res) => {
        let books = [];
        db.collection('books')
            .find()
            .sort({ author: 1 })
            .forEach((book) => books.push(book))
            .then(() => {
                res.status(200).json(books);
            })
            .catch(() => {
                res.status(500).json({ error: 'could not fetch the document' });
            });
    });

    // new route to fetch a single document
    app.get('/books/:id', (req, res) => {
        const bookId = req.params.id;

        db.collection('books')
            .findOne({ _id: bookId })
            .then((book) => {
                if (book) {
                    res.status(200).json(book);
                } else {
                    res.status(404).json({ error: 'Book not found' });
                }
            })
            .catch(() => {
                res.status(500).json({ error: 'could not fetch the document' });
            });
    });
});*/


//==================================================


//Task2
/*const express = require('express');
const {connectToDb , getDb} = require ('./db');
const { ObjectId } = require('mongodb');

// init app middleleware
const app = express();

// db connection
let db

connectToDb((err)=>{
    if(!err){
        app.listen(3000, ()=>{
            console.log('app listening to port 3000')
            db = getDb()
        })
     
    }
    // routes
    app.get('/books' , (req, res)=>{
        let books = []

        db.collection('books')
        .find()
        .sort({author :1})
        .forEach(book => books.push(book))
        .then(()=>{
            res.status(200).json(books)
        })
        .catch(()=>{
            res.status(500).json({error: 'could not fetch the document'})
        })
    })
})
    // GET request to fetch a single book by ID
app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(500).json({ error: 'Book not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the document' });
            });
    } else {
        res.status(500).json({ error: 'Invalid book ID format' });
    }
});

// POST request to create a new book
app.post('/books', (req, res) => {
    const book = req.body;
    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not create a new document' });
        });
});

// DELETE request to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    if (ObjectId.isValid(bookId)) {
        db.collection('books')
            .deleteOne({ _id: new ObjectId(bookId) })
            .then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({ message: 'Book deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Book not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete the document' });
            });
    } else {
        res.status(400).json({ error: 'Invalid book ID format' });
    }
});*/



















