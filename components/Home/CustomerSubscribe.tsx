"use client";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import {toast, Toaster} from "sonner";
import Image from "next/image";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import styles from "@/styles/Button.module.css"



function CustomerSubscribe(){
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Start Your Journey Now!
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Experience the power of new edge technology. And become one of the
              pioneer in the technological world.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            {/* <form className="flex space-x-2"> */}
            {/* <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
              /> */}
            <Link href="/explore" passHref>
              <Button className={styles.button}>
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>Let&apos;s Begin!</span>
              </Button>
            </Link>
            {/* </form> */}
            {/* <p className="text-xs text-gray-500 dark:text-gray-400">
              By signing up, you agree to our <br />
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p> */}
          </div>
        </div>
      </section>
    );

}
    

export default CustomerSubscribe
