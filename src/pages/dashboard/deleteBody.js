import { Button, Container, Row } from "react-bootstrap";
import React from "react";
import './index.scss';

class DeleteBody extends React.Component {

  render() {
    return (
      <Container>
        Are you sure you want to delete?
        <Row>
          <Button className="w-100 mt-2" variant="danger" onClick={() => this.props.deleteUser() }>
            Delete
          </Button>
        </Row>
      </Container>
    );
  }
}

export default DeleteBody;
