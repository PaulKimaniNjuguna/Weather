import React from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";

type Props = {
    className?: string;
    value:string
    onChange:React.ChangeEventHandler<HTMLInputElement>
    onSubmit:React.FormEventHandler<HTMLFormElement>
    
};

export default function SearchBox(props: Props) {
  return (
    <form className={cn('flex cn(...inputs: ClassValue[]): string justify-center h-10 mr-200', props.className)} onSubmit={props.onSubmit}>
      <input
        type="text" 
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location"
        className="px-4 py-2 w-{230px} border border-gray-300 rounded-l-md
            focus:outline-none focus:border-blue-500 h-full "
      />
      <button
        className="px-4 py-{9px} bg-blue-500 text-white rounded-r-md focus:outline:none
            hover:bg-blue-600 h-full"
      >
        <p>Go</p>
      </button>
    </form>
  );
}
