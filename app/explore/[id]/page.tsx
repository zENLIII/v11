"use client"
import AllProjects from "@/components/Explore/AllProjects"
import Heading from "@/components/Explore/Heading"
import ProjectDetails from "@/components/Explore/Project"
import Header from "@/components/Header"

export default function Home() {
    return (
    <>
        <main className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
        <Header/>
        <ProjectDetails/>
        </main>
    </>
    )
}