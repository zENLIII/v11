import React from 'react';
import Link from 'next/link';
import { FaBoxOpen, FaHome, FaBullhorn, FaBox, FaComments, FaUser } from 'react-icons/fa'; // Adjust these based on the actual icons you need
import ThemeSwitch from '../ThemeSwitch'; // Adjust the import path as necessary

const Sidebar = ({ id }) => {
  return (
    <div className="hidden border-r lg:block bg-gradient-to-r from-blue-400">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <FaBoxOpen className="h-6 w-6" />
            <span className="">Dashboard</span>
          </Link>
          <div className="ml-auto">
            <ThemeSwitch />
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={`/dashboard/${id}`}
            >
              <FaHome className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={`/dashboard/${id}/announcements`}
            >
              <FaBullhorn className="h-4 w-4" />
              Announcements
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={`/dashboard/${id}/resources`}
            >
              <FaBox className="h-4 w-4" />
              Resources
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={`/dashboard/${id}/assignments`}
            >
              <FaComments className="h-4 w-4" />
              Assignments
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-black dark:text-white transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={`/dashboard/${id}/chats`}
            >
              <FaUser className="h-4 w-4" />
              Chat
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
