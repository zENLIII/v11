import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Provider } from "./Provider";
import { useRouter } from "next/router";
import DynamicHeader from "@/components/DynamicHeader";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zENLI",
  description: "zENLI",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth focus:scroll-auto">
      <body className={inter.className}>
        <Provider>
          
           <main>
             {children}
            </main>
          <Footer/> 
        </Provider> 
      </body> 
    </html>
  );
}
