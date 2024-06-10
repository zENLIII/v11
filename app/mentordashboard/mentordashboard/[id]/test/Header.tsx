import React from 'react';
import Link from 'next/link';

import ThemeSwitch from '@/components/ThemeSwitch';

interface HeaderProps {
  projectName: string;
}

const Header: React.FC<HeaderProps> = ({ projectName }) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#c4b5fd] px-6 dark:bg-[#2C2C54]">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex-1">
        <h1 className="font-semibold text-lg">{projectName}</h1>
      </div>
      <div className="ml-auto">
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default Header;


function Package2Icon(props:any) {
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    )
  }
  