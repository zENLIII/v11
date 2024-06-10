"use client"
import AllProjects from "@/components/Explore/AllProjects"
import Heading from "@/components/Explore/Heading"
import Header from "@/components/Header"
import { Suspense } from "react"
import Loading from "@/components/Loading"

export default function Home() {
    return (
    <>
        <main className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
        <Header/>
        <Suspense fallback={<Loading />}>
        <AllProjects/>
        </Suspense>
        </main>
    </>
    )
}