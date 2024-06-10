import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db, fetchProjects } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import ThemeSwitch from "../ThemeSwitch";
import { FaBars, FaTimes } from "react-icons/fa";
export function DashboardAnnouncement() {


const { id } = useParams();
const [announcements, setAnnouncements] = useState([]);
const [project, setProject] = useState(null);
const [nav, setNav] = useState(null);

useEffect(() => {
  if (id) {
    fetchAnnouncements(id);
    fetchProject(id);
  }
}, [id]);

const fetchAnnouncements = async (projectId) => {
  const collRef = collection(db, "projects", projectId, "announcements");
  const snapshot = await getDocs(collRef);
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setAnnouncements(items);
};

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
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-white dark:bg-black">
      <div className="hidden border-r lg:block bg-[#bae6fd] dark:bg-[#0F2143]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard/">
              <Package2Icon className="h-6 w-6" />
              <span className="">Dashboard</span>
            </Link>
            <div className="ml-auto">
                <ThemeSwitch/>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/`}
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
        <main className="grid gap-4 p-2 md:gap-8 md:p-10">
          <div className="flex flex-col w-full min-h-screen">
            <div className="mx-auto max-w-7xl w-full flex flex-col min-h-screen">
              <header className="flex justify-center items-center gap-2 px-4 md:px-6">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold font-sans tracking-tighter sm:text-5xl xl:text-6xl/none text-black dark:text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    Announcements
                  </h1>
                </div>
              </header>
              <div className="mt-10 mx-auto grid max-w-4xl gap-8 px-4 md:gap-12 lg:px-6">
                <div className="grid gap-2">
                  {announcements.map((ann) => (
                    <div key={ann.id} className=" bg-white dark:bg-gray-800 flex flex-col border shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg">
                      <div className="space-y-1.5 p-2">
                        <h3 className="font-bold text-xl">{ann.title}</h3>
                        <p className="text-sm text-[#475569] dark:text-[#94a3b8]">
                        Posted on: {ann.createdAt.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 text-sm text-[#09090b] dark:text-[#fafafa]">
                      {ann.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


function CalendarIcon(props:any) {
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


function ExternalLinkIcon(props:any) {
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


function BellIcon(props:any) {
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


function HomeIcon(props:any) {
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


function TrendingUpIcon(props:any) {
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


function PackageIcon(props:any) {
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


function MessageSquareIcon(props:any) {
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


function UserIcon(props:any) {
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

function FrameIcon(props:any) {
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
  
  
  function FileIcon(props:any) {
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
  