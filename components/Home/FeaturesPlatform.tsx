"use client";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

function FeaturesPlatform() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-[#94a3b8] px-3 py-1 text-sm dark:bg-[#0f172a]">
              Key Features
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl mb-5">
              Why Join Our Platform?
            </h2>
            <p className="max-w-[900px] -mt-10 text-gray-500 md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
              Our platform offers unparalleled opportunities for personal and
              professional growth through innovative projects and mentorship.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Personalized Learning Paths</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#475569]">
                Our AI-driven system tailors learning experiences to your unique goals and skill levels.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Mentorship from Accomplished Individuals</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#475569]">
              Connect with accomplished mentors, gaining insights and guidance.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Hands-On Projects</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
              Engage in real-world projects, enhancing your practical skills and building a portfolio that stands out.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Community Networking</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#475569]">
              Join a vibrant community of like-minded individuals, fostering collaboration, knowledge sharing, and networking.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Comprehensive Resource Library</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#475569]">
              Access a curated collection of learning materials, including tutorials, articles, and videos.
              </p>
            </div>
          </div>
          <div className="relative w-full h-[150px] overflow-hidden rounded-[14px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center">
            <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 opacity-100 blur-[12px] animate-[blob-bounce_5s_infinite_ease] z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] bg-[rgba(255,255,255,0.95)] backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]"></div>
            <div className="grid gap-1 relative z-10 p-4">
              <div className="flex items-center gap-2">
                  <InboxIcon className="h-8 w-8 text-gray-500 dark:text-[#475569]" />
                <h3 className="text-lg font-bold dark:text-[#0f172a]">Career Development Tools</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-[#475569]">
              Utilize our resume builder, interview preparation modules, and job search tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesPlatform;

function ImportIcon(props: any) {
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
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
    </svg>
  );
}

function InboxIcon(props: any) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function MergeIcon(props: any) {
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
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ProjectorIcon(props: any) {
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
      <path d="M5 7 3 5" />
      <path d="M9 6V3" />
      <path d="m13 7 2-2" />
      <circle cx="9" cy="13" r="3" />
      <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
      <path d="M16 16h2" />
    </svg>
  );
}

function TimerIcon(props: any) {
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
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

function ViewIcon(props: any) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
