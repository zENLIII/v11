"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold">Resources</h1>
            {resources.map(res => (
                <div key={res.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold">{res.title}</h2>
                    <p>{res.description}</p>
                    {res.link && <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{res.link}</a>}
                    <small className="text-gray-500">Posted on: {res.createdAt.toDate().toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default ResourcesPage;
