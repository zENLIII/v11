"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null); // State to store mentor's name
  const { id } = useParams(); // Get project id from URL

  useEffect(() => {
    const fetchProjectAndMentor = async () => {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setProject({ id: docSnap.id, ...projectData });

        // Fetch the mentor's details if adminId is present
        if (projectData.adminId) {
          const mentorRef = doc(db, "users", projectData.adminId);
          const mentorSnap = await getDoc(mentorRef);
          if (mentorSnap.exists()) {
            setMentor(mentorSnap.data().username); // Assuming 'username' is the field storing mentor's name
          }
        }
      } else {
        console.log("No such project document!");
      }
    };

    if (id) {
      fetchProjectAndMentor();
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.name} className="max-w-md mx-auto"/>
      )}
      <p><strong>Introduction:</strong> {project.intro}</p>
      <p><strong>Prerequisites:</strong> {project.prereq}</p>
      <p><strong>Price:</strong> ${project.price}</p>
      <p><strong>Mentor:</strong> {mentor ? mentor : "No mentor assigned"}</p> {/* Display the mentor's name */}
      <div>
        <strong>Timeline:</strong>
        <ul>
          {project.timeline.map((week, index) => (
            <li key={index}>{week}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
