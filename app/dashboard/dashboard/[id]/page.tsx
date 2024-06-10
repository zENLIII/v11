"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { DashboardProject } from '@/components/Dashboard/DashboardProject';
import { MyHeader } from '@/components/Dashboard/MyHeader';
import { MyProjectLearning } from '@/components/Dashboard/MyProjectLearning';
import { Sidebar } from 'lucide-react';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (id && typeof id === 'string') {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId : string) => {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject(docSnap.data());
      }
    };

    return (
      <>
        <DashboardProject />
      </>
    );
};

export default ProjectDetailsPage;
