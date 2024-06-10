"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import ThemeSwitch from "@/components/ThemeSwitch";
import MentorHeader from "@/components/MentorDashboard/MentorHeader";

function MentorHome() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [totalMentees, setTotalMentees] = useState(0);
  const [mentor, setMentor] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchMentorProjects(user.uid);
      } else {
        setUser(null);
        setProjects([]);
        setTotalMentees(0);
      }
    });
  }, []);

  const fetchMentorProjects = async (mentorId) => {
    const projRef = collection(db, "projects");
    const q = query(projRef, where("adminId", "==", mentorId));
    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(projects);

    
    await fetchMenteesCount(projects.map(project => project.id));
  };

  const fetchMenteesCount = async (projectIds) => {
    if(projectIds.length === 0) return;

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("projectId", "in", projectIds));
    const snapshot = await getDocs(q);

    const mentees = new Set(snapshot.docs.map(doc => doc.data().userId));
    setTotalMentees(mentees.size);
  }


  return (
    // <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 dark:bg-black bg-[#f1f5f9] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="flex items-center justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                        {project.intro}
                      </p>
                    </div>
                    {/* <Badge variant="success">Active</Badge> */}
                  </CardHeader>
                  <CardContent>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        {/* <span className="text-gray-500 dark:text-gray-400">
                          {project.mentees} Mentees
                        </span> */}
                      </div>
                      <Link href={`/mentordashboard/${project.id}`}>
                        <span className="text-blue-500 hover:text-blue-700">
                          View Project
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <div className="dark:bg-indigo-950 bg-indigo-200 text-white p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Image
                    alt="Mentor Avatar"
                    className="rounded-full"
                    height="64"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover",
                    }}
                    width="64"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-gray-400 text-sm">Mentor</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm">
                    John is an experienced mentor with a passion for helping
                    others succeed. He has been mentoring for over 5 years and
                    has a proven track record of helping mentees achieve their
                    goals.
                  </p>
                </div>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <h4 className="text-2xl font-semibold">{projects.length}</h4>
                    <p className="text-gray-400 text-sm">Total Projects</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h4 className="text-2xl font-semibold">{totalMentees}</h4>
                    <p className="text-gray-400 text-sm">Total Mentees</p>
                  </div>
                  {/* <div className="flex flex-col items-center">
                    <h4 className="text-2xl font-semibold">$10,000</h4>
                    <p className="text-gray-400 text-sm">Total Earnings</p>
                  </div> */}
                  
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Message from zENLI!</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="welcome-message">
                 Welcome! We&apos;re excited to have you join our community of mentors. 
                 Your expertise will greatly benefit our mentees through project-based learning and professional growth.
                 Thank you for becoming a part of our journey!
              </p>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    // </section>
  );
}

export default MentorHome;



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
  
  
  function ListIcon(props) {
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
        <line x1="8" x2="21" y1="6" y2="6" />
        <line x1="8" x2="21" y1="12" y2="12" />
        <line x1="8" x2="21" y1="18" y2="18" />
        <line x1="3" x2="3.01" y1="6" y2="6" />
        <line x1="3" x2="3.01" y1="12" y2="12" />
        <line x1="3" x2="3.01" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function UsersIcon(props) {
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  