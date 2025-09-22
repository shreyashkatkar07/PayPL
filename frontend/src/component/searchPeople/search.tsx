
import { useState, useEffect, ChangeEvent } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, payment } from "../../recoil/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SearchResultItem {
    _id: string;
    name: string;
    number: string;
}

export default function SearchPeople() {
    const [searchresult, setSearchresult] = useState<SearchResultItem[]>([]);
    const [searchKey, setSearchKey] = useState("");
    const [searchType, setSearchType] = useState("name");
    const [loading, setLoading] = useState(false);
    const url = useRecoilValue(baseurl);
    let debounceTimeout: NodeJS.Timeout;

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchKey(e.target.value);
        triggerSearch(e.target.value, searchType);
    }

    function handleTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        setSearchType(e.target.value);
        triggerSearch(searchKey, e.target.value);
    }

    function triggerSearch(key: string, type: string) {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        if (!key.trim()) {
            setSearchresult([]);
            return;
        }
        setLoading(true);
        debounceTimeout = setTimeout(() => {
            const h = sessionStorage.getItem("token");
            axios
                .post(
                    url + "/search",
                    { key, type },
                    { headers: { Authorization: h } }
                )
                .then((response) => {
                    setSearchresult(response.data.resp);
                })
                .catch((error) => {
                    setSearchresult([]);
                    console.error("There was an error searching!", error);
                })
                .finally(() => setLoading(false));
        }, 600);
    }

    return (
        <div className="min-h-screen h-auto bg-gradient-to-br from-sky-700 to-blue-900 flex flex-col items-center py-10 px-2">
            <h1 className="font-bold text-4xl text-white mb-8 tracking-tight drop-shadow-lg">Search People</h1>
            <form className="w-full max-w-xl bg-white/90 rounded-xl shadow-lg p-6 mb-8 flex flex-col gap-4">
                <label htmlFor="aad" className="text-lg font-medium text-gray-700 mb-1">Search by</label>
                <div className="flex gap-2">
                    <select
                        id="type"
                        name="type"
                        value={searchType}
                        onChange={handleTypeChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 min-w-[120px]"
                    >
                        <option value="name">Name</option>
                        <option value="number">Number</option>
                    </select>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="aad"
                            name="key"
                            value={searchKey}
                            onChange={handleInputChange}
                            className="p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 pr-12"
                            placeholder={`Enter ${searchType === "name" ? "name" : "complete mobile number"}...`}
                            autoComplete="off"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </form>
            <div className="w-full max-w-3xl flex justify-center">
                {loading ? (
                    <div className="text-center text-xl p-8 text-gray-200 animate-pulse">Searching...</div>
                ) : searchresult.length === 0 ? (
                    <div className="text-center text-2xl p-8 text-gray-100">No Results Found</div>
                ) : (
                    <Condition results={searchresult} />
                )}
            </div>
        </div>
    );
}

interface ConditionProps {
    results: SearchResultItem[];
}

function Condition({ results }: ConditionProps) {
    const [flag, setFlag] = useState(true);
    const [value, setValue] = useState<SearchResultItem | null>(null);
    useEffect(() => {
        setFlag(true);
    }, [results]);
    return flag ? (
        <SearchResults results={results} onSelect={setValue} onPay={setFlag} />
    ) : (
        value && <Paym value={value} />
    );
}

interface PaymProps {
    value: SearchResultItem;
}

function Paym({ value }: PaymProps) {
    const setvalue = useSetRecoilState(payment);
    const nav = useNavigate();
    const [amount, setAmount] = useState("");

    function pay() {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
        const data = {
            id: value._id,
            name: value.name,
            amount,
        };
        setvalue(data);
        nav("/payment");
    }

    return (
        <div className="w-full max-w-md flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-8 gap-6">
            <div className="flex flex-col items-center gap-2">
                <div className="text-2xl font-semibold text-gray-800">Send money to {value.name}</div>
                <div className="flex items-center text-slate-500 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <span className="ml-2">{value.number}</span>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="ggu" className="text-lg font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    id="ggu"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter amount"
                    min="1"
                />
                <button
                    onClick={pay}
                    type="button"
                    className="mt-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                    disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
                >
                    Send Money
                </button>
            </div>
        </div>
    );
}

interface SearchResultsProps {
    results: SearchResultItem[];
    onSelect: (item: SearchResultItem) => void;
    onPay: (flag: boolean) => void;
}

function SearchResults({ results, onSelect, onPay }: SearchResultsProps) {
    function handlePay(item: SearchResultItem) {
        onSelect(item);
        onPay(false);
    }
    return (
        <div className="w-full bg-white/90 rounded-xl shadow-lg p-4 flex flex-col gap-3">
            {results.map((item) => (
                <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b last:border-b-0 border-blue-200 px-3 py-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-semibold text-gray-800">{item.name}</span>
                        <span className="flex items-center text-slate-500 text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <span className="ml-2">{item.number}</span>
                        </span>
                    </div>
                    <button
                        onClick={() => handlePay(item)}
                        type="button"
                        className="w-fit h-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                    >
                        Send Money
                    </button>
                </div>
            ))}
        </div>
    );
}
