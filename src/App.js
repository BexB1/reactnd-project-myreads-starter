import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
// import AddBook from "./components/AddBook";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import { Route } from "react-router-dom";

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
    BooksAPI.update(book, selectedShelf)
      .then(() => {
        this.setState((selectedShelf) => ({
          shelf: selectedShelf,
        }));
      })
      .then(this.updateBooksList());
  };

  render() {
    const { books } = this.state;

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
                shelf={"read"}
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
            {/* <AddBook /> */}
          </div>
        </Route>
      </div>
    );
  }
}

export default BooksApp;
