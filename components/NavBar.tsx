import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div
            className={`bg-white p-4  sticky z-10 top-0  left-0 right-0 text-center border-b   align-center items-center flex justify-center ${
                scrollPosition > 0
                    ? " backdrop-blur-sm bg-white/75 border-b-2  backdrop-filter"
                    : ""
            } `}
        >
            <Image
                className="absolute left-4"
                src={"/walmart-icon.svg"}
                alt="Walmart Logo"
                width={50}
                height={50}
            />
            <Link href={"/"}>
                <h2 className="scroll-m-20 pb-2 pr-72 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Walmart split
                </h2>
            </Link>

            <div className="absolute right-4 flex flex-row items-center ">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h6 className="ml-2">Hello, Yashwanth G</h6>
            </div>
        </div>
    );
}