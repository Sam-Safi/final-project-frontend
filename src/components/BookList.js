import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Book from "./Book";

export class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  handleDelete = bookId => {
    const requestOptions = {
      method: "DELETE"
    };
    fetch(`/private/book/${bookId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ books: result });
        console.log(result);
        this.fetchBookList();
      })
      .catch(error => console.log("error", error));
  };

  fetchBookList() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("/book/find", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ books: result });
        console.log(result);
      })
      .catch(error => console.log("error", error));
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("/book/find", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ books: result });
        console.log(result);
      })
      .catch(error => console.log("error", error));
  }

  renderBooks() {
    if (!this.state.books.length) {
      return <div>loading ...</div>;
    }

    return this.state.books.map(book => {
      return <Book key={book._id} book={book} onDelete={this.handleDelete} />;
    });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <Container>
          <Row>{this.renderBooks()}</Row>
        </Container>
      </div>
    );
  }
}
