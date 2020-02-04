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
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
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
            <Form onSubmit={this.onSubmit} className="form">
              <FormGroup>
                <Label for="title">Title:</Label>
                <Input
                  color="black"
                  type="text"
                  name="name"
                  id="title"
                  placeholder=""
                />
                <Label for="author">Author:</Label>
                <Input type="text" name="author" id="author" placeholder="" />
                <Label for="description">Description:</Label>
                <Input type="text" name="description" placeholder="" />
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
    );
  }
}
