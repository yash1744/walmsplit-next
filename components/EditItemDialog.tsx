"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Item } from "@/interfaces/interfaces";
import { Pencil } from "lucide-react";

export function EditItemDialog({
    editItem,
    item,
    uuid,
}: {
    editItem: (id: string, name: string, price: number) => void;
    item: Item;
    uuid: string;
}) {
    const [itemName, setItemName] = useState<string>(item.name);
    const [itemPrice, setItemPrice] = useState<string>(item.price);
    const [open, setOpen] = useState<boolean>(false);
    const handleEditItem = () => {
        if (itemName.trim() === "") {
            alert("Item name cannot be empty");
            return;
        }
        if (parseFloat(itemPrice) === 0) {
            alert("Item price cannot be zero");
            return;
        }
        if (itemPrice.trim() === "" || itemPrice.trim().length === 0) {
            alert("Item price cannot be empty");
            return;
        }
        if (isNaN(parseFloat(itemPrice))) {
            alert("Item price must be a number");
            return;
        }
        setOpen(false);
        editItem(uuid, capitalizeFirstLetter(itemName), parseFloat(itemPrice));
    };
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Pencil className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Item Name
                        </Label>
                        <Input
                            autoComplete="off"
                            value={itemName}
                            onChange={(event) =>
                                setItemName(event.target.value)
                            }
                            id="name"
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Item Price
                        </Label>
                        <Input
                            type="text"
                            autoComplete="off"
                            value={itemPrice}
                            onChange={(event) =>
                                setItemPrice(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key === "ArrowUp" ||
                                    event.keyCode === 38
                                ) {
                                    const newItemPrice =
                                        parseFloat(itemPrice) + 1;
                                    setItemPrice(
                                        isNaN(newItemPrice)
                                            ? "1"
                                            : newItemPrice.toString()
                                    );
                                }
                                if (
                                    event.key === "ArrowDown" ||
                                    event.keyCode === 40
                                ) {
                                    const newItemPrice =
                                        parseFloat(itemPrice) - 1;
                                    setItemPrice(
                                        isNaN(newItemPrice)
                                            ? "-1"
                                            : newItemPrice.toString()
                                    );
                                }
                            }}
                            id="price"
                            className="col-span-3"
                            required
                        />
                    </div>
                    {parseFloat(itemPrice) < 0 && (
                        <div className="text-xs text-red-500 pl-3">
                            Are you sure you want the price negative?
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button onClick={handleEditItem}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
