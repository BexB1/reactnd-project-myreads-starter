import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { books, shelf, onSelectShelf } = this.props;

    const shelfName = () => {
      switch (shelf) {
        case "currentlyReading":
          return "Currently Reading";
        case "read":
          return "Read";
        default:
          return "Want to Read";
      }
    };

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName()}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((b) => {
                return b.shelf.includes(shelf);
              })
              .map((book) => (
                <Book
                  book={book}
                  key={book.id}
                  onSelectShelf={onSelectShelf}
                  shelf={shelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
