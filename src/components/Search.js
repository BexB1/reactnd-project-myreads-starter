import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundColor: "gray",
                            backgroundImage: book.imageLinks
                              ? `url(${book.imageLinks.thumbnail})`
                              : "none",
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf || shelf}
                            onChange={(e) =>
                              onSelectShelf(e.target.value, book)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
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
