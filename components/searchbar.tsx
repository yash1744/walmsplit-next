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
import { useRouter } from "next/navigation";


let access_token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") || "" : "";
const getFriends = async () => {
    if (!access_token) {
        alert("Login expired. Please login again");
        let router = useRouter();
        router.push("/");
    }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v2/get_friends`,
        {
            headers: {
                token: access_token,
            },
        }
    );
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
