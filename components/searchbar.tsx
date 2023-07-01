"use client";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    GroupIcon,
} from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Item, PageContext, Person } from "../contexts/PageContext";
import classNames from "classnames";
import { useState, useEffect, useRef, useContext, use, cache } from "react";
import useSWR from "swr";

const getFriends = async () => {
    const res = await fetch("http://localhost:3001/v2/get_friends", {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkRGF0YSI6ImUwYmNmNTQ1Y2EyNzI3NzJiM2U0MDRkZGMzZjNjNmNiIiwiaWF0IjoxNjg4MDA0ODY4fQ.Pj2hkc-STII1YRFGHZInhboc_IZdmYBaXBcIc7Z7ukc",
        },
    });
    return res.json();
};

export default function SearchBar() {
    console.log("iam running successfully");
    const [allFriends, setAllFriends] = useState<Person[]>([]);
    const { globalSelectedPersons, setGlobalSelectedPersons } =
        useContext(PageContext);
    const allGroups = [
        {
            name: "Walmart",
            id: 4,
        },
        {
            name: "Amazon",
            id: 5,
        },
    ];

    const [isInputFocused, setInputFocused] = useState(false);
    const commandListRef = useRef<HTMLDivElement | null>(null);
    const handleInputFocus = () => {
        setInputFocused(true);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (
            commandListRef.current &&
            !(commandListRef.current as Node)?.contains(event.target as Node)
        ) {
            setInputFocused(false);
        }
    };
    const handleSelectitem = (person: Person) => {
        console.log(person);
        const present = globalSelectedPersons.some(
            (obj) => obj.id === person.id
        );
        console.log(present);
        if (!present) {
            setGlobalSelectedPersons([...globalSelectedPersons, person]);
        }
    };
    const handleUnSelectItem = (person: Person) => {
        console.log(person);
        const newglobalSelectedPersons = globalSelectedPersons.filter(
            (obj) => obj.id !== person.id
        );
        setGlobalSelectedPersons(newglobalSelectedPersons);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getFriends()
            .then((data: Person[]) => {
                console.log(data);
                setAllFriends(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {globalSelectedPersons?.length === 0 ? (
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Please select a group or friend
                </h4>
            ) : (
                globalSelectedPersons?.map((person) => (
                    <Button
                        onClick={() => {
                            handleUnSelectItem(person);
                        }}
                        key={person.id}
                    >
                        {person.name}
                    </Button>
                ))
            )}
            <Command
                ref={commandListRef}
                className="rounded-lg border shadow-md"
            >
                <CommandInput
                    onFocus={() => setInputFocused(true)}
                    placeholder="Enter group or friend name.."
                />
                <CommandList
                    className={classNames(
                        "transition-[height]",
                        { "h-[var(--cmdk-list-height)]": isInputFocused },
                        { "h-0": !isInputFocused }
                    )}
                >
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Friends">
                        {allFriends?.map((friend: Person) => (
                            <div
                                key={friend.name}
                                onClick={() => {
                                    handleSelectitem(friend);
                                }}
                            >
                                <CommandItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span className="cursor-pointer">
                                        {friend.name}
                                    </span>
                                </CommandItem>
                            </div>
                        ))}
                    </CommandGroup>
                    <CommandSeparator className="cursor-pointer" />
                    <CommandGroup heading="Groups">
                        {allGroups.map((group) => (
                            <div
                                key={group.name}
                                onClick={() => {
                                    handleSelectitem(group);
                                }}
                            >
                                <CommandItem>
                                    <GroupIcon className="mr-2 h-4 w-4" />
                                    <span className="cursor-pointer">
                                        {group.name}
                                    </span>
                                </CommandItem>
                            </div>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    );
}