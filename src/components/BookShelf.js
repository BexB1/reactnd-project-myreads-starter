import React, { Component } from "react";
import ShelfChanger from "./ShelfChanger";

class BookShelf extends Component {
  render() {
    const { books, shelf } = this.props;

    const booksToShow = books.filter((b) => {
      return b.shelf.includes(shelf);
    });

    const shelfName = () => {
      switch (shelf) {
        case "currentlyReading":
          return "Currently Reading";
          break;
        case "read":
          return "Read";
          break;
        default:
          return "Want to Read";
      }
    };

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName()}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksToShow.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    ></div>
                    <ShelfChanger />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.join(", ")}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
