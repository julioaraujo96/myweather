import React, { Component } from 'react';
import styles from './LocationForm.module.scss';

class LocationForm extends Component {
  state = {
    city: '',
    country: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    const { city, country } = this.state;
    this.props.onSubmitLocation({ city, country });
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { city, country } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.FormDisplay}>
        <input
          type='text'
          name='city'
          placeholder='City...'
          value={city}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='country'
          placeholder='Country...'
          value={country}
          onChange={this.handleChange}
        />
        <button className={styles.button}>Search</button>
      </form>
    );
  }
}

export default LocationForm;
