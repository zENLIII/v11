"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from 'firebase/firestore';
import { FaBars, FaTimes } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';

const DashboardChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [nav, setNav] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (id) {
      fetchMessages(id);
    }
  }, [id]);

  const fetchMessages = async (projectId) => {
    const q = query(
      collection(db, "projects", projectId, "chat"),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    const messagesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));
    setMessages(messagesArray);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !currentUser) return;
    const chatRef = collection(db, "projects", id, "chat");
    await addDoc(chatRef, {
      message: newMessage,
      username: currentUser.displayName,
      userRole: "mentee",
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
    fetchMessages(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username); // Set the username state
        }
      } else {
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  const getAvatarText = (name) => {
    if (name && name.length >= 2) {
      return name.substring(0, 2).toUpperCase();
    }
    return name ? name.charAt(0).toUpperCase() : '';
  };
  

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block bg-[#bae6fd] dark:bg-[#0F2143]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="/dashboard/"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="">Dashboard</span>
            </Link>
            <div className="ml-auto">
              <ThemeSwitch />
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/`}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/announcements`}
              >
                <TrendingUpIcon className="h-4 w-4" />
                Announcements
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/resources`}
              >
                <PackageIcon className="h-4 w-4" />
                Resources
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/assignments`}
              >
                <MessageSquareIcon className="h-4 w-4" />
                Assignments
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`/dashboard/${id}/chats`}
              >
                <UserIcon className="h-4 w-4" />
                Chat
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#bae6fd] dark:bg-[#0F2143] px-6 z-10">
          <Link className="lg:hidden" href="/dashboard">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-xl sm:text-sm md:text-sm">
              {/* {project.name} */}
            </h1>
          </div>
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-gray-800 dark:text-gray-500 lg:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
          {nav && (
            <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-200 dark:from-black dark:to-gray-800 text-gray-800 dark:text-gray-500 lg:hidden">
              <div className="flex flex-col items-center p-4">
                <nav className="grid gap-6 text-center">
                  <Link className="py-2 text-lg" href={`/dashboard/${id}/`}>
                    Home
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/announcements`}
                  >
                    Announcements
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/resources`}
                  >
                    Resources
                  </Link>
                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/assignments`}
                  >
                    Assignments
                  </Link>

                  <Link
                    className="py-2 text-lg"
                    href={`/dashboard/${id}/chats`}
                  >
                    Chat
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </header>

        <main className="flex flex-col h-screen">
          <div className="flex-1 overflow-auto p-4 grid gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.username === currentUser?.displayName ? "justify-end" : ""
                }`}
              >
                {msg.username !== currentUser?.displayName && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>
                      {msg.username ? getAvatarText(msg.username) : ""}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[75%] ${
                    msg.username === currentUser?.displayName
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <p className="font-semibold">
                    {msg.username} {msg.userRole === "mentor" ? "(Mentor)" : ""}
                  </p>
                  <p>{msg.message}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {msg.createdAt
                      ? formatDistanceToNow(msg.createdAt) + " ago"
                      : "Just now"}
                  </div>
                </div>
                {msg.username === currentUser?.displayName && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>
                      {msg.username ? getAvatarText(msg.username) : ""}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          <div className="bg-gray-100 dark:bg-gray-950 px-4 py-3 flex items-center gap-2 border-t border-gray-200 dark:border-gray-800">
            <Textarea
              className="flex-1 resize-none rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardChat;

function Package2Icon(props) {
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    )
  }
  
  
  function BellIcon(props) {
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    )
  }
  
  
  function HomeIcon(props) {
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }
  
  
  function TrendingUpIcon(props) {
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
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  }
  
  
  function PackageIcon(props) {
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
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  }
  
  
  function MessageSquareIcon(props) {
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }
  
  
  function UserIcon(props) {
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
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
  
  function FrameIcon(props) {
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
          <line x1="22" x2="2" y1="6" y2="6" />
          <line x1="22" x2="2" y1="18" y2="18" />
          <line x1="6" x2="6" y1="2" y2="22" />
          <line x1="18" x2="18" y1="2" y2="22" />
        </svg>
      )
    }
    
    
    function FileIcon(props) {
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
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    }
   