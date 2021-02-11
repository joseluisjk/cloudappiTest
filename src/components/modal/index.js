import React from "react";
import './index.scss';
import { Modal, Button } from 'react-bootstrap';

class ModalUser extends React.Component {
  render() {
    return (
      <Modal
        centered
        show={this.props.show}
        onHide={() => {this.props.modalHandler()}}
      >
        <Modal.Header closeButton>
          <Modal.Title>{ this.props.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.body }
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalUser;
