import React from 'react'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

export interface WeatherDetailProps {
    windSpeed: string;
    humidity: string;   
}

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        windSpeed = "3km/h",
        humidity = "80 %",
    } = props;
    return (
        <>
        <SingleWeatherDetail 
        icon={<WiHumidity />}
         information="Humidity" 
         value={humidity}/>

         <SingleWeatherDetail 
        icon={<FaWind />}
         information="Wind speed" 
         value={windSpeed}/>
         </>
    )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return (
        <div className='flex flex-col justify-between gap-2 items-center font-semibold text-black/80 border border-black-800 w-[300px] h-[150px]'>
            <p className='whitespace-nowrap font-bold'>{props.information}</p>
            <p className=''>{props.value}</p>
            <div className='text-3xl'>{props.icon}</div>
        </div>
    )
}
