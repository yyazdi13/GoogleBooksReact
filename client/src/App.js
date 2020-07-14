import React from 'react';
import GetBooks from './components/getBooks';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="row">
      <div className="col-12">
      <Navbar style={{background: "peru"}} variant="dark">
    <Navbar.Brand>Google Books List</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link style={{color: "lightgrey"}}>Type in a title and an author to find your book!</Nav.Link>
    </Nav>
    </Navbar>
    </div>
      <br></br>
      <div className="col">
      <GetBooks/>
      </div>
    </div>
  );
}

export default App;
