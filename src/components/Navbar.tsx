import { MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-{80px} w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-3xl mt-0 text-yellow-300 " />
        </p>
        {/* creating a search bar component */}
        <section className="flex gap-2 items-center">
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
