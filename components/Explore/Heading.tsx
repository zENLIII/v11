"use client";
import { Button } from "../ui/button";
import Image from "next/image";
const Heading = () => {
  return (
    <>
      <section className="w-full py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Explore Projects
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-gray-500 md:text-xl dark:text-gray-400">
              Welcome to our project showcase! Dive into the innovative world of technology with our curated collection 
              of projects. 
              </p>
            </div>
            <div className="container flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3">
            <Image
                className="object-center w-1/3 mb-10  shadow-md"
                 alt="hero"
                 src="placeholder.svg"
                 width={100}
                 height={300}
            />
            </div>  
            </div>
          </div>
      </section>
    </>
  );
};

export default Heading;
