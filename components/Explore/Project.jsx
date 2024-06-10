"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { fetchProjects } from '@/lib/firebase'; // Ensure this function is correctly imported
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Header from '@/components/Header';
import CustomAlert from '../Auth/CustomAlert';

// Custom Alert Component


const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay SDK loaded");
      resolve(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null); // State to store mentor's name
  const { id } = useParams(); // Get project id from URL
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [purchasedProjectIds, setPurchasedProjectIds] = useState([]);
  const [alert, setAlert] = useState<{ message } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      if (authenticatedUser) {
        fetchPurchasedProjects(authenticatedUser.uid);
      }
    });
    getProjects();
    return () => unsubscribe();
  }, []);

  const getProjects = async () => {
    const loadedProjects = await fetchProjects();
    setProjects(loadedProjects);
  };

  const fetchPurchasedProjects = async (userId) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const orderDocs = await getDocs(q);
    const purchasedIds = orderDocs.docs.map(doc => doc.data().projectId);
    setPurchasedProjectIds(purchasedIds);
  };

  const handleBuyProject = async (project) => {
    if (!user) {
      setAlert({message: "Please sign in to buy projects.", type:'error'});
      setTimeout(() => setAlert(null), 3500);
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      setAlert({message:"Failed to load payment gateway. Please try again.", type:'error'});
      setTimeout(() => setAlert(null), 3500);
      return;
    }

    const options = {
      key: 'rzp_test_T4v3Jkntuvhw32', // Replace with your Razorpay Key
      amount: project.price * 100, // Razorpay takes amount in the smallest currency unit (like paisa)
      currency: "INR",
      name: "Purchase Project",
      description: "Payment for the project",
      image: "https://example.com/your_logo",
      handler: async function (response) {
        console.log("Razorpay Payment Response:", response);
        // Handle the payment success
        await saveOrder(project.id, response.razorpay_payment_id, response.razorpay_order_id);
      },
      prefill: {
        name: user.displayName || "User Name",
        email: user.email || "user@example.com",
        contact: "1234567890"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  

  const saveOrder = async (projectId, paymentId, orderId) => {
    // if (!paymentId || !orderId) {
    //   console.error("Invalid paymentId or orderId:", paymentId, orderId);
    //   setAlert("Failed to save the order. Please try again.");
    //   return;
    // }

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      projectId: projectId,
      paymentId: paymentId,
      orderId: orderId || '',
      purchaseDate: new Date()
    });
    setAlert({message:"Project purchased successfully!", type:'success'});
    setTimeout(() => setAlert(null), 3500);
    fetchPurchasedProjects(user.uid); // Refresh the list of purchased projects
  };

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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="w-full p-6">
        <div className="container grid max-w-3xl px-4 gap-6 md:px-6 md:gap-12 lg:grid-cols-2 lg:max-w-5xl xl:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter lg:text-4xl">
                {project.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Mentored by {mentor ? mentor : "No mentor assigned"}
              </p>
            </div>
            <div className="space-y-4 text-base">
              {/* <p>{project.intro}</p> */}
            </div>
            <div className="grid gap-1 text-sm">
              {/* <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                <span>Starts on March 15, 2024</span>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 flex-shrink-0" />
                <span>4 weeks</span>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 flex-shrink-0" />
                <span>Mentor: {mentor ? mentor : "No mentor assigned"}</span>
              </div> */}
            </div>
            <div className="flex gap-4 min-[400px]:justify-end">
              {purchasedProjectIds.includes(project.id) ? (
                <span className="ml-4 text-sm text-green-600">Purchased</span>
              ) : (
                <button
                  onClick={() => handleBuyProject(project)}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  Buy for ₹{project.price}
                </button>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <div className="grid gap-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="object-fit object-center"
                    style={{
                      aspectRatio: "600/338",
                      objectFit: "cover",
                    }}
                    width="600"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container grid max-w-3xl px-4 gap-6 md:px-6 md:gap-12 lg:grid-cols-2 lg:max-w-5xl xl:gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl">
              Project Description
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{project.intro}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl">
              Project Mentor
            </h2>
            <div className="grid gap-1 text-sm">
              <p>
                <strong>{mentor ? mentor : "No mentor assigned"}</strong>
              </p>
              <p>Head of Digital Marketing, Acme Inc.</p>
              <p>
                John is an experienced digital marketer with over a decade of
                experience in the industry. He has helped numerous companies
                improve their online presence and reach their target audience
                through effective digital marketing strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container grid max-w-3xl px-4 gap-6 md:px-6 md:gap-12 lg:grid-cols-2 lg:max-w-5xl xl:gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl">
              Project Timeline
            </h2>
            <div className="grid gap-1 text-sm">
              {project.timeline.map((week, index) => (
                <div key={index} className="flex items-start space-y-1">
                  <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <p>{week}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl">
              Project Prerequisite
            </h2>
            <div className="grid gap-1 text-sm">
              <div className="flex items-start space-y-1">
                <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{project.prereq}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* <h2 className="text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl">Mentor Reviews</h2> */}
            <div className="grid gap-4"></div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ProjectDetails;


function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
