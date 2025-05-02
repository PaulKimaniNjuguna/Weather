import React, { ReactElement } from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import { convertKelvintoCelsius } from "@/utils/convertKelvintoCelsius";
export interface ForecastWeatherDetailProps {
  date: string;
  weathericon: string;
  temp_min: number;
  temp_max: number;
  description: string;
  
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    date = "19.09",
    weathericon = "02d",
    temp_min,
    temp_max,
    description,
    
  } = props;
  const minC = convertKelvintoCelsius(temp_min);
  const maxC = convertKelvintoCelsius(temp_max);
  return (
    <Container className="gap-4">
      <section className="flex gap-4 items-center px-4 ">
        <div className="flex flex-col px-4 border border-black-500 h-[150px] w-[200px] items-center" >
          <p>{date}</p>
          <p>
            <WeatherIcon iconName={weathericon} />
          </p>
          <p>{minC}°C - {maxC}°C</p>
          
        </div>
      </section>
    </Container>
  );
}
