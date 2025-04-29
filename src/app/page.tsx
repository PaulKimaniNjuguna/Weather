"use client";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvintoCelsius } from "@/utils/convertKelvintoCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails"

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
  const { isLoading, error, data } = useQuery<WeatherResponse>({
    queryKey: ["weatherData"], // Unique query key
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });

  const firstData = data?.list[0];

  console.log("data", data?.city.name);
  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  return (
    <div className="flex flex-1">
      {/* Left side */}
      <div className="w-[30%] bg-white-100 flex items-center justify-center">
        <main className="px-3 max-w-7xl mt-10 flex flex-col gap-9 w-full m-auto">
          {/*today data */}
          <section>
            {/*weather icon */}
            
            <div>
              <p>
                <WeatherIcon iconName={firstData?.weather[0]?.icon ?? ''}/>
              </p>
            </div>
            {/*temperature */}
            <div className="flex flex-col px-4">
              <span className="text-5xl">
                {convertKelvintoCelsius(firstData?.main.temp ?? 296.37)}°C
              </span>
            </div>
            <div>
              <h2 className="flex gap-1 text-2xl items-end mt-[100%]">
                {firstData?.dt_txt ? (
                  <span>
                    {format(parseISO(firstData.dt_txt), "dd.MM.yyyy")}
                  </span>
                ) : (
                  <span>Loading...</span>
                )}
              </h2>
            </div>
          </section>
        </main>
      </div>

      {/* Right side */}
      <div className="w-[70%] bg-gray-300 flex flex-col items-center justify-center m-auto">
        <SearchBox />
        <Container className="bg-blue-500 mt-5  ml-5">
          <h1 className="text-4xl font-bold mt-30">Welcome to my site!</h1>
          <p className="mt-4">
            This content is inside a container that's 70% wide.
          </p>
        </Container>
        <Container className=" flex flex-row  ml-5 mt-5 gap-5 ">
          
            <WeatherDetails/>
          
          
        </Container>
        <h1 className="text-white text-2xl">
          <div className="flex flex-col min-h-screen">{/*Navbar */}</div>
        </h1>
      </div>
    </div>
  );
}
