"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { useContext } from "react";
import { PageContext, PageContextType } from "@/contexts/PageContext";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/backendrequests";
import UserOptionsMenu from "./UserOptionsMenu";
import { ThreeDots } from "react-loader-spinner";
export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    const { user, setUser, globalSelectedPersons, setGlobalSelectedPersons } =
        useContext<PageContextType>(PageContext);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        getUser(router)
            .then((data: any) => {
               
                if(data?.error){
                    alert("Session expired, please login again");
                    handleLogout();
                    return;
                }
                
                const user = {
                    name:
                        (data.first_name ?? "") + " " + (data.last_name ?? ""),
                    id: data.id,
                    image: data.picture?.medium,
                };
                setUser(user);
                setGlobalSelectedPersons([...globalSelectedPersons, user]);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLogout = () => {
        window.localStorage.removeItem("access_token");
        router.replace("/");
    };
    return (
        <div
            className={`bg-white p-4  sticky z-10 top-0  left-0 right-0 text-center border-b align-center items-center flex justify-center ${
                scrollPosition > 0
                    ? " backdrop-blur-sm bg-white/75 border-b-2  backdrop-filter"
                    : ""
            } `}
        >
            <Image
                className="absolute left-4 rounded-md cursor-pointer"
                src={"/splitzy.jpg"}
                alt="Splitzy Logo"
                width={50}
                height={50}
                onClick={() => router.push("/")}
            />
            <Link href={"/"}>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Splitzy
                </h2>
            </Link>

            <div
                className="absolute cursor-pointer right-4 flex flex-row items-center "
                onMouseOver={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                {user ? (
                    <>
                        <Avatar>
                            <AvatarImage src={user?.image} alt="None" />
                            <AvatarFallback>{user?.name[0]}</AvatarFallback>
                        </Avatar>
                        <h6 className="ml-2">Hello, {user?.name}</h6>
                        {showMenu && (
                            <div className="absolute right-1 top-10 cursor-default">
                                <UserOptionsMenu
                                    setShowMenu={setShowMenu}
                                    handleLogout={handleLogout}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <ThreeDots
                            height="60"
                            width="60"
                            radius="9"
                            color="#000000"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
