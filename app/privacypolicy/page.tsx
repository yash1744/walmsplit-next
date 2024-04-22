"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const router = useRouter();
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
        <>
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
            </div>

            <div>
                <div className="text-3xl text-center font-bold">
                    Privacy Policy
                </div>
                <div className="py-3 px-5">
                    This Privacy Policy describes how our website treats the
                    privacy of users (&quot;you&quot; or &quot;your&quot;).{" "}
                    <div>
                        <div className="text-lg font-bold py-3">
                            What Information Do We Collect?
                        </div>
                        We do not collect any personal information from you when
                        you visit our website. This includes:
                        <li>Your name</li>
                        <li>Email address</li>
                        <li>IP address</li>
                        <li>Browsing history</li>
                        <li>Any other personally identifiable information.</li>
                        <div className="text-lg font-bold pt-3">
                            How Do We Use Your Information?
                        </div>{" "}
                        Since we do not collect any information, we do not use
                        it for any purpose.
                        <div className="text-lg font-bold pt-3">
                            Cookies and Tracking Technologies
                        </div>{" "}
                        We do not use cookies or any other tracking technologies
                        to monitor your browsing activity on our website.
                        <div className="text-lg font-bold pt-3">
                            Third-Party Links
                        </div>{" "}
                        Our website may contain links to third-party websites.
                        These websites have their own privacy policies, and we
                        encourage you to review them before you submit any
                        personal information to them. We are not responsible for
                        the content or privacy practices of any third-party
                        websites.
                        <div className="text-lg font-bold pt-3">
                            Changes to This Privacy Policy
                        </div>{" "}
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by posting the new
                        Privacy Policy on this page.
                        <div className="text-lg font-bold pt-3">Contact Us</div>
                        If you have any questions about this Privacy Policy,
                        please contact us by filling this{" "}
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500"
                            href="https://forms.gle/kSkyFu45R85QbzQ76"
                        >
                            form
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </>
    );
}
