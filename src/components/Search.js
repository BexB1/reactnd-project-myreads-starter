import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  state = {
    books: [],
    booksSearched: [],
    query: "",
    shelf: "none",
  };

  componentDidMount = () => {
    this.setState({
      books: this.props.books,
    });
  };

  performSearch = (query) => {
    if (query.length === 0) {
      this.setState({
        booksSearched: [],
      });
    } else {
      BooksAPI.search(query).then((results) =>
        this.setState({
          booksSearched: results,
        })
      );
    }
  };

  render() {
    const { books, onSelectShelf } = this.props;

    const booksSearched = [...this.state.booksSearched];

    booksSearched.forEach((qbook) => {
      books.forEach((b) => {
        if (b.id === qbook.id) {
          qbook.shelf = b.shelf;
        }
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
            {booksSearched.length > 0
              ? booksSearched.map((book) => (
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
                            value={book.shelf || "none"}
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
