import React from 'react';

const WeatherDisplay = props => (
  <div className='WeatherDisplay'>
    <h1>WeatherDisplay</h1>
    <h2>{console.log(props.weatherData)}</h2>
  </div>
);

export default WeatherDisplay;
