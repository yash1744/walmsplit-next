"use client";
import PageSourceInput from "../../components/PageSourceInput";
import { Separator } from "@/components/ui/separator";
import { PageContext, PageContextType } from "../../contexts/PageContext";
import { useContext } from "react";
import TotalBox from "../../components/TotalBox";
import { useRouter } from "next/navigation";
import GlobalTaxBox from "@/components/GlobalTaxBox";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import Items from "@/components/Items";

export default function WalmartPageBody() {
    const { itemsState } = useContext<PageContextType>(PageContext);
    const router = useRouter();
    return (
        <div className="flex flex-1">
            <div className="pl-10 flex-1  ">
                {/* <SearchBar />    */}
                {itemsState.length > 0 ? (
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
                ) : (
                    <>
                        <Button
                            onClick={() => {
                                router.push("/welcome");
                            }}
                        >
                            Back to Welcome page
                        </Button>
                        <div className="px-10 mt-10">
                            <PageSourceInput />
                        </div>
                    </>
                )}
            </div>
            <Separator orientation="vertical" />

            <TotalBox />
        </div>
    );
}
