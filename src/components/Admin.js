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
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(); //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("author", this.state.author);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);

    fetch("/private/book/new", {
      method: "POST",
      body: formData,
      redirect: "follow",
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 201) {
          console.log("new book created");
          this.props.history.push("/booklist");
        }
      })
      .catch(e => console.log(e));
  };

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
                  <Input
                    className="form-input"
                    type="file"
                    id="image"
                    name="image"
                    onChange={this.handleFileChange}
                  ></Input>
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
