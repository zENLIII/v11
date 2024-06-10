"use client"
import AllProjects from "@/components/Explore/AllProjects"
import Heading from "@/components/Explore/Heading"
import Header from "@/components/Header"
import Mylearning from "@/components/Dashboard/Mylearning"
import { Sidebar } from "lucide-react"
import { useState } from "react"

export default function Home() {

    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");

    // if (!user) {
    //     return <p>Please sign in to access this page.</p>;
    //   } 
    // else if (role !== "admin"){
    //     return <p>Please sign in to access this page</p>
    // }

    return (
    <>
        <main className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
        <Header/>
        <Mylearning/>
        </main>
    </>
    )
}