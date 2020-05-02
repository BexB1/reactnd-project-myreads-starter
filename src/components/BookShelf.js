import React, { Component } from "react";

class BookShelf extends Component {
  render() {
    const { books, shelf, onSelectShelf } = this.props;

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
            {books
              .filter((b) => {
                return b.shelf.includes(shelf);
              })
              .map((book) => (
                <li key={book.title.toString()}>
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
                      <div className="book-shelf-changer">
                        <select
                          value={shelf}
                          onChange={(e) => onSelectShelf(e.target.value, book)}
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
                      {book.authors.join(", ")}
                    </div>
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
