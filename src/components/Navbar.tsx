'use client'
import { MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import React from "react";
import { useState } from "react";

type Props = {};
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
export default function Navbar({}: Props) {
  const [city, setCity] =useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChang(value: string){
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweather.org/data/2.5/find?q=${value}&appid=${API_KEY}`)
        const suggestions = response.data.list.map((item: any)=> item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    else {
        setSuggestions([]);
        setShowSuggestions(false);
    }
    function handleSuggestionClick(value: string){
      setCity(value);
      setShowSuggestions(false);
    }
    function handleSubmitSearch (e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if(suggestions.length ==0){
        setError("Location not found");
      }
      else{
        setError('');
        setShowSuggestions(false)
      }
    }
  }
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-{80px} w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          
         
        </p>
        {/* creating a search bar component */}
        <section className="">
          <div>
            <SearchBox 
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChang(e.target.value)}
            />
            <SuggestionBox 
            {...{
               showSuggestions,
               suggestions,
               handleSuggestionClick,
               error
            }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}:{
  showSuggestions: boolean;
  suggestions: string;
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  
  
  return( 
    <>{((showSuggestions && suggestions.length>1) || error)  && (
  <ul className="mb-4 bg-white absolute border py-2 px-2">
    {error && suggestions.length<1 <li className="text-red-500 p-1">{error}</li>}
    {suggestions.map((item, i) => (
      <li key={i}
      onClick={() => handleSuggestionClick(item)} 
      className="cursor-pointer p-1 rounded hover:bg-gray-200">{item}
      </li>
      
    ))}

  </ul>
  )}
  </>
  )
}