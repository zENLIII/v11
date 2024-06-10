"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId) => {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProject(docSnap.data());
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">{project?.name}</h1>
            <nav className="space-x-4">
                <Link href={`/myProjectPage/${id}/announcements`}>
                    <span className="text-blue-500 hover:text-blue-700">Announcements</span>
                </Link>
                <Link href={`/myProjectPage/${id}/resources`}>
                    <span className="text-blue-500 hover:text-blue-700">Resources</span>
                </Link>
                <Link href={`/myProjectPage/${id}/assignments`}>
                    <span className="text-blue-500 hover:text-blue-700">Assignments</span>
                </Link>
                <Link href={`/myProjectPage/${id}/chats`}>
                    <span className="text-blue-500 hover:text-blue-700">Chat</span>
                </Link>
            </nav>
        </div>
    );
};

export default ProjectDetailsPage;
