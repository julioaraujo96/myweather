import React from 'react';
import styles from './WeatherDisplay.module.scss';

const WeatherDisplay = props => {
  const forecast = props.weatherData.map(weather => {
    const date = new Date(weather.dt * 1000);
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const getDay = date.getDay();
    const day = days[getDay];
    const temperature = Math.round(weather.main.temp - 273.15);
    const icon = weather.weather[0].icon;
    const description = weather.weather[0].description;
    return (
      <div key={getDay} className={styles.day}>
        <h2>{day}</h2>
        <div className='icon'>
          <p>{weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
        </div>
        <div className={styles.temp}>
          <p>{temperature} °C</p>
        </div>
      </div>
    );
  });
  return <div className={styles.WeatherDisplay}>{forecast}</div>;
};

export default WeatherDisplay;
