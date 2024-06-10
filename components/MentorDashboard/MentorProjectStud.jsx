
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import ThemeSwitch from "../ThemeSwitch"
import { FaBars, FaTimes } from "react-icons/fa"

export function MentorProjectStud() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [nav, setNav] = useState([]);

  useEffect(() => {
    if (id) {
      fetchSubmissions(id);
    }
  }, [id]);

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
      fetchProject();
      fetchProjectAndMentor();
    }
  }, [id]);

  const fetchProject = async () => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProject(docSnap.data());
    }
  };

  const fetchSubmissions = async (projectId) => {
    const collRef = collection(db, "projects", projectId, "assignments");
    const snapshot = await getDocs(collRef);
    const assignmentsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    let submissionsArray = [];
    for (const assignment of assignmentsList) {
      const submissionsRef = collection(
        db,
        "projects",
        projectId,
        "assignments",
        assignment.id,
        "submissions"
      );
      const submissionSnapshot = await getDocs(submissionsRef);
      submissionSnapshot.forEach((doc) => {
        submissionsArray.push({
          id: doc.id,
          assignmentTitle: assignment.title,
          ...doc.data(),
        });
      });
    }
    setSubmissions(submissionsArray);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] dark:bg-[#3D405B] bg-[#f5f3ff]">
      <div className="hidden border-r bg-[#c4b5fd] lg:block dark:bg-[#2C2C54]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="/mentordashboard"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/`}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/students`}
              >
                <TrendingUpIcon className="h-4 w-4" />
                Students
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/announcements`}
              >
                <PackageIcon className="h-4 w-4" />
                Announcements
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/resources`}
              >
                <ResourceIcon className="h-4 w-4" />
                Resources
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/assignments`}
              >
                <MessageSquareIcon className="h-4 w-4" />
                Assignment
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/mentordashboard/${id}/chats`}
              >
                <UserIcon className="h-4 w-4" />
                Chat
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#c4b5fd] px-6 dark:bg-[#2C2C54] z-10">
        <Link className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold text-xl sm:text-sm md:text-sm">{project.name}</h1>
        </div>
        <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-800 dark:text-gray-500 lg:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-200 dark:from-black dark:to-gray-800 text-gray-800 dark:text-gray-500 lg:hidden">
            <div className="flex flex-col items-center p-4">
              <nav className="grid gap-6 text-center">
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/`}>
                  Home
                </Link>
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/students`}>
                  Students
                </Link>
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/announcements`}>
                  Announcements
                </Link>
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/resources`}>
                  Resources
                </Link>
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/assignments`}>
                  Assignment
                </Link>
                <Link className="py-2 text-lg" href={`/mentordashboard/${id}/chats`}>
                  Chat
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      
        <main className="grid gap-4 p-4 md:gap-8 md:p-10 bg-[#f5f3ff] dark:bg-[#3D405B]">
          <div className="mt-2 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {project.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Mentored by {mentor ? mentor : "No mentor assigned"}
              </p>
              
            </div>
          </div>
          <div className="border shadow-xl rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Submitted on</TableHead>
                  <TableHead className="hidden md:table-cell">Mentee</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Assignment
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    View Submission
                  </TableHead>
                </TableRow>
              </TableHeader>
              {submissions.length === 0 ? (
                <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center">No submissions yet.</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
              ) : (
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        {sub.createdAt
                          ? new Date(
                              sub.createdAt.seconds * 1000
                            ).toLocaleString()
                          : "Just now"}
                      </TableCell>
                      <TableCell>{sub.menteeName}</TableCell>
                      <TableCell>{sub.assignmentTitle}</TableCell>
                      <TableCell>
                        <Link
                          href={`https:/${sub.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden md:table-cell underline hover:no-underline"
                        >
                          Click here to View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
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


function ResourceIcon(props) {
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
      <path d="M12 2l7 7-7 7-7-7 7-7z" />
      <path d="M2 12l5-5-5-5" />
      <path d="M22 12l-5 5 5 5" />
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
