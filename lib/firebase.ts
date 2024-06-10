// Import statements with TypeScript types
import { initializeApp } from "firebase/app";
import { getFirestore,  getDocs, doc, setDoc, addDoc, DocumentData,collection, query, where } from "firebase/firestore";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, User 
} from "firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOss4QMPjuyVI7cpJnkrR7zdHZSdRleKs",
  authDomain: "zenli-35aec.firebaseapp.com",
  projectId: "zenli-35aec",
  storageBucket: "zenli-35aec.appspot.com",
  messagingSenderId: "535185434642",
  appId: "1:535185434642:web:236d6d15fa2bba9cc3d0cb",
  measurementId: "G-T25Z55VNK8"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const fetchProjects = async () => {

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay


  const projectCollectionRef = collection(db, "projects");
  const projectSnapshot = await getDocs(projectCollectionRef);
  const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return projectList;
};


export const fetchMentorProjects = async (mentorId) => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("adminId", "==", mentorId));
  const querySnapshot = await getDocs(q);
  const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return projects;
};
// Export Firebase configs
export { auth, googleProvider, githubProvider, db, storage };
