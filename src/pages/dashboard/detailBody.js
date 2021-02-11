import React from "react";
import './index.scss';
import CreateBody from "./createBody";
import { Button, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

class DetailBody extends React.Component {
  render() {
    return (
      <Container>
        <Row className="detailBody__DataRow">
          <img alt="profile" src={`https://robohash.org/${this.props.user.firstname + this.props.user.lastname}?set=set5&size=150x150`}  />
          <CreateBody user={ this.props.user } isInput={ this.props.isUpdating } userFormHandler={ this.props.userFormHandler } />
        </Row>
        <Row className="detailBody__ButtonRow">
          <Button variant={ this.props.isUpdating ? "danger" : "primary" } onClick={() => this.props.update() }>
            { this.props.isUpdating ? "Cancel" : "Edit user" }
            <FontAwesomeIcon icon={ faEdit } />
          </Button>
          {
            !this.props.isUpdating &&
              <Button variant="danger" onClick={() => { this.props.delete() } }>
                Delete user
                <FontAwesomeIcon icon={ faTrash } />
              </Button>
          }

        </Row>
      </Container>
    );
  }
}

export default DetailBody;
