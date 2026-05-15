const form = document.querySelector("form");
const locF = form.querySelector("#loc");

const aboutLoc = document.createElement("div");
const aboutCond = document.createElement("div");
// const aboutIcon = document.querySelector("img");

const errordiv = document.createElement("div");

const aboutIcon = document.createElement("img");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(locF.value);
});

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=G27CWKEE7NA527F6XGY5B5L2T&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`location of ${location} not found`);
    }
    const locWeather = await response.json();
    // console.log(locWeather);
    renderWeather(weather(locWeather));
  } catch (error) {
    errordiv.textContent = error.message;
    document.body.append(errordiv);
  }
}

function weather(data) {
  return {
    address: data.resolvedAddress,
    date: new Date(
      data.currentConditions.datetimeEpoch * 1000,
    ).toLocaleDateString(),
    time: data.currentConditions.datetime,
    condition: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
  };
  // console.log(weather);
}

function renderWeather(weatherData) {
  const address = weatherData.address;
  const date = weatherData.date;
  const time = weatherData.time;
  const condition = weatherData.condition;
  const icon = weatherData.icon;
  console.log(icon);

  const aboutAddress = document.createElement("span");
  aboutAddress.textContent = address;

  // aboutLoc.textContent = `The weather in ${address}
  // on date: ${date}
  // at time: ${time}`;
  aboutLoc.append("الطقس في ", aboutAddress, ` تاريخ: ${date} الساعه: ${time}`);

  aboutCond.textContent = `is ${condition}`;
  getIconGif(icon);

  document.body.append(aboutLoc, aboutCond, aboutIcon);
}

function getIconGif(icon) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=pCfWzj4tusWSjPw7CYUuuhPto8suEUve&s=${icon}`,
  )
    .then((response) => response.json())
    .then((result) => (aboutIcon.src = result.data.images.original.url));
  // });
}
