"use client";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import {toast, Toaster} from "sonner";

function HeroSection(){
    return (
      <section className="w-full py-12 md:py-24 lg:py-16 xl:py-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 ...  z-10">
        <div className="container px-4 md:px-6 md:mt-24 mt-12 lg:mt-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl ">
                Revolutionizing <br /> Project Building
              </h1>
              <p className="mx-auto max-w-[700px] text-base text-gray-900 md:text-base dark:text-[#cbd5e1]">
                Discover a new era of project collaboration and innovation. Join
                us as we redefine the way projects are conceived, developed, and
                delivered.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-center">
                <Link
                  href="/explore"
                  className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
                >
                  <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#290245] rounded-md group-hover:mt-0 group-hover:ml-0 dark:bg-[#1a0130]"></span>
                  <span className="absolute inset-0 w-full h-full bg-white rounded-md dark:bg-gray-900"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#290245] rounded-md opacity-0 group-hover:opacity-100 dark:bg-[#1a0130]"></span>
                  <span className="relative text-[#290245] transition-colors duration-200 ease-in-out delay-100 group-hover:text-white dark:text-white dark:group-hover:text-[#B5C0D0]">
                    Explore
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
    

export default HeroSection