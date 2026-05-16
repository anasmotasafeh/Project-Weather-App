export async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&&lang=ar&include=days%2Chours%2Ccurrent%2Calerts&key=G27CWKEE7NA527F6XGY5B5L2T&contentType=json`,
  );
  if (!response.ok) {
    throw new Error(`هذا الموقع غير موجود! من فضلك اكتب موقعا صحيحا`);
  }
  const locWeather = await response.json();
  return weather(locWeather);
}

export function weather(data) {
  return {
    address: data.resolvedAddress,
    date: new Date(
      data.currentConditions.datetimeEpoch * 1000,
    ).toLocaleDateString(),
    time: data.currentConditions.datetime,
    condition: data.currentConditions.conditions,
    temp: data.currentConditions.temp,
    icon: data.currentConditions.icon,
  };
}
