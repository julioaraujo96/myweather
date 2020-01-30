import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styles from './App.module.scss';
import LocationForm from '../LocationForm/LocationForm';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import Loading from '../Loading/Loading';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = '//api.openweathermap.org/data/2.5/forecast';

class App extends Component {
  state = {
    weather: null,
    error: false,
    isLoading: false
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
      this.setState({ isLoading: true });
      const weatherData = await this.getWeather(city, country);
      const weather = await this.parseWeatherData(weatherData);
      this.setState({ weather: weather, error: false, isLoading: false });
    } catch ({ response, message }) {
      this.setState({
        error: true,
        isLoading: false
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
    let output = null;
    if (this.state.error) {
      output = (
        <h3>Something went wrong... Make sure you enter a valid location.</h3>
      );
    } else if (this.state.weather) {
      output = this.state.isLoading ? (
        <Loading />
      ) : (
        <WeatherDisplay weatherData={this.state.weather} />
      );
    }

    return (
      <div className={styles.App}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My Weather</title>
        </Helmet>
        <LocationForm onSubmitLocation={this.handleGetLocation} />
        {output}
      </div>
    );
  }
}

export default App;
