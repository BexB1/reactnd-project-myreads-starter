import React from "react";
import Book from "./Book";

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Bookshelf title</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <Book />
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
