import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AddBook from "./components/AddBook";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
      })
    );
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/" exact>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} shelf={"currentlyReading"} />
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} shelf={"read"} />
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.books} shelf={"wantToRead"} />
            </div>
            <AddBook />
          </div>
        </Route>
      </div>
    );
  }
}

export default BooksApp;
