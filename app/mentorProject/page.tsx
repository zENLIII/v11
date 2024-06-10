"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const MentorsProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [totalMentees, setTotalMentees] = useState(0);

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
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(projects);

    // Fetch orders for these projects
    await fetchMenteesCount(projects.map(project => project.id));
  };

  const fetchMenteesCount = async (projectIds) => {
    if (projectIds.length === 0) return;
    
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("projectId", "in", projectIds));
    const snapshot = await getDocs(q);
    
    const mentees = new Set(snapshot.docs.map(doc => doc.data().userId));
    setTotalMentees(mentees.size);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold my-4">Your Projects</h1>
      <p>Total Number of Mentees: {totalMentees}</p>
      <p>Total no. of projects : {projects.length}</p>
      <div className="space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="p-4 shadow rounded bg-white">
            <Link href={`/mentorProject/${project.id}`}>
              <div className="text-blue-500 hover:text-blue-700 cursor-pointer">{project.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsProjectsPage;