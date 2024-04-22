import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemsState } from "@/contexts/PageContext";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function findItemsTotal (expenses:any) {
   return parseFloat( expenses.reduce((accumulator:any, expense:any) =>accumulator + expense.amount,0).toFixed(2))
}

export function commentBuilder(description :string, itemsState:ItemsState[]){
    let comment:string = ""
    comment += " ---------- Splitzy -------------\n"
    comment += ` -------  ${description}  -----------\n`
    
    itemsState.forEach((itemState)=>{
        if (itemState.selectedPersons.length >0){
            comment += `${itemState.item.name}         ${itemState.item.price}      \n`
            itemState.selectedPersons.forEach((person)=>{
                comment+= `--- ${person.name}\n`
            })
        }
       
    })
    return comment
}

