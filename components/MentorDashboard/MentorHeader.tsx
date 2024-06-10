"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// // import ThemeSwitch from "./ThemeSwitch";
// import { useUser, useClerk } from "@clerk/nextjs";
import { auth } from "@/lib/firebase";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { db } from "@/lib/firebase"; // Adjust the import path as necessary
import { doc, getDoc } from 'firebase/firestore';


import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";

import ThemeSwitch from "../ThemeSwitch";

function MentorHeader() {
  const [nav, setNav] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username); // Set the username state
        }
      } else {
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="dark:bg-indigo-950 bg-indigo-200 text-white py-4 px-6 flex items-center justify-between">
      <ul className="hidden md:flex">
        <nav className="flex items-center gap-6">
          <Link
            className="text-black dark:text-gray-400 hover:text-white dark:hover:text-white"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-black dark:text-gray-400 hover:text-white dark:hover:text-white"
            href="/create-project"
          >
            Create Project
          </Link>
        </nav>
      </ul>

      <ul className="hidden md:flex">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{username ? username.slice(0, 2).toUpperCase() : "NA"}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#27272A] text-black dark:text-white drop-shadow-md w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/explore" className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Explore</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Mentee Mode</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-project" className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Create Project</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => auth.signOut()}
                    className="flex items-center w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          <div>
            <h1 className="text-lg font-semibold">user profile</h1>
            <p className="text-gray-400 text-sm">Mentor</p>
          </div>

          <ThemeSwitch />
        </div>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-800 dark:text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-200 dark:from-black dark:to-gray-800 text-gray-800 dark:text-gray-500">
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <ThemeSwitch />
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/">
              Home
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/explore">
              Explore
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/create-project">
              Create Project
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/">
              Profile
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link onClick={() => setNav(!nav)} href="/">
              Mentee Mode
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <button
              onClick={() => {
                auth
                  .signOut()
                  .then(() => {
                    window.location.href = "/";
                  })
                  .catch((error) => {
                    // Handle error if needed
                    console.error("Sign out error:", error);
                  });
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}

export default MentorHeader;



function FilterIcon(props) {
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
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    )
  }
  
  
  function ListIcon(props) {
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
        <line x1="8" x2="21" y1="6" y2="6" />
        <line x1="8" x2="21" y1="12" y2="12" />
        <line x1="8" x2="21" y1="18" y2="18" />
        <line x1="3" x2="3.01" y1="6" y2="6" />
        <line x1="3" x2="3.01" y1="12" y2="12" />
        <line x1="3" x2="3.01" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function UsersIcon(props) {
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  