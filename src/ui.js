const container = document.querySelector("#container"); // Fixed spelling to match standard

function clear() {
  container.innerHTML = ""; // This is all you need now!
}

export function getIconGif(icon, imgElement) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=pCfWzj4tusWSjPw7CYUuuhPto8suEUve&s=${icon}`,
  )
    .then((response) => response.json())
    .then((result) => {
      imgElement.src = result.data.images.original.url;
    })
    .catch((err) => console.error("Giphy failed:", err));
}

export function renderLoading() {
  const loading = document.createElement("div");
  loading.textContent = "Loading...";
  // getIconGif("loading", loading);
  container.appendChild(loading);
}

export function renderWeather(weatherData) {
  const { address, date, time, condition, icon } = weatherData;

  // 1. Wipe the old UI clean
  clear();

  // 2. Create FRESH elements every single run
  const aboutLoc = document.createElement("div");
  const aboutCond = document.createElement("div");
  aboutCond.className = "cond";
  const aboutIcon = document.createElement("img");
  const aboutAddress = document.createElement("span");

  // 3. Populate them with data
  aboutAddress.textContent = address;

  aboutLoc.append("الطقس في ", aboutAddress, ` تاريخ: ${date} الساعة: ${time}`);
  aboutCond.textContent = `هو:  ${condition} `;

  // Pass the fresh image element to get filled by Giphy
  getIconGif(icon, aboutIcon);

  // 4. Push them to the screen
  container.append(aboutLoc, aboutCond, aboutIcon);
}

export function renderError(error) {
  clear();

  // Create a fresh error div locally
  const errordiv = document.createElement("div");
  errordiv.textContent = error.message;

  container.append(errordiv);
}
