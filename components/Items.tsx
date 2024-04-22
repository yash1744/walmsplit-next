"use client";
import { useContext } from "react";
import { PageContext, PageContextType } from "../contexts/PageContext";
import { NewItemDialog } from "./NewItemDialog";
import { v4 as uuidv4 } from "uuid";
import CardWithForm from "./ItemCard";


export default function Items() {
    const { itemsState, setItemsState } =
        useContext<PageContextType>(PageContext);
    function addNewItem(name: string, price: number) {
        const newItem = {
            item: {
                name: name,
                price: price.toString(),
                image: "/splitzy.jpg",
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
    function editItem(id: string, name: string, price: number) {
        const newItems = itemsState.map((item) => {
            if (item.id === id) {
                item.item.name = name;
                item.item.price = price.toString();
            }
            return item;
        });
        setItemsState(newItems);
    }
    return (
        <>
            <div className="grid w-full gap-2">
                {itemsState.length > 0 ? (
                    <div>
                        <div className="flex justify-between">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-2 text-pink-500 ">
                                Items Bought: {itemsState.length}
                            </h3>
                        </div>

                        <div className="my-2 grid grid-cols-4 gap-12 justify-between sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {itemsState.map((itemState, idx) => (
                                <CardWithForm
                                    key={itemState.id}
                                    uuid={itemState.id}
                                    id={idx}
                                    item={itemState.item}
                                    tax={itemState.tax}
                                    persons={itemState.selectedPersons}
                                    removeItem={removeItem}
                                    editItem={editItem}
                                />
                            ))}

                            <NewItemDialog addNewItem={addNewItem} />
                        </div>
                    </div>
                ) : (
                    <>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-5">
                            No items found, please add them using the option
                            below
                        </h4>

                        <div className="mb-3">
                            <NewItemDialog addNewItem={addNewItem} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
