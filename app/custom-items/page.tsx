"use client";
import { PageProvider } from "../../contexts/PageContext";
import NavBar from "../../components/NavBar";
import CustomItemsPageBody from "./CustomItemsPageBody";

export default function Page() {
    return (
        <>
            <PageProvider>
                <NavBar />
                <CustomItemsPageBody />
            </PageProvider>
        </>
    );
}
