import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styles from "./App.module.scss";
import Search from "../Search/Search";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const response = await fetch(
      `http://openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Weather</title>
        </Helmet>

        {/* <Header /> */}
        <Search getWeather={this.getWeather} />
        {/* <Weather /> */}
      </div>
    );
  }
}

export default App;
