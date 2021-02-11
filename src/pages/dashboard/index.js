import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getUsers, userDetails, deleteUser, createUser, updateUser } from '../../redux/actions/Users';
import { isEqual } from 'lodash';

import NavBar from '../../components/navbar';
import CardList from '../../components/card';
import ModalUser from '../../components/modal';
import CreateBody from './createBody';
import DeleteBody from './deleteBody';

import './index.scss';

import { Container } from 'react-bootstrap';
import DetailBody from "./detailBody";

class Dashboard extends React.Component {
  state = {
    search: "",
    showModalDelete: false,
    showModal: false,
    modalBody: '',
    update: false,
    users: {},
    formObject: {}
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    this.props.getUsers().then(() => {
      this.setState({ users: this.props.data });
    });
  }

  userDetails = (id) => {
    this.props.userDetails(id).then(() => {
      this.setState(
        {
          modalBody: 'details'
        },
        this.toggleModal()
      );
    })
  }

  createUser = () => {
    this.setState(
      {
        modalBody: 'create'
      },
      this.toggleModal()
    )
  }

  bodyHandler = () => {
    switch(this.state.modalBody) {
      case 'create':
        return(
          <CreateBody
            isInput
            userFormHandler={ this.userFormHandler }
          />
        )
      case 'details':
        return(
          <DetailBody
            user={ this.props.details }
            delete={ this.deleteUserToggle }
            update={ this.updateToggle }
            isUpdating={ this.state.update }
            userFormHandler={ this.userFormHandler }
          />
        )
      default:
        return
    }
  }

  updateToggle = () => {
    this.setState({ update: !this.state.update });
  }

  userFormHandler = (formObject) => {
    this.setState(
      {
        formObject: formObject
      },
      () => {
        if(isEqual(this.state.modalBody, 'create')) {
          this.props.createUser(this.state.formObject).then(() => {
            this.toggleModal();
            this.getUsers();
          })
        } else {
          this.props.updateUser(this.props.details.id, this.state.formObject).then(() => {
            this.updateToggle();
            this.props.userDetails(this.props.details.id);
            this.getUsers();
          })
        }
      }
    )
  }

  deleteUserToggle = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete});
  }

  confirmDeleteUser = () => {
    this.props.deleteUser(this.props.details.id).then(() => {
      this.deleteUserToggle();
      this.toggleModal();
      this.getUsers();
    })
  }

  searchBar = (event) => {
    this.setState(
      { search: event.target.value },
      () => {
        const array = Object.values(this.props.data);
        const filter = array.filter(x => (
          x.firstname.toLowerCase().includes(this.state.search.toLowerCase()))
        );
        this.setState({ users: filter });
      }
    );
  }

  toggleModal = () => {
    if(this.state.update) {
      this.setState({ update: false})
    }

    this.setState({ showModal: !this.state.showModal });
  }
  
  render() {
    return (
      <Container className="userList_container p-0" fluid>
        <NavBar 
          search={ this.searchBar }
          createUser={ this.createUser }
          // orderByName={ this.orderByName }
        />
        <CardList
          users={ this.state.users }
          userDetails={ this.userDetails }
          loading={ this.props.loading }
        />
        <ModalUser
          show={ this.state.showModal }
          modalHandler={this.toggleModal}
          body={ this.bodyHandler() }
          title={ isEqual(this.state.modalBody, 'create') ? 'Create user' : 'User details' }
        />
        <ModalUser
          show={ this.state.showModalDelete }
          modalHandler={ this.deleteUserToggle }
          body={ <DeleteBody deleteUser={ this.confirmDeleteUser } /> }
          title="Delete user"
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.getUsers.data,
    details: state.userDetails.details,
    loading: state.getUsers.loading
  }
}

export default withRouter(connect(
  mapStateToProps,
  { getUsers, userDetails, deleteUser, createUser, updateUser }
)(Dashboard));
