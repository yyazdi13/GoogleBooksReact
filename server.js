const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const db = require("./models");

//Setup express instance and port config
const app = express();
const PORT = process.env.PORT || 3001;

// uri link
const uri = "mongodb+srv://yasmin:@Helloworld13@cluster0.w1tvs.mongodb.net/googleBooks?retryWrites=true&w=majority";

//Connect to mongoose database
mongoose.connect(uri || 'mongodb://localhost/googleBooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

//Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/api', (req, res) => {
    db.Book.find({}).then((response)=>{
        res.json(response);
    }).catch((err)=> console.log(err))
});

app.post('/save', (req,res) => {
    db.Book.create(req.body).then((response)=>{
        console.log('data saved: ' + response);
    })
    .catch((err)=>{
        console.log('server error ' + err);
    })
});

app.delete('/book/:id', (req,res) => {
    db.Book.findById({ _id: req.params.id })
    .then(bookID => bookID.remove())
    .then(bookID => res.json(bookID))
    .catch(err => res.status(422).json(err));
});

//Heroku setup
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

//Connect to port
app.listen(PORT, console.log("app is listening at port " + PORT));

