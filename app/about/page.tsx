import Header from "@/components/Header";
import AboutUs from "./Aboutus";

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
            <Header/>
            <AboutUs/>
        </div>
    )
}