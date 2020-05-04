import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  state = {
    booksToShow: [],
    query: "",
  };

  performSearch = (query) => {
    if (query.length === 0) {
      this.setState({
        booksToShow: [],
      });
    } else {
      BooksAPI.search(query).then((results) =>
        this.setState({
          booksToShow: results,
        })
      );
    }
  };

  render() {
    const { booksToShow, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.performSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksToShow.length > 0
              ? booksToShow.map((book) => (
                  <li key={book.title.toString()}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks && (
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`,
                            }}
                          ></div>
                        )}
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors && book.authors.join(", ")}
                      </div>
                    </div>
                  </li>
                ))
              : "No results to show"}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
