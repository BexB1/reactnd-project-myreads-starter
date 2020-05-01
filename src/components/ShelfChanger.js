import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class ShelfChanger extends Component {
  state = {
    shelf: "",
  };

  handleChange = (selectedShelf, book) => {
    BooksAPI.update(book, selectedShelf).then(() => {
      this.setState((selectedShelf) => ({
        shelf: selectedShelf,
      }));
    });
  };

  render() {
    const { shelf } = this.state;

    return (
      <div className="book-shelf-changer">
        <select
          value={shelf}
          onChange={(e) => {
            this.handleChange(e.target.value, this.props.book);
          }}
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
    );
  }
}

export default ShelfChanger;
