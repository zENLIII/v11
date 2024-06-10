"use client";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import {toast, Toaster} from "sonner";
import Image from "next/image";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

function FeaturedCategories() {
  return (
<section className="w-full py-12 md:py-24 lg:py-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0c4a6e] ...">
  <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
    <div className="space-y-3">
      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
        What Our Users Say
      </h2>
      <p className="mx-auto max-w-[600px] text-black md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-white">
        Hear from our satisfied Mentees and Mentors who have become successful by joining our Platform.
      </p>
    </div>
    <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
      <Card className="custom-card mx-auto w-full max-w-xs">
        <CardContent className="custom-content p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.png" />
              <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                AN
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Anurag
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                IIT Bombay, Mumbai
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            At zENLI we were easily able to collaborate with our mentor and peers to complete the project.
          </p>
        </CardContent>
      </Card>

      <Card className="custom-card mx-auto w-full max-w-xs">
        <CardContent className="custom-content p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.png" />
              <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                SI
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Siddhant
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                IIT Bombay, Mumbai
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            zENLI helped me by providing the opportunities to learn new things under the guidance of a mentor, which helped me save a lot of my time.
          </p>
        </CardContent>
      </Card>

      <Card className="custom-card mx-auto w-full max-w-xs">
        <CardContent className="custom-content p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.png" />
              <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                SA
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Saurab
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                IIT Bombay, Mumbai
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            We collaborated and worked with our team and mentor on zENLI, which helped us learn things in a structured and fast pace.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

  );
}
    

export default FeaturedCategories
