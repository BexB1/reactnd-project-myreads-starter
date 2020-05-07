import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  state = {
    booksQueried: [],
    query: "",
    shelf: "none",
  };

  performSearch = (query) => {
    if (query.length === 0) {
      this.setState({
        booksQueried: [],
      });
    } else {
      BooksAPI.search(query).then((results) =>
        this.setState({
          booksQueried: results,
        })
      );
    }
  };

  render() {
    const { shelf, booksQueried } = this.state;
    const { books, onSelectShelf } = this.props;

    const booksQueriedSpread = [...booksQueried];

    booksQueriedSpread.forEach((bookQueried) => {
      books.forEach((book) => {
        return book.id === bookQueried.id
          ? (bookQueried.shelf = book.shelf)
          : shelf;
      });
    });

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
            {booksQueried.length > 0
              ? booksQueried.map((book) => (
                  <Book
                    book={book}
                    onSelectShelf={onSelectShelf}
                    shelf={shelf}
                  />
                ))
              : "No results to show"}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
