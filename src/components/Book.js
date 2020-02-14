import React from "react";
import { Link } from "react-router-dom";

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
  console.log("Book props", props);
  return (
    <Col xs="3" sm="3" md="4" lg="4" xl="4">
      <Card>
        <CardImg
          top
          width="100%"
          src={`http://localhost:4000/${props.book.image}`}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>title: {props.book.title}</CardTitle>
          <CardSubtitle>by: {props.book.author}</CardSubtitle>
          <CardText>description: {props.book.description}</CardText>
          <Button color="danger" onClick={() => props.onDelete(props.book._id)}>
            Delete
          </Button>
          <Link to={`/editbook/${props.book._id}`}>
            <Button color="primary">Edit Book</Button>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Book;
