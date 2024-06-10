// SignupPage.tsx
"use client";
import { useState } from 'react';
import { auth, db, googleProvider, githubProvider } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import signin from "@/public/signin.svg";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from "@/public/_zenli.svg";
import logo1 from "@/public/_zenli_white.svg";
import { Button } from '../ui/button';
import CustomAlert from './CustomAlert'; // import CustomAlert component
import { sendPasswordResetEmail } from 'firebase/auth';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");

    const resetEmail = () => {
      sendPasswordResetEmail(auth, email)
    }

  const { setTheme, resolvedTheme } = useTheme();

  return (
    <section className="min-h-sceen w-full py-4 bg-white dark:bg-black">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-[#27272A] lg:max-w-4xl py-10 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: "url('/signin.svg')" }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <Image
              className="w-auto h-7 sm:h-8"
              src={resolvedTheme === "dark" ? logo1 : logo}
              alt="zENLI"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome!
          </p>

          
          <div className="mt-8">
            <form onSubmit={(e) => { e.preventDefault();  }}>
              <div>
                <label
                  htmlFor="LogginEmailAddress"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@xyz.com"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#27272A] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>




              <div className="mt-6">
                <Button onClick={()=> resetEmail()}  disabled={!email} type="submit" className="w-full">
                  Send Forget Password Email
                </Button>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
