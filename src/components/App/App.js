import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styles from './App.module.scss';
import LocationForm from '../LocationForm/LocationForm';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = '//api.openweathermap.org/data/2.5/forecast';

class App extends Component {
  state = {
    weather: null,
    error: false
  };
  getWeather = async (city, country) => {
    const response = await fetch(
      `${BASE_URL}?q=${city},${country}&appid=${API_KEY}`
    );
    if (response.status !== 200)
      throw new Error({
        response,
        message: "Oh no! Couldn't reach the Weather folks..."
      });
    const data = await response.json();
    return data;
  };

  handleGetLocation = async ({ city, country }) => {
    try {
      const weatherData = await this.getWeather(city, country);
      const weather = await this.parseWeatherData(weatherData);
      this.setState({ weather: weather, error: false });
    } catch ({ response, message }) {
      this.setState({
        error: true
      });
    }
  };
  parseWeatherData = weatherData =>
    weatherData.list
      .reverse()
      .filter((item, index) => {
        const date = new Date(item.dt * 1000);
        const timeOfDay = date.getUTCHours();

        if (index === 0 && timeOfDay < 15) {
          return true;
        }
        return timeOfDay === 15;
      })
      .slice(0, 5);

  render() {
    if (this.state.error) {
      return (
        <div className={styles.App}>
          <Helmet>
            <meta charSet='utf-8' />
            <title>My Weather</title>
          </Helmet>
          {/* <Header /> */}
          <LocationForm onSubmitLocation={this.handleGetLocation} />
          <h3>Something went wrong... Make sure you enter a valid location.</h3>
        </div>
      );
    }
    return (
      <div className={styles.App}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My Weather</title>
        </Helmet>
        {/* <Header /> */}
        <LocationForm onSubmitLocation={this.handleGetLocation} />
        {this.state.weather && (
          <WeatherDisplay weatherData={this.state.weather} />
        )}
      </div>
    );
  }
}

export default App;
