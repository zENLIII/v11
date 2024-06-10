"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SubmissionsPage = () => {
    const { id } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (id) {
            fetchSubmissions(id);
        }
    }, [id]);

    const fetchSubmissions = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "assignments");
        const snapshot = await getDocs(collRef);
        const assignmentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        let submissionsArray = [];
        for (const assignment of assignmentsList) {
            const submissionsRef = collection(db, "projects", projectId, "assignments", assignment.id, "submissions");
            const submissionSnapshot = await getDocs(submissionsRef);
            submissionSnapshot.forEach(doc => {
                submissionsArray.push({
                    id: doc.id,
                    assignmentTitle: assignment.title,
                    ...doc.data()
                });
            });
        }
        setSubmissions(submissionsArray);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold">Submissions</h1>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {submissions.map(sub => (
                        <div key={sub.id} className="mb-4">
                            <h2 className="text-xl font-bold">{sub.assignmentTitle}</h2>
                            <p>{sub.createdAt ? new Date(sub.createdAt.seconds * 1000).toLocaleString() : 'Just now'}</p>
                            <p>Submitted by: {sub.menteeName}</p>
                            <a 
                                href={`https:/${sub.url}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500"
                            >
                                View Submission
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubmissionsPage;
