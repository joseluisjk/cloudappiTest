import { isEmpty } from "lodash";
import React, { Fragment } from "react";
import Select from "react-select";
import countryList, { getLabel } from 'react-select-country-list'
import { FormControl, Button } from 'react-bootstrap';

import './index.scss';

class CreateBody extends React.Component {
  state = {
    formObject: {
      firstname: "",
      lastname: "",
      email: "",
      birthdate: "",
      country: "",
      city: "",
      street: "",
      postalCode: ""
    }
  };

  componentDidMount() {
    const { user } = this.props;
    if(!isEmpty(user)) {
      this.setState({
        formObject: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          birthdate: user.birthdate,
          country: user.address.country,
          city: user.address.city,
          street: user.address.street,
          postalcode: user.address.postalcode
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

  CountrySelector = () => {
    const options = countryList().getData();

    const countryHandler = country => this.setState(
      {
        formObject: {
          ...this.state.formObject,
          country: country.value
        }
      }
    )

    return(
      <Select
        options={options}
        name="country"
        value={this.state.formObject.country}
        defaultInputValue={ countryList().getLabel(this.state.formObject.country) }
        onChange={ countryHandler }
      />
    )
  }

  list = () => {
    const { isInput, user } = this.props;
    const address = user && user.address;

    return(
      <Fragment>
        <div className="info">
          <span className="title">Firstname</span>
          {
            !isInput
            ? user && <span className="data">{ user.firstname }</span>
            : 
              <FormControl
                type="text"
                placeholder="First name"
                value={ this.state.formObject.firstname }
                onChange={ this.updateInput }
                name="firstname"
              />
          }
        </div>
        <div className="info">
          <span className="title">Lastname</span>
          {
            !isInput
            ? user && <span className="data">{ user.lastname }</span>
            : 
              <FormControl
                type="text"
                placeholder="Last name"
                value={ this.state.formObject.lastname }
                onChange={ this.updateInput }
                name="lastname"
              />
          }
        </div>
        <div className="info">
          <span className="title">Email</span>
          {
            !isInput
            ? user && <span className="data">{ user.email }</span>
            :
              <FormControl
                type="email"
                placeholder="example@mail.com"
                value={ this.state.formObject.email }
                onChange={ this.updateInput }
                name="email"
              />
          }
        </div>
        <div className="info">
          <span className="title">Birthdate</span>
          {
            !isInput
            ? user && <span className="data">{ user.birthdate }</span>
            :
              <FormControl
                type="date"
                value={ this.state.formObject.birthdate }
                onChange={ this.updateInput }
                name="birthdate"
              />
          }
        </div>
        <div className="info">
          <span className="title">Country</span>
          {
            !isInput
            ? address && <span className="data">{ address.country }</span>
            : this.CountrySelector()
          }
        </div>
        <div className="info">
          <span className="title">City</span>
          {
            !isInput
            ? address && <span className="data">{ address.city }</span>
            :
              <FormControl
                type="text"
                placeholder="City"
                value={ this.state.formObject.city }
                onChange={ this.updateInput }
                name="city"
              />
          }
        </div>
        <div className="info">
          <span className="title">Street</span>
          {
            !isInput
            ? address && <span className="data">{ address.street }</span>
            :
              <FormControl
                type="text"
                placeholder="Street"
                value={ this.state.formObject.street }
                onChange={ this.updateInput }
                name="street"
              />
          }
        </div>
        <div className="info">
          <span className="title">Postalcode</span>
          {
            !isInput
            ? address && <span className="data">{ address.postalcode }</span>
            :
              <FormControl
                type="text"
                placeholder="Postalcode"
                value={ this.state.formObject.postalcode }
                onChange={ this.updateInput }
                name="postalcode"
              />
          }
        </div>
      </Fragment>
    )
  }
  
  render() {
    return (
      <div className="createBody__Container">
        {this.list()}
        {
          this.props.isInput &&
            (
              <Button className="createBody__Button" onClick={() => { this.props.userFormHandler(this.state.formObject) }}>
                Actualizar
              </Button>
            )
        }
      </div>
    );
  }
}


export default CreateBody;
