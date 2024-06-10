"use client";
import { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Loading from "@/components/Loading"; // Import your loading component
import dynamic from "next/dynamic";

const ProjectsList = dynamic(() => import("./ProjectsList"), { suspense: true });

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
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

const AllProjects = () => {
  const [user, setUser] = useState(null);
  const [purchasedProjectIds, setPurchasedProjectIds] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      if (authenticatedUser) {
        fetchPurchasedProjects(authenticatedUser.uid);
      }
    });
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
    const purchasedIds = orderDocs.docs.map((doc) => doc.data().projectId);
    setPurchasedProjectIds(purchasedIds);
  };

  const handleBuyProject = async (project) => {
    if (!user) {
      alert("Please sign in to buy projects.");
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Failed to load payment gateway. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_T4v3Jkntuvhw32", // Replace with your Razorpay Key
      amount: project.price * 100, // Razorpay takes amount in the smallest currency unit (like paisa)
      currency: "INR",
      name: "Purchase Project",
      description: "Payment for the project",
      image: "https://example.com/your_logo",
      handler: async function (response) {
        await saveOrder(project.id, response.razorpay_payment_id, response.razorpay_order_id);
      },
      prefill: {
        name: user.displayName || "User Name",
        email: user.email || "user@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const saveOrder = async (projectId, paymentId, orderId) => {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      projectId: projectId,
      paymentId: paymentId,
      orderId: orderId,
      purchaseDate: new Date(),
    });
    alert("Project purchased successfully!");
    fetchPurchasedProjects(user.uid); // Refresh the list of purchased projects
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-0">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              All Projects
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Browse from wide variety of different projects
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <ProjectsList user={user} purchasedProjectIds={purchasedProjectIds} handleBuyProject={handleBuyProject} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
