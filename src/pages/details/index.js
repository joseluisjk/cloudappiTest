import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { userDetails, deleteUser, updateUser } from '../../redux/actions/Users';
import { isEmpty } from 'lodash';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

import './index.scss';

class Details extends React.Component {
  componentDidMount() {
    this.props.userDetails( window.location.search.replace('?',''));
  }

  list = () => {
    const user = this.props.data;
    const address = this.props.data.address;
    const id = window.location.search.replace('?','');

    if(!isEmpty(address)) {
      const listItems =
      <ul>
        <li>
          <label>Name</label>
          { user.firstname + ' ' + user.lastname }
        </li>
        <li>
          <label>Email</label>
          { user.email }
        </li>
        <li>
          <label>Birthdate</label>
          { user.birthdate }
        </li>
        <li>
          <label>Country</label>
          { address.country }
        </li>
        <li>
          <label>City</label>
          { address.city }
        </li>
        <li>
          <label>Street</label>
          { address.street }
        </li>
        <li>
          <label>Postalcode</label>
          { address.postalcode }
        </li>
      </ul>

      return (
        <div className="userDetails__Row">
          <div className="userDetails__Data">
            <img src={`https://robohash.org/${user.firstname + user.lastname}?set=set5&size=150x150`}  />
            { listItems }
          </div>
          <div className="userDetails__ButtonGroup">
            <button onClick={ () => { this.updateUser(id) } }> <FontAwesomeIcon icon={faUserEdit} /> Actualizar</button>
            <button onClick={ () => { this.deleteUser(id) } }> <FontAwesomeIcon icon={faTrash} /> Borrar</button>
          </div>
        </div>
      );
    }
  }

  updateUser = (id) => {
    this.props.history.push({
      pathname: '/create',
      state: { id: id }
    });
  }

  deleteUser = (id) => {
    this.props.deleteUser(id).then(
      this.props.history.push('/')
    )
  }
  
  render() {
    return (
      <div className="userDetails__Container">
        {this.list()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.userDetails.data
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { userDetails, deleteUser, updateUser }
  )
(Details));
