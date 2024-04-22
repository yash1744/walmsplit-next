"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PageContext, PageContextType } from "../contexts/PageContext";
import { useContext, useState } from "react";
import { Item, Person } from "../contexts/PageContext";
import Image from "next/image";
import { SquareX, Pencil, Edit } from "lucide-react";
import { NewItemDialog } from "./NewItemDialog";
import { EditItemDialog } from "./EditItemDialog";

export default function CardWithForm({
    id,
    uuid,
    item,
    tax,
    persons,
    removeItem,
    editItem,
}: {
    id: number;
    uuid: string;
    item: Item;
    tax: number;
    persons: Person[];
    removeItem: (id: string) => void;
    editItem: (id: string, name: string, price: number) => void;
}) {
    const {
        globalSelectedPersons,
        setGlobalSelectedPersons,
        setItemlocalSelectedPersons,
        setItemTax,
        globalTax,
        user,
    } = useContext<PageContextType>(PageContext);
    const { name, image, price } = item;
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [localSelectedPersons, setLocalSelectedPersons] = useState<Person[]>(
        []
    );

    const removeLocalPerson = (globalPerson: Person) => {
        setLocalSelectedPersons(
            localSelectedPersons.filter(
                (person) => person.id !== globalPerson.id
            )
        );
        selectAll && setSelectAll(false);
    };
    const addLocalPerson = (person: Person) => {
        setLocalSelectedPersons([...localSelectedPersons, person]);
    };

    const checkHandler = (checked: boolean) => {
        if (checked) {
            setLocalSelectedPersons([...globalSelectedPersons]);
            setSelectAll(true);
        } else {
            setLocalSelectedPersons([]);
            setSelectAll(false);
        }
    };
    React.useEffect(() => {
        if (selectAll) {
            setLocalSelectedPersons([...globalSelectedPersons]);
        } else {
            const newlocalpersons = localSelectedPersons.filter((person) => {
                return globalSelectedPersons.some(
                    (globalPerson) => globalPerson.id === person.id
                );
            });
            setLocalSelectedPersons(newlocalpersons);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalSelectedPersons]);

    const handleEditItem = () => {
       
    };

    React.useEffect(() => {
        setItemlocalSelectedPersons(id, localSelectedPersons);
        localSelectedPersons.length === globalSelectedPersons.length &&
        localSelectedPersons.length !== 0
            ? setSelectAll(true)
            : setSelectAll(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localSelectedPersons]);
    return (
        <Card className="w-72 relative">
            {/* <img className="w-full h-48 object-cover" src={image} alt=""></img> */}
            <div className="bg-black cursor-pointer absolute right-0 rounded-sm text-white hover:text-red-500 hover:bg-transparent transition-all">
                <SquareX onClick={(e: any) => removeItem(uuid)} />
            </div>
            <Image
                className="w-full h-48 object-cover"
                height={192}
                width={288}
                src={image}
                alt=""
            ></Image>
            <Separator />
            <CardHeader className="pb-2 pt-0">
                <h6 className="mt-4 text-sm font-semibold break-words">
                    {name}
                </h6>
            </CardHeader>
            <CardContent className="pb-0 pt-2">
                <div className="flex justify-between items">
                    {parseFloat(price) > 0 && (
                        <div className="flex items-center space-x-2 pr-6">
                            <Switch
                                checked={tax > 0 ? true : false}
                                onCheckedChange={(checked) => {
                                    checked
                                        ? setItemTax(id, globalTax)
                                        : setItemTax(id, 0);
                                }}
                                id={`${name}_tax`}
                            />
                            <Label htmlFor="airplane-mode">Tax</Label>
                        </div>
                    )}
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={selectAll}
                            onCheckedChange={checkHandler}
                            id={`${name}_select_all`}
                        />
                        <Label htmlFor="airplane-mode">Select All</Label>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <CardTitle className="mt-4">{`$${parseFloat(
                        (
                            parseFloat(price) +
                            (parseFloat(price) * tax) / 100
                        ).toFixed(2)
                    )}`}</CardTitle>
                  <EditItemDialog editItem={editItem} item={item} uuid={uuid} />
                </div>
            </CardContent>
            {/* <Separator /> */}
            <CardFooter className="flex-wrap mt-4 ">
                {globalSelectedPersons.map((globalPerson) =>
                    persons.some(
                        (localPerson) => localPerson.id === globalPerson.id
                    ) ? (
                        <Button
                            onClick={() => removeLocalPerson(globalPerson)}
                            key={globalPerson.id}
                            className="mt-2 mr-2 "
                        >
                            {globalPerson.id === user?.id
                                ? "You"
                                : globalPerson.name}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => addLocalPerson(globalPerson)}
                            variant={"outline"}
                            key={globalPerson.id}
                            className="mt-2 mr-2  "
                        >
                            {globalPerson.id === user?.id
                                ? "You"
                                : globalPerson.name}
                        </Button>
                    )
                )}
            </CardFooter>
        </Card>
    );
}
