"use client";
import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CustomAlert from "@/components/Auth/CustomAlert";

const CreateProject = () => {
  const [project, setProject] = useState({
    name: "Python",
    intro: "",
    prereq: [],
    price: 100,
    timeline: ["Week-1", "Week-2", "Week-3", "Week-4"],
    imageUrl: "",
    category: "1",
  });
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [newPrereq, setNewPrereq] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const introRef = useRef(null);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          console.log("User document does not exist!");
          setRole("");
        }
      } else {
        setUser(null);
        setRole("");
        console.log("No user signed in");
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Please sign in to access this page.</p>;
  } else if (role !== "admin") {
    return <p>Access denied. Only admins can create projects.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleNewPrereqChange = (e) => {
    setNewPrereq(e.target.value);
  };

  const addNewPrereq = () => {
    if (newPrereq && !project.prereq.includes(newPrereq)) {
      setProject({ ...project, prereq: [...project.prereq, newPrereq] });
      setNewPrereq("");
    }
  };

  const removePrereq = (prereq) => {
    setProject({
      ...project,
      prereq: project.prereq.filter((p) => p !== prereq),
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const imageRef = ref(storage, `projects/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      return url;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordCount = project.intro.trim().split(/\s+/).length;
    if (wordCount < 100) {
      setErrorMessage("Introduction must be at least 100 words.");
      introRef.current.scrollIntoView({ behavior: "smooth" });
      introRef.current.focus();
      return;
    } else {
      setErrorMessage("");
    }

    const imageUrl = await uploadImage();
    const projectWithImage = { ...project, imageUrl, adminId: user.uid };
    try {
      await addDoc(collection(db, "projects"), projectWithImage);
      setAlert({message: "Project added successfully!", type:'success'});
      setProject({
        name: "",
        intro: "",
        prereq: [],
        price: 0,
        timeline: [],
        imageUrl: "",
        category: "1",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlert({message:"Error adding project!", type:'error'});
    }
  }

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center bg-gray-100 px-4 py-8 dark:bg-black">
      <div className="w-full max-w-xl md:max-w-4xl lg:max-w-6xl md:flex-row rounded-lg bg-white dark:bg-[#27272A] shadow-[5px_5px_0px_0px_rgba(109,40,217)] p-16">
        <h1 className="mb-6 text-3xl font-bold">Create a Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="name">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="intro">
              Introduction
            </label>
            <textarea
              name="intro"
              value={project.intro}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              rows={3}
              ref={introRef}
              required
            />
            {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              value={project.category}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="prereq">
              Prerequisites
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newPrereq}
                onChange={handleNewPrereqChange}
                placeholder="Add new prerequisite"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
                
              />
              <button
                type="button"
                onClick={addNewPrereq}
                className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm shadow-sm"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {project.prereq.map((pr, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-[#18181b] text-blue-800 mr-2"
                >
                  {pr}
                  <button
                    type="button"
                    onClick={() => removePrereq(pr)}
                    className="ml-2 bg-transparent text-blue-800 font-semibold hover:text-red-500"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={project.price}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
           />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="projectImage">
              Project Image
            </label>
            <input
              type="file"
              name="projectImage"
              onChange={handleImageChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
           />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" htmlFor="timeline">
              Timeline
            </label>
            {project.timeline.map((week, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={week}
                  onChange={(e) => {
                    const newTimeline = [...project.timeline];
                    newTimeline[index] = e.target.value;
                    setProject({ ...project, timeline: newTimeline });
                  }}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    const newTimeline = project.timeline.filter(
                      (_, i) => i !== index
                    );
                    setProject({ ...project, timeline: newTimeline });
                  }}
                  className="px-5 py-2.5 font-medium bg-red-50 hover:bg-red-100 hover:text-red-600 text-red-500 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProject({
                  ...project,
                  timeline: [
                    ...project.timeline,
                    `Week-${project.timeline.length + 1}`,
                  ],
                })
              }
              className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm shadow-sm"
            >
              Add Week
            </button>
          </div>

          <div className="flex justify-end">
            <button
              className="px-5 py-2.5 font-medium bg-green-50 hover:bg-green-100 hover:text-green-600 text-green-500 rounded-lg text-sm"
              type="submit"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
