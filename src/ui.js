const container = document.querySelector("#container"); // Fixed spelling to match standard

function clear() {
  container.innerHTML = ""; // This is all you need now!
}

export function getIconGif(icon, imgElement) {
  fetch(
    `https://pixabay.com/api/?key=55887891-eb99dd9ab0eecced7f136c7b1&q=${icon}+whether&image_type=photo`,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const size = result.hits.length;
      const indx = Math.floor(Math.random() * size);
      imgElement.src = result.hits[indx].webformatURL;
    })
    .catch((err) => console.error("Giphy failed:", err));
}

export function renderLoading() {
  clear();
  const loading = document.createElement("div");
  loading.textContent = "[جاري التحميل...]";
  // getIconGif("loading", loading);
  container.appendChild(loading);
}

export function renderWeather(weatherData) {
  const { address, date, time, condition, temp, icon } = weatherData;

  // 1. Wipe the old UI clean
  clear();

  // 2. Create FRESH elements every single run
  const aboutLoc = document.createElement("div");
  const aboutCond = document.createElement("div");
  aboutCond.className = "cond";
  const aboutIcon = document.createElement("img");
  const aboutAddress = document.createElement("span");
  const aboutTemp = document.createElement("div");
  aboutTemp.className = "temp";

  // 3. Populate them with data
  aboutAddress.textContent = address;

  aboutLoc.append("الطقس في ", aboutAddress, ` تاريخ: ${date} الساعة: ${time}`);
  aboutCond.textContent = `هو:  ${condition} `;

  // Pass the fresh image element to get filled by Giphy
  getIconGif(icon, aboutIcon);
  aboutTemp.textContent = "°C" + " درجة الحرارة هي: " + temp;

  // 4. Push them to the screen
  container.append(aboutLoc, aboutCond, aboutTemp, aboutIcon);
}

export function renderError(error) {
  clear();

  // Create a fresh error div locally
  const errordiv = document.createElement("div");
  errordiv.textContent = error.message;

  container.append(errordiv);
}
