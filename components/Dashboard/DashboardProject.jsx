import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ThemeSwitch from "../ThemeSwitch";
import { FaBars, FaTimes } from "react-icons/fa";

export function DashboardProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const fetchProjectAndMentor = async () => {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setProject({ id: docSnap.id, ...projectData });

        // Fetch the mentor's details if adminId is present
        if (projectData.adminId) {
          const mentorRef = doc(db, "users", projectData.adminId);
          const mentorSnap = await getDoc(mentorRef);
          if (mentorSnap.exists()) {
            setMentor(mentorSnap.data().username); // Assuming 'username' is the field storing mentor's name
          }
        }
      } else {
        console.log("No such project document!");
      }
    };

      if (id) {
          fetchProject(id);
          fetchProjectAndMentor();
      }
  }, [id]);

  const fetchProject = async (projectId) => {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          setProject(docSnap.data());
      }
  };

  if (!project) {
    return <p>Loading...</p>;
  }

    
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r  lg:block bg-[#bae6fd] dark:bg-[#0F2143]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="/dashboard"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="">Dashboard</span>
            </Link>
            <div className="ml-auto">
              <ThemeSwitch />
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}`}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/announcements`}
              >
                <TrendingUpIcon className="h-4 w-4" />
                Announcements
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/resources`}
              >
                <PackageIcon className="h-4 w-4" />
                Resources
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/assignments`}
              >
                <MessageSquareIcon className="h-4 w-4" />
                Assignments
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/chats`}
              >
                <UserIcon className="h-4 w-4" />
                Chat
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#bae6fd] dark:bg-[#0F2143] px-6 z-10">
          <Link className="lg:hidden" href="/dashboard">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-xl sm:text-sm md:text-sm">
              {project.name}
            </h1>
          </div>
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-gray-800 dark:text-gray-500 lg:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
          {nav && (
            <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-200 dark:from-black dark:to-gray-800 text-gray-800 dark:text-gray-500 lg:hidden">
              <div className="flex flex-col items-center p-4">
                <nav className="grid gap-6 text-center">
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/`}
                  >
                    Home
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/announcements`}
                  >
                    Announcements
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/resources`}
                  >
                    Resources
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/assignments`}
                  >
                    Assignments
                  </Link>
                  
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/chats`}
                  >
                    Chat
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </header>

        <main className="grid gap-4 p-4 md:gap-8 md:p-10">
          <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start max-w-5xl mx-auto lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]">
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {project.name}
                </h1>
                <p className="text-sm text-black dark:text-white">
                  Mentored by {mentor ? mentor : "No mentor assigned"}
                </p>
                <p className="text-2xl font-semibold text-black dark:text-white">
                  Welcome to the {project.name}!
                </p>
                <p className="text-black dark:text-white">{project.intro}</p>
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <h2 className="text-base font-bold tracking-tighter lg:text-2xl xl:text-3xl">
                  Project Mentor
                </h2>
                <div className="grid gap-1 text-sm">
                  <p>
                    <strong> {mentor ? mentor : "No mentor assigned"}</strong>
                  </p>
                  <p>Head of Digital Marketing, Acme Inc.</p>
                  <p>
                    John is an experienced digital marketer with over a decade
                    of experience in the industry. He has helped numerous
                    companies improve their online presence and reach their
                    target audience through effective digital marketing
                    strategies.
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-base font-bold tracking-tighter lg:text-2xl xl:text-3xl">
                  Project Timeline
                </h2>
                <div className="grid gap-1 text-sm">
                  {project.timeline.map((week, index) => (
                    <div key={index} className="flex items-start space-y-1">
                      <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <p>{week}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-base font-bold tracking-tighter lg:text-2xl xl:text-3xl">
                  Project Prerequitsite
                </h2>
                <div className="grid gap-1 text-sm">
                  <div className="flex items-start space-y-1">
                    <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <p>{project.prereq}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function ExternalLinkIcon(props) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}

function Package2Icon(props) {
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


function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function TrendingUpIcon(props) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}


function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function MessageSquareIcon(props) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function FrameIcon(props) {
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
        <line x1="22" x2="2" y1="6" y2="6" />
        <line x1="22" x2="2" y1="18" y2="18" />
        <line x1="6" x2="6" y1="2" y2="22" />
        <line x1="18" x2="18" y1="2" y2="22" />
      </svg>
    )
  }
  
  
  function FileIcon(props) {
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
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
  
  function CheckIcon(props) {
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
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  }
  