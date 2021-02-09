import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { getUsers } from '../../redux/actions/Users';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

import ReactCountryFlag from 'react-country-flag';

import './index.scss';

class Dashboard extends React.Component {
  state = {
    search: "",
    users: {}
  }

  componentDidMount() {
    this.props.getUsers().then(() => {
      this.setState({ users: this.props.data });
    });

  }

  userDetails = (id) => {
    this.props.history.push('/details',id);
  }
  
  list = () => {
    const listItems = Object.values(this.state.users).map((item) =>
        <Link to={`/details?${item.id}`} params={ item } key={item.id}>
          <img className="avatar" src={`https://robohash.org/${item.firstname + item.lastname}?set=set5&size=150x150`} />
          <div className="userList__UserData">
            <h3>
              { item.firstname + ' ' + item.lastname } 
              <ReactCountryFlag countryCode={ item.address.country } svg />
            </h3>
            <span className="subheader">{ item.email }</span>
          </div>
        </Link>
    );
  
    return (
        <div className="container">
          { listItems } 
        </div>
    );
  }

  createUser = () => {
    this.props.history.push('/create');
  }

  searchBar = (event) => {
    this.setState(
      { search: event.target.value },
      () => {
        const array = Object.values(this.props.data);
        const filter = array.filter(x => x.firstname.toLowerCase().includes(this.state.search.toLowerCase()));
        this.setState({ users: filter });
      }
    );
  }
  
  render() {
    return (
      <div className="userlist_container">
        <button onClick={() => { this.createUser() }}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        <input 
          type="text"
          value={ this.state.search }
          placeholder={"search user"}
          onChange={this.searchBar}
        />
        {this.list()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.getUsers.data
  }
}

export default withRouter(connect(
  mapStateToProps,
  { getUsers }
)(Dashboard));
