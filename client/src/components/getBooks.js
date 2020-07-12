import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from './form';
import '../style.css';

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
        <div className="row" style={{padding: "15px"}}>
            <div className="col"><Form apiCall={loadBooks}/></div>
            <div className="col mt-5">
            <h3 className="bookListTitle">Your saved books list:</h3>
           {books.map((book, index)=> {
               return (
                <ul  className="list-group" key={index} id={book._id}>
               <li className="list-group-item"> 
                <button
                style={{marginRight: "15px"}} 
                className= "btn btn-danger btn-sm"
                onClick={() => deleteBooks(book._id)}>delete</button>
                {book.title} by {book.authors}
                <img src={book.image} style={{width: "100px", float: "right"}}/>
                </li> 
               </ul>
               )
           })}
           </div>
        </div>
    )
}