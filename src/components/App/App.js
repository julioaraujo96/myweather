import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.module.scss";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  getWeather = async () => {
    const response = await fetch(
      `http://openweathermap.org/data/2.5/forecast?q=London,us&appid=${API_KEY}`
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
        {/* <Search /> */}
        {/* <Weather /> */}
      </div>
    );
  }
}

export default App;
