import React, { useState } from "react";
import Axios from "axios";

export default function Form (props){
    const [book, setBook] = useState({
        title: "",
        authors: ""
    });

    const [searchResults, setSearchResults] = useState({
        title: "",
        description: "",
        authors: [],
        image: ""
    });

    const [msg, setMsg] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newValue = ({
            [name]: value
        })

        setBook({...book, ...newValue})
    }

    const submit = (event) => {
        event.preventDefault();

        !book.authors && setMsg("* please put in at least one author's first and last name");
        !book.title && setMsg("* please put in a title");
        book.title && book.authors && setMsg("");
        const payload = {
            title: book.title,
            authors: book.authors
        }

       book.title && book.authors && Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${payload.title}+inauthor:${payload.authors}&key=AIzaSyA0TGXOQ5UoejVtruf8EpNjsRvNntXu8zM`)
       .then((response)=>{
           var arr = [];
           response.data.items.map(i => {
               console.log(i);
                arr.push({title: i.volumeInfo.title, authors: i.volumeInfo.authors, description: i.volumeInfo.description, image: i.volumeInfo.imageLinks && i.volumeInfo.imageLinks.thumbnail});
           });
           setSearchResults({...searchResults, ...arr[0]});
        //console.log(response.data.items[0].volumeInfo);
        }).then(reset());
        // Axios.post('/save', searchResults).then(reset());
    }

    const reset  = () => {
        setBook({
            title: "",
            authors: ""
        })
        props.apiCall();
    }


    return (
        <div>
            <form onSubmit={submit}>
            <div className="form-input">
            <input
            value={book.title}
            name="title"
            onChange={handleChange}
            placeholder="title"
            />
            </div>
            <div className="form-input">
            <input
            value={book.authors}
            name="authors"
            placeholder="author(s)"
            onChange={handleChange}
            />
            </div>
            <button type="submit">Submit</button>
            </form>
            <h6 style={{color: "red", marginTop: "10px"}}>{msg}</h6>
            <h5>{searchResults.title} {searchResults.authors[0]}</h5>
            <img src={searchResults.image}/>
            <h6>{searchResults.description}</h6>
            <button onClick={() => {console.log(searchResults)}}>Save to your list</button>
        </div>
    )
}