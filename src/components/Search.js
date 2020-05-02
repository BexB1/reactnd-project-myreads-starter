import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { query } = this.state;

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
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <p>{this.state.query || "No query"}</p>
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default Search;
