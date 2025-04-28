'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=ab8bb4bba04454c177c3daa12d26b3d1&cnt=56
type WeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
};

type WeatherData = {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
};

type MainWeather = {
  temp: number; // Temperature in Kelvin
  feels_like: number; // Feels like temperature in Kelvin
  temp_min: number; // Minimum temperature in Kelvin
  temp_max: number; // Maximum temperature in Kelvin
  pressure: number; // Pressure in hPa
  sea_level: number; // Pressure at sea level in hPa
  grnd_level: number; // Pressure at ground level in hPa
  humidity: number; // Humidity percentage
  temp_kf: number; // Temperature anomaly (if any)
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number; // Percentage of cloud coverage
};

type Wind = {
  speed: number; // Wind speed in m/s
  deg: number; // Wind direction in degrees
  gust: number; // Wind gust speed in m/s
};

type Sys = {
  pod: string; // Part of the day ('d' for day, 'n' for night)
};

type City = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number; // Timezone offset in seconds
  sunrise: number; // Sunrise timestamp in UTC
  sunset: number; // Sunset timestamp in UTC
};

type Coordinates = {
  lat: number; // Latitude
  lon: number; // Longitude
};

export default function Home() {
  const { isLoading, error,  data } = useQuery<WeatherResponse>({
    
    queryKey: ['weatherData'], // Unique query key
    queryFn: async () => {
      
    

      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
      return data;
    }});
     
    console.log("data", data?.city.name)
  if (isLoading) return <div className="flex items-center min-h-screen justify-center"><p className="animate-bounce">Loading...</p></div>
  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'> 
      <Navbar />
    
      
    </div>
  );
}
