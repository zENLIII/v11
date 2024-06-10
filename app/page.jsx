"use client"
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import HeroSection from "@/components/Home/HeroSection";
import TimeLine from "@/components/Home/TimeLine";
import FeaturesPlatform from "@/components/Home/FeaturesPlatform";
import { Button } from "@/components/ui/button";
import CustomerReview from "@/components/Home/CustomerReview";
import CustomerSubscribe from "@/components/Home/CustomerSubscribe";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { useState, useEffect } from 'react';
import { SignUp } from '@clerk/nextjs';
// import Loading from '@/components/Loading';
import { Suspense } from "react";
import Header from "@/components/Header";

export default function Home() {
    //The code below forcefully redirects user to dashboard page when signed in
    // const {userId} = auth();
    // if(userId) {
    //     redirect('/dashboard');
    // }
    
    

    
    return (
    <>
        <main className="min-h-screen bg-white dark:bg-black antialiased bg-grid-white/[0.2]">
            <Header/>
            <HeroSection/>
            {/* <Suspense fallback={<Loading/>}>            */}
                <FeaturedCategories/>
             {/* </Suspense> */}
            <TimeLine/>
            <FeaturesPlatform/>
            <CustomerReview/>
            <CustomerSubscribe/>
        </main>    
        
    </>
    )
} 