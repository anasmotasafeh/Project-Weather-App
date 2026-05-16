import "./styles.css";
import { renderWeather, renderError, getIconGif, renderLoading } from "./ui.js";
import { getWeather } from "./weather.js";

const form = document.querySelector("form");
const locF = form.querySelector("#loc");
// const loading = document.createElement("img");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderLoading();
  // getIconGif("loading", loading);
  // document.body.appendChild(loading);
  try {
    const weather = await getWeather(locF.value);
    // document.body.removeChild(loading);
    renderWeather(weather);
  } catch (error) {
    // document.body.removeChild(loading);
    renderError(error);
  }
});
