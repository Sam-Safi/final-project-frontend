import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export class EditBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      description: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleEdit = event => {
    event.preventDefault();
    console.log("handle edit reached");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", this.state.title);
    urlencoded.append("author", this.state.author);
    urlencoded.append("description", this.state.description);
    urlencoded.append("image", this.state.image);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "same-origin"
    };
    const bookID = this.props.match.params.bookid;

    fetch(`/private/book/${bookID}`, requestOptions)
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

    const bookID = this.props.match.params.bookid;
    console.log(bookID);

    fetch(`/private/book/${bookID}`, requestOptions)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        this.setState({
          title: result.title,
          author: result.author,
          description: result.description,
          image: result.image
        });
        console.log(result);
      })
      .catch(error => console.log("error", error));
  }
  render() {
    return (
      <div className="auth-inner">
        <Form onSubmit={this.handleEdit} className="form">
          <FormGroup>
            <Label for="title">Title:</Label>
            <Input
              color="black"
              type="text"
              name="title"
              placeholder=""
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Label for="author">Author:</Label>
            <Input
              type="text"
              name="author"
              id="author"
              placeholder=""
              value={this.state.author}
              onChange={this.handleChange}
            />
            <Label for="description">Description:</Label>
            <Input
              type="text"
              name="description"
              placeholder=""
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Label for="image">Image:</Label>
            <Input type="select" name="image"></Input>
            <Button
              type="submit"
              color="dark"
              style={{ marginTop: "2rem" }}
              block
            >
              Edit Book
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
