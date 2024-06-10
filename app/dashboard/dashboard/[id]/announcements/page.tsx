"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DashboardAnnouncement } from '@/components/Dashboard/DashboardAnnouncement';

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
    //     <div className="container mx-auto px-4 py-6">
    //         <h1 className="text-2xl font-semibold">Announcements</h1>
    //         {announcements.map(ann => <p key={ann.id}>{ann.content}</p>)}
    //     </div>
    // );
        <>
            <DashboardAnnouncement/>
        </>
    );
};

export default AnnouncementsPage;
