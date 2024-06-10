"use client";
import { useState, useEffect } from 'react';
import { auth, db, googleProvider, githubProvider } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from "@/public/_zenli.svg";
import logo1 from "@/public/_zenli_white.svg";
import { Button } from '../ui/button';
import CustomAlert from './CustomAlert';
import { useRouter } from 'next/router';



const SigninPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<{ message } | null>(null);


  const handleSignin = async (provider) => {
    try {
      if (provider === "email") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithPopup(
          auth,
          provider === "google" ? googleProvider : githubProvider
        );
      }
      setAlert({ message: "Signin successful!", type: 'success' });
      setTimeout(() => setAlert(null), 3500);
      window.location.href = "/";
    }
    catch (error) {
      console.error("Sign-in failed:", error.message);
      setAlert({ message: "Sign-in failed!", type: 'error' });
      setTimeout(() => setAlert(null), 3500); // Ensure alert is hidden after it fades out
    
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log("User data:", userDoc.data());
        } else {
          console.log("No user data found in the database.");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const { setTheme, resolvedTheme } = useTheme();

  return (
    <section className="min-h-screen w-full py-4 bg-white dark:bg-black">
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
            Welcome Back!
          </p>

          {alert && <CustomAlert message={alert} onClose={() => setAlert(null)} />} {/* Add CustomAlert component */}

          <div className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <button
              onClick={() => handleSignin("google")}
              className="w-5/6 px-4 py-3 font-bold text-center"
            >
              Sign In with Google
            </button>
          </div>

          <div className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878.617.113.844-.268.844-.598 0-.296-.011-1.082-.017-2.123-3.436.747-4.158-1.654-4.158-1.654-.562-1.429-1.375-1.809-1.375-1.809-1.125-.77.086-.754.086-.754 1.243.087 1.896 1.277 1.896 1.277 1.105 1.895 2.899 1.347 3.607 1.03.112-.8.432-1.347.785-1.656-2.743-.313-5.618-1.372-5.618-6.112 0-1.35.481-2.451 1.271-3.316-.127-.314-.55-1.569.121-3.27 0 0 1.036-.332 3.395 1.265.984-.274 2.039-.411 3.088-.416 1.048.005 2.104.142 3.09.416 2.355-1.597 3.39-1.265 3.39-1.265.674 1.701.25 2.956.122 3.27.793.865 1.27 1.966 1.27 3.316 0 4.751-2.881 5.794-5.629 6.098.444.382.838 1.136.838 2.288 0 1.65-.015 2.979-.015 3.383 0 .333.223.717.851.595C18.343 21.122 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              onClick={() => handleSignin("github")}
              className="w-5/6 px-4 py-3 font-bold text-center"
            >
              Sign In with Github
            </button>
          </div>

          <form className="mt-4">
            <div>
              <label
                htmlFor="LoggingEmailAddress"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#18181B] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  htmlFor="loggingPassword"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >
                  Password
                </label>
                <Link
                  href="/forget-password"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#18181B] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <Button onClick={() => handleSignin("email")} className="w-full">
                Sign In
              </Button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
