"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AnnouncementsPage = () => {
    const { id } = useParams();
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        if (id) {
            fetchAnnouncements(id);
        }
    }, [id]);

    const fetchAnnouncements = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "announcements");
        const snapshot = await getDocs(collRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAnnouncements(items);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold">Announcements</h1>
            {announcements.map(ann => (
                <div key={ann.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold">{ann.title}</h2>
                    <p>{ann.description}</p>
                    <small className="text-gray-500">Posted on: {ann.createdAt.toDate().toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default AnnouncementsPage;
