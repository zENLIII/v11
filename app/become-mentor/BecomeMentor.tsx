
"use client";
import { useState, useEffect } from "react";
import { db, auth, storage } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const BecomeMentor = () => {
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const mentorDetailsRef = collection(userRef, "mentorDetails");
    let pictureUrl = "";

    if (picture) {
      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, picture);
      pictureUrl = await getDownloadURL(storageRef);
    }

    const mentorData = {
      qualifications,
      experience,
      aboutYou,
      instagram,
      linkedin,
      picture: pictureUrl,
      role: "mentor",
    };

    try {
      await setDoc(userRef, { role: "admin" }, { merge: true });
      await setDoc(doc(mentorDetailsRef, "details"), mentorData);
      setAlertMessage("You are now a mentor!");
      router.push("/mentordashboard");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!currentUser) {
    return <p>Please sign in to access this page.</p>;
  }

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-center bg-gray-100 px-4 py-8 dark:bg-black">
      <div className="w-full max-w-xl md:max-w-4xl lg:max-w-6xl rounded-lg bg-white dark:bg-[#27272A] shadow-[5px_5px_0px_0px_rgba(109,40,217)] p-6">
        <h1 className="mb-6 text-3xl font-bold">Become a Mentor</h1>
        {alertMessage && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="qualifications">
              Qualifications
            </label>
            <input
              type="text"
              id="qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="experience">
              Experience
            </label>
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="aboutYou">
              About You
            </label>
            <textarea
              id="aboutYou"
              value={aboutYou}
              onChange={(e) => setAboutYou(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="instagram">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="linkedin">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="picture">
              Picture
            </label>
            <input
              type="file"
              id="picture"
              onChange={handleFileChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-[#18181b] dark:text-gray-200"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 font-medium bg-green-50 hover:bg-green-100 hover:text-green-600 text-green-500 rounded-lg text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeMentor;
