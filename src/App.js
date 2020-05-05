import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AddBook from "./components/AddBook";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.updateBooksList();
  }

  updateBooksList = () => {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
      })
    );
  };

  handleChange = (selectedShelf, book) => {
    BooksAPI.update(book, selectedShelf).then(this.updateBooksList());
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search books={books} onSelectShelf={this.handleChange} />
          )}
        />
        <Route path="/" exact>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {/* TODO: Do a .forEach to make the 3 BookShelf components */}
            <div className="list-books-content">
              <BookShelf
                books={books}
                shelf={"currentlyReading"}
                onSelectShelf={this.handleChange}
              />
            </div>
            <div className="list-books-content">
              <BookShelf
                books={books}
                shelf={"wantToRead"}
                onSelectShelf={this.handleChange}
              />
            </div>
            <div className="list-books-content">
              <BookShelf
                books={books}
                shelf={"read"}
                onSelectShelf={this.handleChange}
              />
            </div>
            <Link to="/search">
              <AddBook />
            </Link>
          </div>
        </Route>
      </div>
    );
  }
}

export default BooksApp;
