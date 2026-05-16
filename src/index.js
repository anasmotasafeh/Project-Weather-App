import "./styles.css";
import { renderWeather, renderError, getIconGif, renderLoading } from "./ui.js";
import { getWeather } from "./weather.js";

const form = document.querySelector("form");
const locF = form.querySelector("#loc");
// const loading = document.createElement("img");

// First listener: triggers when the user tries to submit an empty or invalid field
locF.addEventListener("invalid", (e) => {
  locF.setCustomValidity("اكتب مدينه يا ذكي!!!");
});

// Second listener: clears the error as soon as they start typing again
locF.addEventListener("input", (e) => {
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
