export const getCityCoords = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a29299823c33975b374a819ae0b7a08`
  );
  const coordData = await res.json();
  console.log(coordData);
  const { lon, lat } = coordData.coord;
  return { lat, lon };
};

export const getWeatherData = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=3a29299823c33975b374a819ae0b7a08&units=metric`
  );
  const weatherData = await res.json();
  return weatherData;
};

export const unixDateConverter = (unixDate) => {
  const realDate = new Date(unixDate * 1000).toLocaleDateString("de-DE");
  return realDate;
};

export const getHighestUviValue = (weatherData) => {
  const uvis = [weatherData.current.uvi];
  weatherData.daily.forEach((element) => {
    uvis.push(element.uvi);
  });

  uvis.splice(6, 3); //The last three values seem to be dummy data

  return Math.max(...uvis);
};
