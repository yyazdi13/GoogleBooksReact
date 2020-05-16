import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from './form';

export default function GetBooks(){
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        loadBooks();
    }, []);

    const loadBooks = () => {
        Axios.get('/api').then(function(res){
            const data = res.data;
            setBooks(data)
        }).catch(function(err){
            console.log("client error: " + err);
        })
    };

    function deleteBooks (id) {
        Axios.delete('/book/' + id).then(function(response){
            console.log(response);
        }).then(loadBooks).catch(function(err){
            console.log("client error: " + err);
        })
    }

    return (
        <div>
            <Form apiCall={loadBooks}/>
            <h3>Your saved books list:</h3>
           {books.map((book, index)=> {
               return (
                <div key={index} id={book._id}>
               <p>{book.title} by {book.authors} <button onClick={() => deleteBooks(book._id)}>delete</button></p> 
               </div>
               )
           })}
        </div>
    )
}