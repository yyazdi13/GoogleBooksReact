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
    }

    return (
        <div>
            <Form apiCall={loadBooks}/>
            <h3>Your saved books list:</h3>
           {books.map((book, index)=> {
               return (
                <div key={index}>
               <p>{book.title} by {book.authors}</p>
               </div>
               )
           })}
        </div>
    )
}