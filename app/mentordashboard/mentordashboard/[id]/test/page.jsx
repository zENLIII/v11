"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MainSection from './MainSection';
import  Sidebar from './Sidebar';
import  Header from "./Header";

export default function HomePage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [resources, setResources] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [mentor, setMentor] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProjectAndMentor = async () => {
  //     const docRef = doc(db, "projects", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const projectData = docSnap.data();
  //       setProject({ id: docSnap.id, ...projectData });

  //       if (projectData.adminId) {
  //         const mentorRef = doc(db, "users", projectData.adminId);
  //         const mentorSnap = await getDoc(mentorRef);
  //         if (mentorSnap.exists()) {
  //           setMentor(mentorSnap.data().username);
  //         }
  //       }
  //     } else {
  //       console.log("No such project document!");
  //     }
  //   };

  //   if (id) {
  //     fetchProjectAndMentor();
  //   }
  // }, [id]);

  const fetchContents = async () => {
    await fetchCollection("resources", setResources);
    await fetchCollection("announcements", setAnnouncements);
    await fetchCollection("assignments", setAssignments);
  };

  const fetchCollection = async () => {
    const collRef = collection(db, "projects", id, type);
    const snapshot = await getDocs(collRef);
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setState(items);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar projectId={id} />
      <div className="flex flex-col">
        <Header projectName={project.name} />
        <MainSection project={project} mentor={mentor} />
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
  
  
  function HomeIcon(prop) {
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
  