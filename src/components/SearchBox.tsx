'use client';

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { cn } from "@/utils/cn"; // Make sure this utility exists

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

function SearchBox(props: Props) {
  return (
    <form
      className={cn(
        "flex justify-center h-10",
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location"
        className="px-4 py-2 w-[230px] border border-black-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button
        className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  if ((!showSuggestions || suggestions.length < 1) && !error) return null;

  return (
    <ul className="mb-4 bg-white absolute border py-2 px-2 z-50 w-[230px]">
      {error && <li className="text-red-500 p-1">{error}</li>}
      {suggestions.map((item, i) => (
        <li
          key={i}
          onClick={() => handleSuggestionClick(item)}
          className="cursor-pointer p-1 rounded hover:bg-gray-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function NavbarComponent() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setError("Error fetching suggestions");
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
    } else {
      setError("");
      setShowSuggestions(false);
      // Do something with `city`, e.g., fetch forecast
      console.log("Searching for:", city);
    }
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto relative">
        <SearchBox
          value={city}
          onSubmit={handleSubmitSearch}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <SuggestionBox
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
          error={error}
        />
      </div>
    </nav>
  );
}