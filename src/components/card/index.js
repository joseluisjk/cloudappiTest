import React from "react";
import './index.scss';
import { Col, Row, Spinner } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';

class CardList extends React.Component {
  card = () => {
    return(
      Object.values(this.props.users).map((item) =>
        <Col xs="12" md="6" lg="3" className="list_Col" onClick={ () => this.props.userDetails(item.id) } key={item.id}>
          <div className="header">
            <div className="avatar">
              <img
                src={`https://robohash.org/${item.firstname + item.lastname}?set=set5&size=150x150`}
              />
            </div>
            <div className="basic-info">
              <div className="nick">{item.firstname}</div>
              <div className="fullname">{item.lastname}</div>
            </div>
          </div>
          <div className="info">
            <span className="title">Email</span>
            <span className="data">{item.email}</span>
          </div>
          <div className="info">
            <span className="title">Country</span>
            <span className="data">
              <ReactCountryFlag countryCode={ item.address.country } svg />
            </span>
          </div>
          <div className="info">
            <span className="title">Birthdate</span>
            <span className="data">{item.birthdate}</span>
          </div>
        </Col>
      )
    )
  }

  render() {
    return (
      <Row className="list_Row">
        {
          this.props.loading
          ? 
            <Spinner className="card__Loading" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          : 
            this.card()
        }
      </Row>
    );
  }
}

export default CardList;
