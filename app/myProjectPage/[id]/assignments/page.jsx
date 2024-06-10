"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db,auth } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const AssignmentsPage = () => {
    const { id } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [submissionLinks, setSubmissionLinks] = useState({});
    const [submittedAssignments, setSubmittedAssignments] = useState({});
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (id) {
            fetchAssignments(id);
            fetchSubmittedAssignments(id);
        }
    }, [id]);

    const fetchAssignments = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "assignments");
        const snapshot = await getDocs(collRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssignments(items);
    };

    const fetchSubmittedAssignments = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "assignments");
        const snapshot = await getDocs(collRef);
        const assignmentsList = snapshot.docs.map(doc => doc.id);
        
        const submitted = {};
        for (const assignmentId of assignmentsList) {
            const submissionsRef = collection(db, "projects", projectId, "assignments", assignmentId, "submissions");
            const q = query(submissionsRef, where("assignmentId", "==", assignmentId));
            const submissionSnapshot = await getDocs(q);
            if (!submissionSnapshot.empty) {
                submitted[assignmentId] = submissionSnapshot.docs[0].data().url;
            }
        }
        setSubmittedAssignments(submitted);
    };

    const handleInputChange = (assignmentId, value) => {
        setSubmissionLinks(prev => ({
            ...prev,
            [assignmentId]: value
        }));
    };

    const handleSubmitLink = async (assignmentId) => {
        const submissionLink = submissionLinks[assignmentId];
        if (!submissionLink || !currentUser) {
            alert("Please provide a link to your work.");
            return;
        }

        const submissionsRef = collection(db, "projects", id, "assignments", assignmentId, "submissions");
        await addDoc(submissionsRef, {
            url: submissionLink,
            createdAt: new Date(),
            assignmentId,
            menteeName: currentUser.displayName // Assuming the user's name is stored in displayName
        });

        alert("Link submitted successfully!");
        setSubmittedAssignments(prev => ({
            ...prev,
            [assignmentId]: submissionLink
        }));
        setSubmissionLinks(prev => ({
            ...prev,
            [assignmentId]: ''
        }));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold">Assignments</h1>
            {assignments.map(ass => (
                <div key={ass.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold">{ass.title}</h2>
                    <p>{ass.description}</p>
                    {ass.link && <a href={ass.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{ass.link}</a>}
                    <small className="text-gray-500">Posted on: {ass.createdAt.toDate().toLocaleString()}</small>
                    <div className="mt-4">
                        {submittedAssignments[ass.id] ? (
                            <div className="text-green-500">Submitted: {submittedAssignments[ass.id]}</div>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={submissionLinks[ass.id] || ''}
                                    onChange={(e) => handleInputChange(ass.id, e.target.value)}
                                    placeholder="Submit your work link"
                                    className="input input-bordered w-full mb-2 p-2 rounded-md"
                                />
                                <button
                                    onClick={() => handleSubmitLink(ass.id)}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Submit Link
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssignmentsPage;
