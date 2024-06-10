"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, getDocs, addDoc, deleteDoc, collection } from 'firebase/firestore';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [resourceTitle, setResourceTitle] = useState('');
    const [resourceDesc, setResourceDesc] = useState('');
    const [resourceLink, setResourceLink] = useState('');
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementDesc, setAnnouncementDesc] = useState('');
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentDesc, setAssignmentDesc] = useState('');
    const [assignmentLink, setAssignmentLink] = useState('');
    const [resources, setResources] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProject(docSnap.data());
            fetchContents();
        }
    };

    const fetchContents = async () => {
        await fetchCollection('resources', setResources);
        await fetchCollection('announcements', setAnnouncements);
        await fetchCollection('assignments', setAssignments);
    };

    const fetchCollection = async (type, setState) => {
        const collRef = collection(db, "projects", id, type);
        const snapshot = await getDocs(collRef);
        const items = [];
        snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
        setState(items);
    };

    const addContent = async (type, content, clearFields) => {
        const { title, description, link } = content;
        if (!title || !description) return;

        const collRef = collection(db, "projects", id, type);
        await addDoc(collRef, {
            title,
            description,
            link: link || '',
            createdAt: new Date()
        });

        clearFields();
        fetchContents();  // Refresh content list after adding
    };

    const deleteContent = async (type, contentId) => {
        const docRef = doc(db, "projects", id, type, contentId);
        await deleteDoc(docRef);
        fetchContents();  // Refresh content list after deletion
    };

    const clearResourceFields = () => {
        setResourceTitle('');
        setResourceDesc('');
        setResourceLink('');
    };

    const clearAnnouncementFields = () => {
        setAnnouncementTitle('');
        setAnnouncementDesc('');
    };

    const clearAssignmentFields = () => {
        setAssignmentTitle('');
        setAssignmentDesc('');
        setAssignmentLink('');
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1
                    className="text-3xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {project.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Add Resource</h2>
                        <input
                            type="text"
                            value={resourceTitle}
                            onChange={(e) => setResourceTitle(e.target.value)}
                            placeholder="Resource title"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                        />
                        <textarea
                            value={resourceDesc}
                            onChange={(e) => setResourceDesc(e.target.value)}
                            placeholder="Resource description"
                            className="textarea textarea-bordered w-full mb-2 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            value={resourceLink}
                            onChange={(e) => setResourceLink(e.target.value)}
                            placeholder="Resource link (optional)"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                        />
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => addContent('resources', { title: resourceTitle, description: resourceDesc, link: resourceLink }, clearResourceFields)}
                        >
                            Add Resource
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Add Announcement</h2>
                        <input
                            type="text"
                            value={announcementTitle}
                            onChange={(e) => setAnnouncementTitle(e.target.value)}
                            placeholder="Announcement title"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                        />
                        <textarea
                            value={announcementDesc}
                            onChange={(e) => setAnnouncementDesc(e.target.value)}
                            placeholder="Announcement description"
                            className="textarea textarea-bordered w-full mb-2 p-2 rounded-md"
                        />
                        <button
                            className="btn btn-secondary w-full"
                            onClick={() => addContent('announcements', { title: announcementTitle, description: announcementDesc }, clearAnnouncementFields)}
                        >
                            Add Announcement
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Add Assignment</h2>
                        <input
                            type="text"
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                            placeholder="Assignment title"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                        />
                        <textarea
                            value={assignmentDesc}
                            onChange={(e) => setAssignmentDesc(e.target.value)}
                            placeholder="Assignment description"
                            className="textarea textarea-bordered w-full mb-2 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            value={assignmentLink}
                            onChange={(e) => setAssignmentLink(e.target.value)}
                            placeholder="Assignment link (optional)"
                            className="input input-bordered input-primary w-full mb-2 p-2 rounded-md"
                        />
                        <button
                            className="btn btn-accent w-full"
                            onClick={() => addContent('assignments', { title: assignmentTitle, description: assignmentDesc, link: assignmentLink }, clearAssignmentFields)}
                        >
                            Add Assignment
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Resources</h2>
                    <ul>
                        {resources.map(item => (
                            <li
                                key={item.id}
                                className="bg-gray-100 rounded p-3 shadow my-2 flex justify-between items-center"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p>{item.description}</p>
                                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{item.link}</a>}
                                    <small className="text-gray-500">Posted on: {item.createdAt.toDate().toLocaleString()}</small>
                                </div>
                                <button className="btn btn-error" onClick={() => deleteContent('resources', item.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                    <ul>
                        {announcements.map(item => (
                            <li
                                key={item.id}
                                className="bg-gray-100 rounded p-3 shadow my-2 flex justify-between items-center"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p>{item.description}</p>
                                    <small className="text-gray-500">Posted on: {item.createdAt.toDate().toLocaleString()}</small>
                                </div>
                                <button className="btn btn-error" onClick={() => deleteContent('announcements', item.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Assignments</h2>
                    <ul>
                        {assignments.map(item => (
                            <li
                                key={item.id}
                                className="bg-gray-100 rounded p-3 shadow my-2 flex justify-between items-center"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p>{item.description}</p>
                                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{item.link}</a>}
                                    <small className="text-gray-500">Posted on: {item.createdAt.toDate().toLocaleString()}</small>
                                </div>
                                <button className="btn btn-error" onClick={() => deleteContent('assignments', item.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
