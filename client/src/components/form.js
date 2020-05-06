import React, { useState } from "react";
import Axios from "axios";

export default function Form (props){
    const [book, setBook] = useState({
        title: "",
        authors: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newValue = ({
            [name]: value
        })

        setBook({...book, ...newValue})
    }

    const submit = (event) => {
        event.preventDefault();

        const payload = {
            title: book.title,
            authors: book.authors
        }

       Axios.post('/save', payload).then(reset())
       
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
      <h3>{book.title} {book.authors}</h3>
        </div>
    )
}