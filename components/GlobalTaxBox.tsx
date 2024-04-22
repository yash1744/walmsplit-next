import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Edit, Save } from "lucide-react";
import { PageContext, PageContextType } from "@/contexts/PageContext";

export default function GlobalTaxBox() {
    const { globalTax, setGlobalTax } =
        useContext<PageContextType>(PageContext);
    const [tax, setTax] = useState(globalTax);
    const [isInputFocused, setInputFocused] = useState(false);
    return (
        <div className="flex flex-col py-5 px-2">
            {isInputFocused ? (
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={tax}
                        onChange={(e) => {
                            setTax(parseFloat(e.target.value));
                        }}
                        onBlur={(e) => {
                            if (
                                e.target.value === "" ||
                                parseFloat(e.target.value) < 0 ||
                                parseFloat(e.target.value) > 100 ||
                                isNaN(parseFloat(e.target.value))
                            ) {
                                setTax(0);
                            }
                        }}
                        required
                        autoFocus
                        className="w-32"
                    ></Input>
                    <Save
                        className="cursor-pointer h-8 w-8"
                        onClick={() => {
                            setInputFocused(false);
                            if (
                                tax === undefined ||
                                tax === null ||
                                tax < 0 ||
                                tax > 100 ||
                                isNaN(tax)
                            ) {
                                setGlobalTax(0);
                            } else {
                                setGlobalTax(tax);
                            }
                        }}
                    ></Save>
                </div>
            ) : (
                <div className="flex items-center">
                    <p className="text-2xl mr-4 font-bold">{`Tax Percentage: ${globalTax}`}</p>
                    <Edit
                        className="cursor-pointer"
                        onClick={() => setInputFocused(true)}
                    ></Edit>
                </div>
            )}
        </div>
    );
}
