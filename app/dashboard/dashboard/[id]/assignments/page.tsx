"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { DashboardAssignment } from '@/components/Dashboard/DashboardAssignement';


// Function to fetch all project IDs
const fetchProjectIds = async () => {
    const collRef = collection(db, "projects");
    const snapshot = await getDocs(collRef);
    return snapshot.docs.map(doc => doc.id);
};

// generateStaticParams function
export const generateStaticParams = async () => {
    const projectIds = await fetchProjectIds();
    return projectIds.map(id => ({ id }));
};



const AssignmentsPage = () => {
    const { id } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        if (id) {
            fetchAssignments(id);
        }
    }, [id]);

    const fetchAssignments = async (projectId) => {
        const collRef = collection(db, "projects", projectId, "assignments");
        const snapshot = await getDocs(collRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssignments(items);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    

    // const handleUpload = async (assignmentId) => {
    //     if (!selectedFile) {
    //         alert("Please select a file to upload.");
    //         return;
    //     }
    //     const fileRef = storageRef(storage, `projects/${id}/assignments/${assignmentId}/uploads/${selectedFile.name}`);
    //     await uploadBytes(fileRef, selectedFile);
    //     const fileUrl = await getDownloadURL(fileRef);

    //     const uploadsRef = collection(db, "projects", id, "assignments", assignmentId, "uploads");
    //     await addDoc(uploadsRef, {
    //         url: fileUrl,
    //         createdAt: new Date()
    //     });

    //     alert("File uploaded successfully!");
    //     setSelectedFile(null); // Reset the file input after upload
    // };

    return (
        // <div className="container mx-auto px-4 py-6">
        //     <h1 className="text-2xl font-semibold">Assignments</h1>
        //     {assignments.map(ass => (
        //         <div key={ass.id}>
        //             <p>{ass.content}</p>
        //             <input type="file" onChange={handleFileChange} />
        //             <button onClick={() => handleUpload(ass.id)} className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
        //                 Upload Work
        //             </button>
        //         </div>
        //     ))}
        // </div>
        <>
            <DashboardAssignment/>
        </>
  
    );
};

export default AssignmentsPage;