import React, {
    createContext,
    useState,
    useEffect,
    use,
    useCallback,
} from "react";

// Create the PageContext
export const PageContext = createContext<PageContextType>({
    globalSelectedPersons: [],
    setGlobalSelectedPersons: () => {},
    itemsState: [],
    setItemsState: () => {},
    setItemlocalSelectedPersons: () => {},
    setItemTax: () => {},
    globalTax: 8.25,
    atLeastOnePersonSelected: false,
});

export type PageContextType = {
    globalSelectedPersons: Person[];
    setGlobalSelectedPersons: React.Dispatch<React.SetStateAction<Person[]>>;
    itemsState: ItemsState[];
    setItemsState: React.Dispatch<React.SetStateAction<ItemsState[]>>;
    setItemlocalSelectedPersons: (id: number, persons: Person[]) => void;
    setItemTax: (id: number, tax: number) => void;
    globalTax: number;
    atLeastOnePersonSelected: boolean;
};

export interface ItemsState {
    item: Item;
    tax: number;
    selectedPersons: Person[];
}

export interface Item {
    name: string;
    image: string;
    price: string;
}

export interface Person {
    name: string;
    id: number;
}

// Create a Context Provider component
export const PageProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalSelectedPersons, setGlobalSelectedPersons] = useState<
        Person[]
    >([]);
    const [globalTax, setGlobalTax] = useState<number>(8.25);
    const [itemsState, setItemsState] = useState<ItemsState[]>([]);
    const [atLeastOnePersonSelected, setAtLeastOnePersonSelected] =
        useState<boolean>(false);
    const setItemlocalSelectedPersons = (id: number, persons: Person[]) => {
        const newItemsState = [...itemsState];
        newItemsState[id].selectedPersons = persons;
        setItemsState(newItemsState);
    };
    const setItemTax = (id: number, tax: number) => {
        const newItemsState = [...itemsState];
        newItemsState[id].tax = tax;
        setItemsState(newItemsState);
    };
    const checkAtLeastOnePersonSelected = () => {
        const newAtLeastOnePersonSelected = itemsState.some((item) => {
            return item.selectedPersons.length > 0;
        });
        atLeastOnePersonSelected !== newAtLeastOnePersonSelected &&
            setAtLeastOnePersonSelected(newAtLeastOnePersonSelected);
    };
    useEffect(() => {
        checkAtLeastOnePersonSelected();
    }, [itemsState]);

    useEffect(() => {
        console.log("items state");
        console.log("provider rendering");
        console.log(itemsState);
    });
    return (
        <PageContext.Provider
            value={{
                // items,
                // setItems,
                globalSelectedPersons,
                setGlobalSelectedPersons,
                itemsState,
                setItemsState,
                setItemlocalSelectedPersons,
                setItemTax,
                globalTax,
                atLeastOnePersonSelected,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};