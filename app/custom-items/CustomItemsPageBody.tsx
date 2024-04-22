"use client";
import { Separator } from "@/components/ui/separator";
import TotalBox from "../../components/TotalBox";
import { useRouter } from "next/navigation";
import GlobalTaxBox from "@/components/GlobalTaxBox";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import Items from "@/components/Items";

export default function CustomItemsPageBody() {
    const router = useRouter();
    return (
        <div className="flex flex-1">
            <div className="pl-10 flex-1  ">
                <div className="h-[calc(100vh-115px)] overflow-y-auto">
                    <Button
                        onClick={() => {
                            router.push("/welcome");
                        }}
                    >
                        Back to Welcome page
                    </Button>
                    <GlobalTaxBox />
                    <SearchBar />
                    <Items />
                </div>
            </div>
            <Separator orientation="vertical" />

            <TotalBox />
        </div>
    );
}
