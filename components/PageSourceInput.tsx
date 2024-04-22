import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useContext } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { ItemsState, PageContext } from "../contexts/PageContext";
import parseHtml from "@/lib/parseHtml";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function PageSourceInput() {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isError, setIsError] = useState(false);
    const { setItemsState } = useContext(PageContext);

    const handleButton = () => {
        const html = textareaRef.current?.value ?? "";
        const items = parseHtml(html);
        if (items.length > 0) {
            // setItems(items);

            const allItemsState: ItemsState[] = items.map((item) => {
                return {
                    item,
                    tax: 0,
                    selectedPersons: [],
                    id: uuidv4(),
                };
            });
            setItemsState(allItemsState);
        } else {
            setIsError(true);
        }
    };

    return (
        <>
            <Alert className={isError ? "" : "hidden"} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                    Source code is not valid please Enter a Valid Source Code
                </AlertDescription>
            </Alert>
            <div>
                {/* <h1 className=" text-[40px] font-semibold tracking-tight mt-2 ">
                    Welcome,
                </h1> */}
                <h4 className=" text-xl font-normal tracking-tight mb-6  ">
                    Paste the{" "}
                    <span className="text-pink-500 font-medium">
                        walmart orders source code
                    </span>{" "}
                    in the below text box
                </h4>
            </div>
            <div className="flex flex-col h-80">
                <Textarea
                    className="h-96"
                    id="html-input"
                    onChange={() => {
                        isError ? setIsError(false) : null;
                    }}
                    ref={textareaRef}
                    placeholder="Paste the source here"
                />
                <Button
                    className="mt-4 py-4 h-12 cursor-pointer"
                    onClick={handleButton}
                    id="submit-html-btn"
                >
                    Submit
                </Button>
            </div>
        </>
    );
}
