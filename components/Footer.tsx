import Link from "next/link";

export default function Footer() {
    let year = new Date().getFullYear();
    return (
        <footer className="bg-black text-white p-4 flex justify-evenly">
            <p>&copy; {year} Splitzy</p>
            <p>
                <Link href="/privacypolicy" className="hover:text-blue-300">
                    Privacy Policy
                </Link>
            </p>
        </footer>
    );
}