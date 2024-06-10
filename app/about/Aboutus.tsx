import React from "react";
import Image from "next/image";
import placeholder from "/public/placeholder.svg";
import allpeople from "/public/team.svg";
import mission from "/public/mission_1.svg";
import vision from "/public/vision_1.svg";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardTitle, CardFooter, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";

function AboutUs() {
  return (
    <div className="p-10 text-black dark:text-white">
      <div className="body-font lg:pt-20">
        <div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
          <div className="flex flex-col w-full mb-2 text-left md:text-center">
            <h1 className="mb-2 text-6xl font-bold tracking-tighter lg:text-8xl md:text-7xl">
              <span>Who We Are?</span>
              <br className="hidden lg:block" />
            </h1>
            <p className="mx-auto text-xl font-normal leading-relaxed text-gray-400 lg:w-2/3">
              Scroll down to listen to our vision and mission
            </p>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3">
          <Image
            className="object-center w-3/4 mb-10 shadow-md"
            alt="hero"
            src={allpeople}
            layout="responsive"
          />
        </div>

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-12">
              <div className="flex justify-center order-last lg:order-first">
                <Image
                  alt="Vision"
                  className="rounded-xl shadow-lg"
                  src={vision}
                  layout="responsive"
                  width={550}
                  height={310}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-gray-300">
                    Vision
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                  At zENLI, our vision is to empower individuals with personalized learning paths, expert mentorship, and hands-on projects. We aim to bridge the gap between education and industry, fostering continuous growth and innovation.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-12 mt-12">
              <div className="flex justify-center">
                <Image
                  alt="Mission"
                  className="rounded-xl shadow-lg"
                  src={mission}
                  layout="responsive"
                  width={550}
                  height={310}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-gray-300">
                    Mission
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                  Our mission at Zenli is to democratize access to quality education and learning opportunities. We provide tailored learning experiences, expert guidance, and real-world projects to help individuals build skills, connect with mentors, and achieve their goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-300 body-font">
          <div className="container px-5 mx-auto">
            <div className="text-center mb-20">
              <h2 className="sm:text-5xl font-medium title-font mb-4">
                Our Team
              </h2>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400">
                Here is our company
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-white inline-flex"></div>
              </div>
            </div>
            <div className="container px-5 py-10 mx-auto">
              <div className="flex flex-wrap justify-center space-x-4">
                <Card className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#155e75]">
                  <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] dark:bg-white dark:text-black">
                    <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          alt="@shadcn"
                          src="/adarsh.jpeg"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-center">
                        <CardTitle>Adarsh J.</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Co-Founder@zENLI.
                        </p>
                      </div>
                      <CardFooter className="flex w-full justify-center space-x-4">
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="https://www.linkedin.com/in/adarsh-jadhao-8b07861ab?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BNAlWn3VgRxu07LrrcF7Waw%3D%3D"
                          target="_blank"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="#"
                        >
                          <InstagramIcon className="h-5 w-5" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                      </CardFooter>
                    </CardContent>
                  </div>
                  <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
                </Card>

                <Card className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#312e81]">
                  <div className="absolute flex items-center justify-center text-white dark:text-black z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] dark:bg-white">
                    <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          alt="@shadcn"
                          src="/aditya.jpeg"
                        />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-center">
                        <CardTitle>Aditya</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        Co-Founder@zENLI
                        </p>
                      </div>
                      <CardFooter className="flex w-full justify-center space-x-4">
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="https://www.linkedin.com/in/aditya-prakash-72a727226?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BoAGbZGEzQhytu7Vt2BldZQ%3D%3D"
                          target="_blank"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="#"
                        >
                          <InstagramIcon className="h-5 w-5" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                      </CardFooter>
                    </CardContent>
                  </div>
                  <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
                </Card>

                <Card className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#881337]">
                  <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] dark:bg-white dark:text-black">
                    <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          alt="@shadcn"
                          src="/vishal.jpeg"
                        />
                        <AvatarFallback>VI</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-center">
                        <CardTitle>Vishal</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        Co-Founder@zENLI
                        </p>
                      </div>
                      <CardFooter className="flex w-full justify-center space-x-4">
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="https://www.linkedin.com/in/vishal-pimpre-316812226?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvB%2FX25BGR%2Bm4mVrHcVWezg%3D%3D"
                          target="_blank"
                       >
                          <LinkedinIcon className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href="#"
                        >
                          <InstagramIcon className="h-5 w-5" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                      </CardFooter>
                    </CardContent>
                  </div>
                  <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
