import React from 'react';

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
    return (
      <div key={getDay} className='day'>
        <h2>{day}</h2>
        <div className='icon'>
          <p>{weather.weather[0].description}</p>
        </div>
        <div className='temp'>
          <h3>{weather.main.temp_min}</h3>
          <h3>{weather.main.temp_max}</h3>
        </div>
      </div>
    );
  });
  return (
    <div className='WeatherDisplay'>
      {forecast}
      {console.log(props.weatherData)}
    </div>
  );
};

export default WeatherDisplay;
