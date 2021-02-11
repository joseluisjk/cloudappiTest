import React from "react";
import './index.scss';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavDropdown, Nav, Button, FormControl } from 'react-bootstrap';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">CloudAppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link target="_blank" href="https://github.com/joseluisjk/cloudappiTest">React repo</Nav.Link>
            <Nav.Link target="_blank" href="https://github.com/joseluisjk/fakeapi">Fake Back-End repo</Nav.Link>
            <NavDropdown title="Refs" id="basic-nav-dropdown">
              <NavDropdown.Item target="_blank" href="https://api-test-cloudappi.herokuapp.com/users">URL Fake Back-End deployment</NavDropdown.Item>
              <NavDropdown.Item target="_blank" href="https://github.com/typicode/json-server">JSON-SERVER</NavDropdown.Item>
              <NavDropdown.Item target="_blank" href="https://www.heroku.com/">HEROKU</NavDropdown.Item>
              <NavDropdown.Item target="_blank" href="https://firebase.google.com/?hl=es">FIREBASE</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button className="userList_AddButton" onClick={() => { this.props.createUser() }}>
            Add user
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
          <div className="userList_SearchBox">
            <FontAwesomeIcon icon={ faSearch }/>
            <FormControl type="text" placeholder="Search by name" value={ this.props.searchValue } onChange={this.props.search} />
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
