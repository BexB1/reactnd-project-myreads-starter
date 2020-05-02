import React, { Component } from "react";

class ShelfChanger extends Component {
  render() {
    const { book, shelf, handleChange } = this.props;

    return (
      <div className="book-shelf-changer">
        <select
          value={shelf}
          onChange={(e) => {
            handleChange(e.target.value, book);
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
