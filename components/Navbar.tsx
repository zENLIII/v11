"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; // adjust the import path as necessary
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link href="/" className="text-white hover:text-blue-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-blue-300">
            About
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/profile" className="text-white hover:text-blue-300">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={() => auth.signOut()} className="text-white hover:text-blue-300">
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/signin" className="text-white hover:text-blue-300">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="text-white hover:text-blue-300">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
