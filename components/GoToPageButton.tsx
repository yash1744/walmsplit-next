"use client";
import { Button } from "@/components/ui/button";
import router from "next/router";

export default function GoToPageButton({
    ButtonName,
    redirectUrl,
}: {
    ButtonName: string;
    redirectUrl: string;
}) {
    return (
        <Button onClick={() => router.push(redirectUrl)}>{ButtonName}</Button>
    );
}