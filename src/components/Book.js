import React from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col
} from "reactstrap";

const Book = props => {
  return (
    <Col xs="3" sm="3" md="4" lg="4" xl="4">
      <Card>
        <CardImg
          top
          width="100%"
          src="/assets/318x180.svg"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>title: {props.book.title}</CardTitle>
          <CardSubtitle>by: {props.book.author}</CardSubtitle>
          <CardText>description: {props.book.description}</CardText>
          <Button color="danger" onClick={() => props.onDelete(props.book._id)}>
            Delete
          </Button>
          <Button
            color="primary"
            onClick={() => props.handleEdit(props.book._id)}
          >
            Edit
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Book;
