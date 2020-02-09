import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      description: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      image: ""
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "same-origin"
    };

    fetch("/private/book/new", requestOptions)
      .then(async response => {
        if (+response.status === 200) {
          this.props.history.push("/booklist");
          console.log(await response.json());
        }
      })
      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <div className="auth-inner">
        <div>
          <Button
            color="primary"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Book
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Add book to your library
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit} className="form">
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
                  <Button color="dark" style={{ marginTop: "2rem" }} block>
                    Add Book
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}
