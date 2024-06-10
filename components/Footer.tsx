"use client"
import Link from "next/link";
import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row py-6 w-full shrink-0 items-center justify-between px-4 md:px-6 border-t dark:bg-[#111827]">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 zENLI Inc. All rights reserved.</p>
      <div className="flex gap-4 mt-2 sm:mt-0">
        <Link href="https://x.com/Zenli_in" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" size={20} />
        </Link>
        <Link href="https://www.instagram.com/zenli_in/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" size={20} />
        </Link>
        <Link href="https://www.linkedin.com/company/zenli/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" size={20} />
        </Link>
      </div>
      <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
