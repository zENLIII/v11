// "use client";
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { fetchProjects } from '../../lib/firebase'; // Adjust the path as needed
// import { auth, db } from '../../lib/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { addDoc, collection } from 'firebase/firestore';

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
//       setUser(authenticatedUser);
//     });
//     getProjects();
//     return () => unsubscribe();
//   }, []);

//   const getProjects = async () => {
//     const projects = await fetchProjects();
//     setProjects(projects);
//   };

//   const handleBuyProject = async (projectId) => {
//     if (!user) {
//       alert("Please sign in to buy projects.");
//       return;
//     }
//     await addDoc(collection(db, "orders"), {
//       userId: user.uid,
//       projectId: projectId,
//       purchaseDate: new Date()
//     });
//     alert("Project purchased successfully!");
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-2xl font-semibold my-4">Projects</h1>
//       <div className="space-y-2">
//         {projects.map((project) => (
//           <div key={project.id} className="p-4 shadow rounded bg-white">
//             <Link href={`/projects/${project.id}`}>
//               <span className="text-blue-500 hover:text-blue-700 cursor-pointer">{project.name}</span>
//             </Link>
//             <button onClick={() => handleBuyProject(project.id)} className="ml-4 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
//               Buy
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;


"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/firebase'; // Ensure this function is correctly imported
import { auth,db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [purchasedProjectIds, setPurchasedProjectIds] = useState([]);

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
      alert("Please sign in to buy projects.");
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Failed to load payment gateway. Please try again.");
      return;
    }

    const options = {
      key: 'rzp_test_T4v3Jkntuvhw32', // Replace with your Razorpay Key
      amount: project.price * 100, // Razorpay takes amount in the smallest currency unit (like paisa)
      currency: "INR",
      name: "Purchase Project",
      description: "Payment for the project",
      image: "https://example.com/your_logo",
      handler: function (response) {
        // Handle the payment success
        saveOrder(project.id, response.razorpay_payment_id, response.razorpay_order_id);
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
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      projectId: projectId,
      paymentId: paymentId,
      orderId: orderId,
      purchaseDate: new Date()
    });
    alert("Project purchased successfully!");
    fetchPurchasedProjects(user.uid); // Refresh the list of purchased projects
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold my-4">Projects</h1>
      <div className="space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="p-4 shadow rounded bg-white">
            <Link href={`/projects/${project.id}`}>
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">{project.name}</span>
            </Link>
            {purchasedProjectIds.includes(project.id) ? (
              <span className="ml-4 text-sm text-green-600">Purchased</span>
            ) : (
              <button onClick={() => handleBuyProject(project)} className="ml-4 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
                Buy for ₹{project.price}
              </button>
            )}
          </div>
        ))}
           
      </div>
    </div>
  );
};

export default ProjectsPage;