const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    authors: String,
    description: String,
    image: {
        type: String,
        default: ""
    },
    link: String

});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;