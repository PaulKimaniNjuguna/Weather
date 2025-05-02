"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvintoCelsius } from "@/utils/convertKelvintoCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { useMemo } from "react";
import TemperatureRangeBar from "@/components/TemperatureRangeBar";

type WeatherResponse = {
  list: WeatherData[];
  city: { name: string; /*…*/ };
  // …
};

type WeatherData = {
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number; humidity: number };
  weather: { icon: string; description: string }[];
  wind: { speed: number };
  dt_txt: string;
};

type DailyWeather = {
  date: string;
  weatherIcon: string | null;
  temp_min: number | null;
  temp_max: number | null;
};

export default function Home() {
  const { isLoading, data } = useQuery<WeatherResponse>({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return res.data;
    },
  });

  // compute dailyData exactly as before
  const dailyData: DailyWeather[] = useMemo(() => {
    if (!data) return [];

    const today = new Date();
    const nextThreeDates = Array.from({ length: 3 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1);
      return d.toISOString().split("T")[0];
    });

    const entriesByDate: Record<string, WeatherData[]> = {};
    data.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
      if (nextThreeDates.includes(date)) {
        entriesByDate[date] = entriesByDate[date] || [];
        entriesByDate[date].push(entry);
      }
    });

    return nextThreeDates.map((date) => {
      const entries = entriesByDate[date] || [];
      if (entries.length === 0) {
        return { date, weatherIcon: null, temp_min: null, temp_max: null };
      }
      const mins = entries.map((e) => e.main.temp_min);
      const maxs = entries.map((e) => e.main.temp_max);
      const mid = entries[Math.floor(entries.length / 2)];
      return {
        date,
        weatherIcon: mid.weather[0].icon,
        temp_min: Math.min(...mins),
        temp_max: Math.max(...maxs),
      };
    });
  }, [data]);

  const firstData = data?.list[0];

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      {/* Left side: today */}
      <div className="w-[30%] bg-white flex items-center justify-center">
        <main className="px-3 max-w-7xl mt-10 flex flex-col gap-9 w-full m-auto">
          <section>
            <div className="flex flex-col px-4 items-center">
            <div className="">
              <WeatherIcon iconName={firstData?.weather[0]?.icon ?? ""} />
            </div>
              <span className="text-5xl">
                {convertKelvintoCelsius(firstData?.main.temp ?? 0)}°C
              </span>
              <span className="text-xl mt-2">
                {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
              </span>
            </div>
            
          </section>
        </main>
      </div>

      {/* Right side: 3‑day forecast */}
      <div className="w-[70%] bg-gray-300 p-6">
        <SearchBox />
        <Container className="flex flex-row ml-5 mt-5 gap-5">
          {dailyData.map((d, i) => (
            <ForecastWeatherDetail
              key={i}
              date={format(parseISO(d.date + "T00:00:00"), "dd.MM")}
              weathericon={d.weatherIcon ?? "01d"}
              temp_min={d.temp_min ?? 0}
              temp_max={d.temp_max ?? 0}
              
            />
            
            
          ))}

        </Container>
        <Container className=" flex flex-row gap-10 mt-6 ml-4">
              <WeatherDetails
                humidity={`${firstData?.main.humidity}%`}
                windSpeed={convertWindSpeed(firstData?.wind.speed)}
              />
            </Container>
      </div>
    </div>
  );
}
