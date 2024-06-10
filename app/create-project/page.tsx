"use client"
import Header from "@/components/Header";
import CreateProject from "./CreateProject";

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
            <CreateProject/>
        </main>
    )
}