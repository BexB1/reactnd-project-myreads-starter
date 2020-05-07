import React, { Component } from "react";

class Book extends Component {
  render() {
    const { book, shelf, onSelectShelf } = this.props;
    return (
      <li key={book.id}>
        <div className="book">
          {book.imageLinks && (
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
                  onChange={(e) => onSelectShelf(e.target.value, book)}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          )}
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
