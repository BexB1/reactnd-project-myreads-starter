import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AddBook from "./components/AddBook";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import { Route, Link, Switch } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.updateBooksListOnLoad();
  }

  updateBooksListOnLoad = () => {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
      })
    );
  };

  updateBooksArray = (book, selectedShelf) => {
    if (book.shelf !== selectedShelf) {
      BooksAPI.update(book, selectedShelf).then(() => {
        book.shelf = selectedShelf;
        this.setState((state) => ({
          books: state.books
            .filter((stateBook) => stateBook.id !== book.id)
            .concat([book]),
        }));
      });
    }
  };

  handleChange = (book, selectedShelf) => {
    BooksAPI.update(book, selectedShelf).then(
      this.updateBooksArray(selectedShelf, book)
    );
  };

  render() {
    const { books } = this.state;
    const shelves = ["currentlyReading", "wantToRead", "read"];

    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={books} onSelectShelf={this.handleChange} />
            )}
          />
          <Route path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {shelves.map((shelf) => (
                <div className="list-books-content" key={shelf}>
                  <BookShelf
                    books={books}
                    key={shelf}
                    shelf={shelf}
                    onSelectShelf={this.handleChange}
                  />
                </div>
              ))}
              <Link to="/search">
                <AddBook />
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
