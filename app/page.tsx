"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";


export default function Home() {
     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        let access_token =
            typeof window !== "undefined"
                ? window.localStorage.getItem("access_token") || ""
                : "";
        if (access_token.length > 0) {
            setIsAuthenticated(true);
        }
        
    }, []);
    return (
        <div className="h-full flex flex-col justify-between">
            <div
                className={`bg-white p-4  sticky z-10 top-0  left-0 right-0 text-center border-b align-center items-center flex justify-center `}
            >
                <Image
                    className="absolute left-4 rounded-md"
                    src={"/splitzy.jpg"}
                    alt="Splitzy Logo"
                    width={50}
                    height={50}
                />
                <Link href={"/"}>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Splitzy
                    </h2>
                </Link>
                <div className="absolute right-4 flex">
                    <a
                        className="mr-4"
                        href={"https://github.com/yash1744/walmsplit-next"}
                    >
                        {" "}
                        <Image
                            className="rounded-full lg:mr-6 "
                            src={"/github-icon.svg"}
                            alt="None"
                            width={40}
                            height={40}
                        />
                    </a>

                    {!isAuthenticated ? (
                        <a
                            className="cursor-pointer "
                            href={`https://secure.splitwise.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPLITWISE_API_TOKEN}`}
                        >
                            <Button>Login to splitwise </Button>
                        </a>
                    ) : (
                        <Link className="cursor-pointer" href="/welcome">
                            <Button variant={"outline"}>Go to app</Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex flex-col text-[32px] font-extrabold items-center sm:text-[40px] md:text-[56px] lg:text-[76px]  ">
                <span className="text-transparent animate-backgroundClip  bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    An
                </span>
                <span className="text-transparent animate-backgroundClip  bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                    Easy Way to
                </span>
                <span className="text-transparent animate-backgroundClip  bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
                    Manage Your Expenses
                </span>
                <h2 className="text-xl text-center font-medium">
                    Effortlessly Split and Share Your Expenses via Splitwise
                    directly on the web
                </h2>
                <Button
                    className="mt-4"
                    onClick={() => {
                        if (!isAuthenticated) {
                            window.location.href = `https://secure.splitwise.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPLITWISE_API_TOKEN}`;
                        } else {
                            window.location.href = "/welcome";
                        }
                    }}
                >
                    {" "}
                    Get Started
                </Button>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
