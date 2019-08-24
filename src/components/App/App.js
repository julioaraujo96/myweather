import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styles from './App.module.scss';
import LocationForm from '../LocationForm/LocationForm';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = '//api.openweathermap.org/data/2.5/forecast';

class App extends Component {
  state = {
    weather: null
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
      this.setState({ weather });
    } catch ({ response, message }) {
      console.log(message, response);
      // Do failure stuff
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
    return (
      <div className='App'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My Weather</title>
        </Helmet>

        {/* <Header /> */}
        {console.log(this.state.weather)}
        <LocationForm onSubmitLocation={this.handleGetLocation} />
        {/* <Weather /> */}
      </div>
    );
  }
}

export default App;
