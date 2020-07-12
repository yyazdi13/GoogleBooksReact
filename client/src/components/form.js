import React, { useState } from "react";
import Axios from "axios";

export default function Form (props){
    const [book, setBook] = useState({
        title: "",
        authors: ""
    });

    const [visibility, setVisibility] =useState("hidden");

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
                arr.push({title: i.volumeInfo.title, authors: i.volumeInfo.authors, description: i.volumeInfo.description, image: i.volumeInfo.imageLinks && i.volumeInfo.imageLinks.thumbnail});
           });
           setSearchResults({...searchResults, ...arr[0]});
           setVisibility("visible");
        //console.log(response.data.items[0].volumeInfo);
        }).catch((err)=>{console.log(err); setMsg("*Book not found")}).then(reset());
        // Axios.post('/save', searchResults).then(reset());
    }

    const reset  = () => {
        props.apiCall();
        setBook({
            title: "",
            authors: ""
        })
    }


    return (
        <div style={{background: "lightblue", border: "3px solid lightgrey", marginTop: "45px", padding: "5px", width: "460px", boxShadow: "1px gray"}}>
            <h3 style={{textAlign: "center", marginBottom: "15px", color: "lightgrey", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "grey"}}>Search</h3>
            <form onSubmit={submit}>
            <div className="form-group">
            <input
            className="form-control"
            value={book.title}
            name="title"
            onChange={handleChange}
            placeholder="title"
            />
            </div>
            <div className="form-group">
            <input
            className="form-control"
            value={book.authors}
            name="authors"
            placeholder="author(s)"
            onChange={handleChange}
            />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h6 style={{color: "red", marginTop: "10px"}}>{msg}</h6>
            <h5>{searchResults.title} {searchResults.authors[0]}</h5>
            <img src={searchResults.image}/>
            <h6>{searchResults.description}</h6>
            <br/>
            <button 
            className= "btn btn-primary"
            style={{visibility: visibility, marginBottom: "10px"}}onClick={() => {Axios.post('/save', searchResults).then(reset())}}>Save to your list</button>
        </div>
    )
}