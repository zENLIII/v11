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



const SignupPage = () => {
  const [formData, setFormData] = useState<UserSignupData>({ email: '', password: '', username: '' });
  const [alert, setAlert] = useState<{ message } | null>(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (provider) => {
    try {
      let userCredential;
      if (provider === "email") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        userCredential = await signInWithPopup(
          auth,
          provider === "google" ? googleProvider : githubProvider
        );
      }
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username || user.displayName,
        email: user.email,
        authProvider: provider,
        role: "user"
      });
      setAlert({ message: "Signup successful!", type: 'success' });
      setTimeout(() => setAlert(null), 3500); // Ensure alert is hidden after it fades out
      window.location.href = '/';
    } catch (error) {
      console.error("Signup failed:", error.message);
      setAlert({ message: "Signup failed!", type: 'error' });
      setTimeout(() => setAlert(null), 3500); // Ensure alert is hidden after it fades out
    }
  };
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

          {alert && <CustomAlert message={alert.message} type={alert.type} />} {/* Add custom alert */}

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
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6783 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <button
              className="w-5/6 px-4 py-3 font-bold text-center"
              onClick={() => handleSignup('google')}
            >
              Sign up with Google
            </button>
          </div>

          <div className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0a12 12 0 0 0-3.792 23.396c.6.11.82-.26.82-.578 0-.285-.01-1.042-.015-2.046-3.338.726-4.042-1.61-4.042-1.61-.546-1.38-1.334-1.75-1.334-1.75-1.09-.745.082-.73.082-.73 1.204.084 1.836 1.24 1.836 1.24 1.07 1.834 2.81 1.304 3.496.997.108-.775.418-1.305.76-1.606-2.664-.303-5.466-1.33-5.466-5.93 0-1.31.467-2.38 1.236-3.22-.124-.304-.536-1.523.116-3.176 0 0 1.008-.323 3.3 1.23a11.465 11.465 0 0 1 3.003-.403c1.02.004 2.048.137 3.003.403 2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.242 2.872.118 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.814 1.096.814 2.21 0 1.595-.014 2.88-.014 3.275 0 .32.217.694.826.576A12.002 12.002 0 0 0 12 0Z"
                  fill="#181717"
                />
              </svg>
            </div>

            <button
              className="w-5/6 px-4 py-3 font-bold text-center"
              onClick={() => handleSignup('github')}
            >
              Sign up with GitHub
            </button>
          </div>

          <div className="mt-8">
            <form onSubmit={(e) => { e.preventDefault(); handleSignup('email'); }}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#27272A] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#27272A] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-[#27272A] dark:text-gray-300 dark:border-gray-600 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div className="mt-6">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-purple-500 focus:outline-none focus:underline hover:underline"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
