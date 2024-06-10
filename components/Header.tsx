"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { FaBars, FaTimes } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { auth, db } from '../lib/firebase'; // adjust the import path as necessary
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import ThemeSwitch from "./ThemeSwitch";
import {
  LogOut,
  Plus,
  PlusCircle,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import logo from "@/public/_zenli.svg";
import logo1 from "@/public/_zenli_white.svg";
import { useTheme } from "next-themes";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import "@/styles/header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [nav, setNav] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { resolvedTheme } = useTheme();
  const [username, setUsername] = useState("");
  const pathname = usePathname(); // Initialize usePathname

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserRole(userData.role);
        setUsername(userData.username);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserDetails(user);
      } else {
        setUser(null);
        setUserRole(null);
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  const links = [
    {
      id: 1,
      link: "/",
      data: "home",
    },
    {
      id: 2,
      link: "/explore",
      data: "explore",
    },
    {
      id: 3,
      link: "/about",
      data: "about us",
    },
  ];

  return (
    <div
      id="navbar"
      className={`flex justify-between items-center w-full fixed nav transition-all duration-400 shadow-xl z-20 ${
        shrink
          ? "bg-[#eef2ff] dark:bg-black py-2"
          : "bg-[#eef2ff] dark:bg-black py-6"
      } text-black dark:text-white px-4`}
    >
      <div
        className={`ml-2 ${
          shrink ? "text-2xl" : "text-4xl"
        } transition-all duration-400`}
      >
        <Image
          src={resolvedTheme === "dark" ? logo1 : logo}
          alt="Logo"
          className={`w-auto h-10 ${shrink ? "scale-75" : "scale-100"}`}
        />
      </div>

      <div className="flex-1 flex justify-center">
        <ul className="hidden md:flex">
          {links.map(({ id, link, data }) => (
            <li
              key={id}
              className={`nav-links px-4 cursor-pointer capitalize font-medium transition-all duration-400 ${
                shrink ? "text-lg" : "text-xl"
              } text-gray-800 dark:text-gray-500 hover:text-black dark:hover:text-white link-underline hover:scale-105 ${
                pathname === link ? "relative active-link" : ""
              }`}
            >
              <Link href={link}>
                {data}
                {pathname === link && (
                  <div className="active-link-bg"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-5">
        {user && (
          <>
            <ul className="hidden md:flex">
              <Link
                href="/dashboard"
                className={`link-cta  px-4 cursor-pointer capitalize font-medium transition-all duration-400 ${
                  shrink ? "text-lg" : "text-xl"
                } text-gray-800 dark:text-gray-500 hover:text-black dark:hover:text-white`}
              >
                <span>Dashboard</span>
              </Link>
            </ul>
            <ul className="hidden md:flex"> 
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
                      {userRole === "mentor" || userRole === "admin" ? (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/mentordashboard" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Mentor Mode</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/create-project" className="flex items-center">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              <span>Create Project</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href="/become-mentor" className="flex items-center">
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Become a Mentor</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
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
            </ul>
          </>
        )}

        <ul className="hidden md:flex">  
          {!user && (
            <>
              <Link
                href="/sign-up"
                className={`nav-links px-2 cursor-pointer capitalize font-medium transition-all duration-400 ${
                  shrink ? "text-lg" : "text-xl"
                } text-gray-800 dark:text-gray-500 hover:text-black dark:hover:text-white link-underline hover:scale-105`}
              >
                Sign-up
              </Link>
              <Link
                href="/sign-in"
                className={`nav-links px-2 cursor-pointer capitalize font-medium transition-all duration-400 ${
                  shrink ? "text-lg" : "text-xl"
                } text-gray-800 dark:text-gray-500 hover:text-black dark:hover:text-white link-underline hover:scale-105`}
              >
                Login
              </Link>
            </>
          )}
        </ul>

        <ul className="hidden md:flex">  
          <ThemeSwitch />
        </ul>
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-800 dark:text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-[#eef2ff] to-slate-300 text-gray-800 dark:bg-gradient-to-b dark:from-gray-800 dark:to-black dark:text-gray-500">
          {links.map(({ id, link, data }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl link-underline"
              onClick={() => setNav(false)}
            >
              <Link href={link}>{data}</Link>
            </li>
          ))}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="px-4 cursor-pointer capitalize py-6 text-4xl link-underline"
                onClick={() => setNav(false)}
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-4 cursor-pointer capitalize py-6 text-4xl link-underline">
                    Menu
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
                      {userRole === "mentor" || userRole === "admin" ? (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/mentordashboard" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Mentor Mode</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/create-project" className="flex items-center">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              <span>Create Project</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href="/become-mentor" className="flex items-center">
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Become a Mentor</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
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
            </>
          )}
          {!user && (
            <>
              <Link
                href="/sign-up"
                className="px-4 cursor-pointer capitalize py-6 text-4xl link-underline"
                onClick={() => setNav(false)}
              >
                Sign-up
              </Link>
              <Link
                href="/sign-in"
                className="px-4 cursor-pointer capitalize py-6 text-4xl link-underline"
                onClick={() => setNav(false)}
              >
                Login
              </Link>
            </>
          )}
          <ThemeSwitch />
        </ul>
      )}
    </div>
  );
}
