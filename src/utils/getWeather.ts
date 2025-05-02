export async function getWeather(city: string) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather");
    
    const data = await res.json();
    return data.weather[0].description as string; // e.g., "clear sky"
  }