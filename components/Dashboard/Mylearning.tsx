
"use client"

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Header from '@/components/Header';
import Image from 'next/image';
import boy from "@/public/mylearning_3.svg";

const Mylearning = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      console.log("Auth state changed:", authenticatedUser);
      setUser(authenticatedUser);
      if (authenticatedUser) {
        console.log("Fetching projects for user ID:", authenticatedUser.uid);
        fetchMyProjects(authenticatedUser.uid);
      }
    });
    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  const fetchMyProjects = async (userId) => {
    console.log("Querying orders collection for user ID:", userId);
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", userId)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    console.log("Orders found:", ordersSnapshot.size);
    const projects = await Promise.all(
      ordersSnapshot.docs.map(async (orderDoc) => {
        console.log(
          "Fetching project data for project ID:",
          orderDoc.data().projectId
        );
        const projectRef = doc(db, "projects", orderDoc.data().projectId);
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          console.log("Project data retrieved:", projectSnap.data());
          return { id: projectSnap.id, ...projectSnap.data() };
        } else {
          console.log("No project found for ID:", orderDoc.data().projectId);
          return null;
        }
      })
    );
    setMyProjects(projects.filter((project) => project !== null));
    console.log("Final project list set:", projects);
  };

  return (
  <section className="w-full py-24 md:py-36 lg:py-16">
  <div className="container mx-auto">
    <div className="flex flex-col gap-8 p-2 md:p-8">
      <div className="flex flex-col items-start gap-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
              My Projects
            </h1>
            <p className="text-black dark:text-white py-2">
              View and manage all the projects you&apos;ve purchased.
            </p>
          </div>
          <Image
            src={boy}
            alt="Decorative Image"
            className="w-56 h-56"
          />
        </div>
      </div>
      
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:-mt-10 sm:lg:-mt-4">
        {myProjects.length > 0 ? (
          myProjects.map((project) => (
            <div key={project.id}>
              <Card className="flex flex-col rounded-lg shadow-lg overflow-hidden w-full max-w-sm transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white dark:bg-black shadow-[5px_5px_rgba(7,_89,_133,_0.4),_10px_10px_rgba(7,_89,_133,_0.3),_15px_15px_rgba(7,_89,_133,_0.2),_20px_20px_rgba(7,_89,_133,_0.1),_25px_25px_rgba(7,_89,_133,_0.05)]">
  <CardHeader className="flex-shrink-0 px-2 py-2 relative h-48 overflow-hidden">
    <Link href={`/dashboard/${project.id}`} className="relative w-full h-full">
      {project.imageUrl ? (
        <img
          alt={project.name}
          src={project.imageUrl}
          className="absolute top-0 left-0 w-full h-full object-cover"
          height="200"
          width="400"
          style={{ aspectRatio: "400/200" }}
        />
      ) : (
        <Image
          alt="Project Image"
          src="/placeholder.svg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          height="200"
          width="400"
          style={{ aspectRatio: "400/200" }}
        />
      )}
    </Link>
  </CardHeader>
  <CardContent className="flex-1 bg-white dark:bg-black px-4 py-0 flex flex-col justify-between">
    <div className="flex-1">
      <p className="font-medium text-indigo-600 text-xs dark:text-indigo-400">
        Project
      </p>
      <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-0">
        <Link
          href={`/dashboard/${project.id}`}
          className="hover:text-indigo-900 cursor-pointer"
        >
          {project.name}
        </Link>
      </CardTitle>
      <CardDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
        {project.intro}
      </CardDescription>
    </div>
    <div className="mt-4 py-4 flex items-center justify-end">
      <Link
        href={`/dashboard/${project.id}`}
        className="relative inline-flex items-center justify-start px-1.5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
      >
        <span className="w-32 h-32 rounded rotate-[-40deg] bg-[#dc2626] dark:bg-[#fca5a5] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-black dark:text-[#111827] transition-colors duration-300 ease-in-out group-hover:text-white dark:group-hover:text-[#7f1d1d]">
          View More
        </span>
      </Link>
    </div>
  </CardContent>
</Card>

            </div>
          ))
        ) : (
          <p>You have not purchased any projects.</p>
        )}
      </div>
    </div>
  </div>
</section>

  );
};

export default Mylearning

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

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

