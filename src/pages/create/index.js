import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { createUser, userDetails, updateUser } from '../../redux/actions/Users';

import './index.scss';

class Create extends React.Component {
  state = {
    formObject: {
      firstName: "",
      lastName: "",
      email: "",
      birthdate: "",
      country: "",
      city: "",
      street: "",
      postalCode: ""
    }
  };

  componentDidMount() {
    if(!isUndefined(this.props.location.state)) {
      const id = this.props.location.state.id;

      this.props.userDetails(id).then(() => {
        const data = this.props.data;

        if(data) {
          this.setState({
            formObject: {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              birthdate: data.birthdate,
              country: data.address.country,
              city: data.address.city,
              street: data.address.street,
              postalcode: data.address.postalcode
            }
          })
        }
      })
    }

  }

  updateInput = (event) => {
    this.setState(
      {
        formObject: {
          ...this.state.formObject,
          [event.target.name]: event.target.value
        }
      }
    );
  };

  createUser = () => {
    this.props.createUser(this.state.formObject);
    this.props.history.push('/');
  }

  updateUser = () => {
    const id = this.props.location.state.id;

    this.props.updateUser(id, this.state.formObject)
    this.props.history.push('/');
  } 

  submitHandler = () => {

    if(isUndefined(this.props.location.state)) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  
  render() {
    return (
      <div className="userUpdate_Container">
        <form 
          onSubmit={ () => { this.submitHandler() } }
        >
          <input
            type="text"
            placeholder="First name"
            value={ this.state.formObject.firstname }
            onChange={ this.updateInput }
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last name"
            value={ this.state.formObject.lastname }
            onChange={ this.updateInput }
            name="lastname"
          />
          <input
            type="email"
            placeholder="example@mail.com"
            value={ this.state.formObject.email }
            onChange={ this.updateInput }
            name="email"
          />
          <input
            type="date"
            value={ this.state.formObject.birthdate }
            onChange={ this.updateInput }
            name="birthdate"
          />
          <input
            type="text"
            placeholder="Country"
            value={ this.state.formObject.country }
            onChange={ this.updateInput }
            name="country"
          />
          <input
            type="text"
            placeholder="City"
            value={ this.state.formObject.city }
            onChange={ this.updateInput }
            name="city"
          />
          <input
            type="text"
            placeholder="Street"
            value={ this.state.formObject.street }
            onChange={ this.updateInput }
            name="street"
          />
          <input
            type="text"
            placeholder="Postalcode"
            value={ this.state.formObject.postalcode }
            onChange={ this.updateInput }
            name="postalcode"
          />
          <div className="userUpdate_ButtonGroup">
            <button type="submit">Crear</button>
          </div>
        </form>
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
    { createUser, userDetails, updateUser }
  )
(Create));
