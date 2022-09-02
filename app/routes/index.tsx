import styles from "../styles/Home.module.css";
import Products from "../components/Products";
import {
  getCityCoords,
  getHighestUviValue,
  getWeatherData,
  unixDateConverter,
} from "../utils/getWeather";
import { getProductData } from "../utils/getDmData";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Links } from "@remix-run/react";

export let loader: LoaderFunction = async ({ params }) => {
  const city = "Karlsruhe,ger";

  const coords = await getCityCoords(city);
  const weatherData = await getWeatherData(coords.lat, coords.lon);
  console.log(weatherData);

  const highestUvi = await getHighestUviValue(weatherData);
  const productData = await getProductData(highestUvi);

  const products = productData.products;
  const currentDate = unixDateConverter(weatherData.current.dt);
  const currentTemp = weatherData.current.temp;
  return { currentDate, products, currentTemp };
};

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  let data = useLoaderData();
  console.log(data);
  return (
    <div className="container">
      <div className="main">
        <img className="logo" src="/DmBrandClaimIcon.svg" />
        <div className="overview">
          <h1 className="title">
            Willkommen zum{" "}
            <a href="https://www.dm.de/search?query=Sonnencreme&searchType=product">
              dm
            </a>{" "}
            Sonnencremefinder! ☀️
          </h1>
          <h1 className="subtitle">Heute ist der {data.currentDate}</h1>
          <h3>Aktuell sind es {Math.round(data.currentTemp)} °C</h3>
        </div>
        <Products products={data.products} />
        <br />
        <p>
          Die Auswahl des Lichtschutzfaktors wurde anhand des maximalen UV-Index
          der nächsten 5 Tage getätigt
        </p>
      </div>
    </div>
  );
}
