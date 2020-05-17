import React from 'react';
import GetBooks from './components/getBooks';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand mr-5 mb-0 h1">Google Books Search</span>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      <li className="nav-item active my-2 my-lg-0 text-primary">Search for a book and save it to your reading list!</li>
      </ul>
      </div>
      </nav>
      <br></br>
      <GetBooks/>
    </div>
  );
}

export default App;
