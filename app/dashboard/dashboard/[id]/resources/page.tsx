"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DashboardResource } from '@/components/Dashboard/DashboradResources';

const ResourcesPage = () => {
    const { id } = useParams();
    const [resources, setResources] = useState([]);

    useEffect(() => {
        if (id) {
            fetchResources(id);
           
        }
    }, [id]);

    const fetchResources = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "resources");
        const snapshot = await getDocs(collRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResources(items);

    
    };

    
    

    return (
        // <div className="container mx-auto px-4 py-6">
        //     <h1 className="text-2xl font-semibold">Resources</h1>
        //     {resources.map(res => <p key={res.id}>{res.content}</p>)}
        // </div>
        <DashboardResource/>
    );
};

export default ResourcesPage;
