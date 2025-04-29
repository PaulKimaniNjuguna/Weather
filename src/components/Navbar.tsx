import { MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-{80px} w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          
         
        </p>
        {/* creating a search bar component */}
        <section className="">
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
