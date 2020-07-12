import React from 'react';
import GetBooks from './components/getBooks';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Google Books List</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link >Type in a title and an author to find your book!</Nav.Link>
    </Nav>
    </Navbar>
      <br></br>
      <GetBooks/>
    </div>
  );
}

export default App;
