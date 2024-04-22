"use client";
import { PageProvider } from "../../contexts/PageContext";
import WelcomePageBody from "./WalmartPageBody";
import NavBar from "../../components/NavBar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const searchParams = useSearchParams();

    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 pl-24">
                    <h6 className="text-sm font-semibold">
                        <Link
                            href="https://chromewebstore.google.com/detail/walmart-split/hhbinkmffgbhdemchconkgejfkocgahj"
                            target="_blank"
                        >
                            Check out our extension
                        </Link>
                    </h6>
                </div>
                <PageProvider>
                    <NavBar />
                    <WelcomePageBody />
                </PageProvider>
            </div>

            {/* Body */}
        </>
    );
}
