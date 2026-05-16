import "./styles.css";
import { renderWeather, renderError, getIconGif, renderLoading } from "./ui.js";
import { getWeather } from "./weather.js";

const form = document.querySelector("form");
const locF = form.querySelector("#loc");
// const loading = document.createElement("img");

locF
  .addEventListener("invalid", (e) => {
    locF.setCustomValidity("اكتب مدينه يا ذكي!!!");
  })
  .addEventListener("input", (e) => {
    locF.setCustomValidity("");
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderLoading();
  try {
    const weather = await getWeather(locF.value);
    renderWeather(weather);
  } catch (error) {
    renderError(error);
  }
});
