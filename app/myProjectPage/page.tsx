"use client";
import { useEffect, useState } from 'react';
import { db,auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs,doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const MyProjectsPage = () => {
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
    const ordersQuery = query(collection(db, "orders"), where("userId", "==", userId));
    const ordersSnapshot = await getDocs(ordersQuery);
    console.log("Orders found:", ordersSnapshot.size);
    const projects = await Promise.all(
      ordersSnapshot.docs.map(async (orderDoc) => {
        console.log("Fetching project data for project ID:", orderDoc.data().projectId);
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
    setMyProjects(projects.filter(project => project !== null));
    console.log("Final project list set:", projects);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold my-4">My Projects</h1>
      <div className="space-y-2">
        {myProjects.length > 0 ? myProjects.map(project => (
          <div key={project.id} className="p-4 shadow rounded bg-white">
            <Link href={`/myProjectPage/${project.id}`}><span className="text-blue-500 hover:text-blue-700 cursor-pointer">{project.name}</span>
            </Link>
          </div>
        )) : <p>You have not purchased any projects.</p>}
      </div>
    </div>
  );
};

export default MyProjectsPage;
