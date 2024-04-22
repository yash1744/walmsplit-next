"use client";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    GroupIcon,
    X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import { getFriends, getGroups } from "@/lib/backendrequests";

let access_token =
    typeof window !== "undefined"
        ? window.localStorage.getItem("access_token") || ""
        : "";

export default function SearchBar() {
    let router = useRouter();
    const [allFriends, setAllFriends] = useState<Person[]>([]);
    const { globalSelectedPersons, setGlobalSelectedPersons, user, setUser } =
        useContext(PageContext);

    const [allGroups, setAllGroups] = useState([]);

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
        const present = globalSelectedPersons.some(
            (obj) => obj.id === person.id
        );

        if (!present) {
            setGlobalSelectedPersons([...globalSelectedPersons, person]);
        }
    };
    const handleSelectGroup = (group: any) => {
        const globalSelectedPersonsIds = globalSelectedPersons.map(
            (obj) => obj.id
        );
        let groupMembersIds = group.members.map((obj: any) => obj.id);
        groupMembersIds = groupMembersIds.filter(
            (el: any) => !globalSelectedPersonsIds.includes(el)
        );
        const groupMembers = allFriends.filter((obj) =>
            groupMembersIds.includes(obj.id)
        );
        setGlobalSelectedPersons([...globalSelectedPersons, ...groupMembers]);
    };
    const handleUnSelectItem = (person: Person) => {
        if (person.id !== user?.id) {
            const newglobalSelectedPersons = globalSelectedPersons.filter(
                (obj) => obj.id !== person.id
            );
            setGlobalSelectedPersons(newglobalSelectedPersons);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getFriends(router)
            .then((data: Person[]) => {
                setAllFriends(data);
            })
            .catch((err) => {});

        getGroups(router)
            .then((data: any) => {
                setAllGroups(data);
            })
            .catch((err) => {});
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                {globalSelectedPersons?.length === 0 ? (
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
                        Please select a group or friend
                    </h4>
                ) : (
                    <div>
                        <h1 className="text-xl mr-4 font-semibold tracking-tight ">
                            Selected Persons:
                        </h1>
                        <div className="py-5 flex gap-3 flex-wrap">
                            {globalSelectedPersons?.map((person) => (
                                <div
                                    className="flex justify-between items-center"
                                    key={person.id}
                                >
                                    {person.id !== user?.id ? (
                                        <>
                                            <Button
                                                className="border-r-0 rounded-r-none cursor-default"
                                                key={person.id}
                                            >
                                                {person.id === user?.id
                                                    ? "You"
                                                    : person.name}
                                            </Button>
                                            <div
                                                className="px-2 flex items-center h-10 bg-black text-white rounded-r-md border-l-0 cursor-pointer hover:opacity-80"
                                                onClick={() => {
                                                    handleUnSelectItem(person);
                                                }}
                                            >
                                                <X
                                                    className=" w-7"
                                                    key={person.id}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <Button className="cursor-default">
                                            {person.id === user?.id
                                                ? "You"
                                                : person.name}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Command
                ref={commandListRef}
                className="rounded-lg border shadow-md"
            >
                <CommandInput
                    onFocus={() => setInputFocused(true)}
                    placeholder="Enter group or friend name..."
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
                        {allFriends?.map((friend: Person) =>
                            globalSelectedPersons.some(
                                (obj) => obj.id === friend.id
                            ) ? null : (
                                <div
                                    key={friend.name}
                                    onClick={() => {
                                        handleSelectitem(friend);
                                    }}
                                >
                                    <CommandItem>
                                        <Avatar>
                                            <AvatarImage
                                                src={friend.image}
                                                alt="NOne"
                                            />
                                            <AvatarFallback>
                                                {friend.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="cursor-pointer py-4 px-4">
                                            {friend.name}
                                        </span>
                                    </CommandItem>
                                </div>
                            )
                        )}
                    </CommandGroup>
                    <CommandSeparator className="cursor-pointer" />
                    <CommandGroup heading="Groups">
                        {allGroups.map((group: any) => (
                            <div
                                className="cursor-pointer"
                                key={group.id}
                                onClick={() => {
                                    handleSelectGroup(group);
                                }}
                            >
                                <CommandItem>
                                    <div className="flex flex-row py-4 cursor-pointer">
                                        <GroupIcon className="mr-2 h-6 w-6" />
                                        <span className="text-base">
                                            {group.name}
                                        </span>
                                    </div>
                                </CommandItem>
                            </div>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    );
}
