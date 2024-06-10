
"use client"

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import Header from "@/components/Header";
import ThemeSwitch from "@/components/ThemeSwitch";
import { FaBars, FaTimes } from "react-icons/fa";


const MentorProjectAssign = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [resource, setResource] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [assignment, setAssignment] = useState("");
  const [resources, setResources] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [nav, setNav] = useState(false);
  
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDesc, setAssignmentDesc] = useState('');
  const [assignmentLink, setAssignmentLink] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProject(docSnap.data());
      fetchContents();
    }
  };

  const fetchContents = async () => {
    await fetchCollection("resources", setResources);
    await fetchCollection("announcements", setAnnouncements);
    await fetchCollection("assignments", setAssignments);
  };

  const fetchCollection = async (type, setState) => {
    const collRef = collection(db, "projects", id, type);
    const snapshot = await getDocs(collRef);
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    items.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()); // Sort by date
    setState(items);
  };

  const addContent = async (type, content, clearFields) => {
    const { title, description, link } = content;
    if (!title || !description) return;

    const collRef = collection(db, "projects", id, type);
    await addDoc(collRef, {
        title,
        description,
        link: link || '',
        createdAt: new Date()
    });

    clearFields();
    fetchContents();  // Refresh content list after adding
};

const deleteContent = async (type, contentId) => {
    const docRef = doc(db, "projects", id, type, contentId);
    await deleteDoc(docRef);
    fetchContents();  // Refresh content list after deletion
};


const clearAssignmentFields = () => {
    setAssignmentTitle('');
    setAssignmentDesc('');
    setAssignmentLink('');
};

const [isDescModalOpen, setIsDescModalOpen] = useState(false);
const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
const [modalContent, setModalContent] = useState('');
const [modalTitle, setModalTitle] = useState('');
const [modalLink, setModalLink] = useState('');

const handleTextareaClick = () => {
  setModalContent(assignmentDesc);
  setIsDescModalOpen(true);
};

const handleTitleClick = () => {
  setModalTitle(assignmentTitle);
  setIsTitleModalOpen(true);
};

const handleLinkClick = () => {
  setModalLink(assignmentLink);
  setIsLinkModalOpen(true);
};

const handleDescModalClose = () => {
  setIsDescModalOpen(false);
};

const handleTitleModalClose = () => {
  setIsTitleModalOpen(false);
};

const handleLinkModalClose = () => {
  setIsLinkModalOpen(false);
};

const handleDescSave = () => {
  setAssignmentDesc(modalContent);
  setIsDescModalOpen(false);
};

const handleTitleSave = () => {
  setAssignmentTitle(modalTitle);
  setIsTitleModalOpen(false);
};

const handleLinkSave = () => {
  setAssignmentLink(modalLink);
  setIsLinkModalOpen(false);
};

const handleDescClear = () => {
  setModalContent('');
};

const handleTitleClear = () => {
  setModalTitle('');
};

const handleLinkClear = () => {
  setModalLink('');
};

  if (!project) {
    return <div>Loading...</div>;
  }
    return (
      <>
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
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/mentordashboard/${id}/`}
                  >
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/mentordashboard/${id}/students`}
                  >
                    <TrendingUpIcon className="h-4 w-4" />
                    Students
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/mentordashboard/${id}/announcements`}
                  >
                    <PackageIcon className="h-4 w-4" />
                    Announcements
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/mentordashboard/${id}/resources`}
                  >
                    <ResourceIcon className="h-4 w-4" />
                    Resources
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`/mentordashboard/${id}/assignments`}
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    Assignment
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
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
                      href={`/mentordashboard/${id}/`}
                    >
                      Home
                    </Link>
                    <Link
                      className="py-2 text-lg"
                      href={`/mentordashboard/${id}/students`}
                    >
                      Students
                    </Link>
                    <Link
                      className="py-2 text-lg"
                      href={`/mentordashboard/${id}/announcements`}
                    >
                      Announcements
                    </Link>
                    <Link
                      className="py-2 text-lg"
                      href={`/mentordashboard/${id}/resources`}
                    >
                      Resources
                    </Link>
                    <Link
                      className="py-2 text-lg"
                      href={`/mentordashboard/${id}/assignments`}
                    >
                      Assignment
                    </Link>
                    <Link
                      className="py-2 text-lg"
                      href={`/mentordashboard/${id}/chats`}
                    >
                      Chat
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </header>

            <main className="grid gap-4 p-4 md:gap-8 md:p-10">
              <div className="grid gap-2">
                <h1 className="font-semibold text-lg">
                  Following is the List of Assignments
                </h1>
              </div>
              <div className="grid gap-4">
                <div className="border rounded-lg shadow-xl">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Posted on</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>New Assignment</TableCell>
                        <TableCell>
                          <input
                            type="text"
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                            onClick={handleTitleClick}
                            placeholder="Assignment title"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                          />
                        </TableCell>

                        <TableCell>
                          <textarea
                            value={assignmentDesc}
                            onChange={(e) => setAssignmentDesc(e.target.value)}
                            onClick={handleTextareaClick}
                            placeholder="Assignment description"
                            className="textarea textarea-bordered w-full mb-2 p-2 rounded-md"
                          />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            value={assignmentLink}
                            onChange={(e) => setAssignmentLink(e.target.value)}
                            onClick={handleLinkClick}
                            placeholder="Assignment link (optional)"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                          />
                        </TableCell>

                        {isDescModalOpen && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                            <div className="bg-white p-4 rounded-md w-3/4">
                              <textarea
                                value={modalContent}
                                onChange={(e) =>
                                  setModalContent(e.target.value)
                                }
                                placeholder="Assignment description"
                                className="textarea textarea-bordered w-full h-64 p-2 rounded-md"
                              />
                              <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                  onClick={handleDescClear}
                                  className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm"
                                >
                                  Clear
                                </Button>
                                <Button
                                  onClick={handleDescSave}
                                  className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm shadow-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isTitleModalOpen && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                            <div className="bg-gray-200 dark:bg-slate-950 p-4 rounded-md w-3/4">
                              <input
                                type="text"
                                value={modalTitle}
                                onChange={(e) => setModalTitle(e.target.value)}
                                placeholder="Assignment title"
                                className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                              />
                              <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                  onClick={handleTitleClear}
                                  className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm"
                                >
                                  Clear
                                </Button>
                                <Button
                                  onClick={handleTitleSave}
                                  className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm shadow-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isLinkModalOpen && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                            <div className="bg-gray-200 dark:bg-slate-950 p-4 rounded-md w-3/4">
                              <input
                                type="text"
                                value={modalLink}
                                onChange={(e) => setModalLink(e.target.value)}
                                placeholder="Assignment link"
                                className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                              />
                              <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                  onClick={handleLinkClear}
                                  className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm"
                                >
                                  Clear
                                </Button>
                                <Button
                                  onClick={handleLinkSave}
                                  className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm shadow-sm"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        <TableCell>
                          <Button
                            className="btn btn-accent w-full bg-[#1e1b4b] dark:text-white hover:bg-slate-600 dark:hover:text-slate-800"
                            onClick={() =>
                              addContent(
                                "assignments",
                                {
                                  title: assignmentTitle,
                                  description: assignmentDesc,
                                  link: assignmentLink,
                                },
                                clearAssignmentFields
                              )
                            }
                          >
                            Add Assignment
                          </Button>
                        </TableCell>
                      </TableRow>
                      {assignments.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            Posted on:{" "}
                            {item.createdAt.toDate().toLocaleString()}
                          </TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                            <span>{item.description}</span>
                          </TableCell>
                          <TableCell>
                            {item.link && (
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                              >
                                {item.link}
                              </Link>
                            )}
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                              >
                                {item.link}
                              </a>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              className="btn btn-error bg-[#1e1b4b] dark:text-white hover:bg-slate-600 dark:hover:text-slate-800"
                              onClick={() =>
                                deleteContent("assignments", item.id)
                              }
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
};

export default MentorProjectAssign;




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
    