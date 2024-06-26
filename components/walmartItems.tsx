"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useContext } from "react";
import { PageContext, PageContextType } from "../contexts/PageContext";
import CardWithForm from "./itemcard";
import { NewItemDialog } from "./NewItemDialog";
import { v4 as uuidv4 } from "uuid";

export default function WalmartItems({
    showCustomItems,
    setShowCustomItems,
}: {
    showCustomItems: boolean;
    setShowCustomItems: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { itemsState, setItemsState } =
        useContext<PageContextType>(PageContext);
    function addNewItem(name: string, price: number) {
        const newItem = {
            item: {
                name: name,
                price: price.toString(),
                image: "/walmartsplit-noproduct.jpg",
            },
            tax: 0,
            selectedPersons: [],
            id: uuidv4(),
        };
        setItemsState([...itemsState, newItem]);
    }

    function removeItem(id: string) {
        const newItems = itemsState.filter((item) => item.id !== id);
        setItemsState(newItems);
    }
    return (
        <>
            <div className="grid w-full gap-2">
                {itemsState.length > 0 || showCustomItems ? (
                    <div>
                        <div className="flex justify-between">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-2 text-pink-500 ">
                                Items Bought: {itemsState.length}
                            </h3>
                            {itemsState.length === 0 &&
                            <Button
                                onClick={() => setShowCustomItems(false)}
                                className="mt-4"
                            >
                                Back to source code page
                            </Button>}
                        </div>

                        <div className="mt-2 grid grid-cols-4 gap-12 justify-between sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {itemsState.map((itemState, idx) => (
                                <CardWithForm
                                    key={itemState.id}
                                    uuid={itemState.id}
                                    id={idx}
                                    item={itemState.item}
                                    tax={itemState.tax}
                                    persons={itemState.selectedPersons}
                                    removeItem={removeItem}
                                />
                            ))}

                            <NewItemDialog addNewItem={addNewItem} />
                        </div>
                    </div>
                ) : (
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        No items found
                    </h4>
                )}
            </div>
        </>
    );
}
