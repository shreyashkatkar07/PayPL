import { useRecoilState, useRecoilValue } from "recoil";
import { userinfo } from "../../recoil/atom";
import uid from "../../assets/uid.svg";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { baseurl } from "../../recoil/atom";

export default function Leftcomp() {
    const [user, setUser] = useRecoilState(userinfo);
    const url = useRecoilValue(baseurl);
    const nav = useNavigate();
    const [loading, setLoading] = React.useState(false);

    // Refresh balance logic similar to rightcomp
    const refreshBalance = () => {
        setLoading(true);
        axios.post(url + "/user", { id: user._id }, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then((res) => {
                console.log("Refresh response:", res.data);
                if (res.data && res.data.resp) {
                    setUser({ ...res.data.resp }); // force new object reference
                }
            })
            .catch((err) => { console.log("Refresh error:", err); })
            .finally(() => setLoading(false));
    };

    return (
        <div className="sm:w-1/3 h-auto sm:mb-8">
            <div className="h-full p-6 m-4 bg-white rounded-2xl shadow-2xl flex flex-col gap-6">
                <div className="bg-cyan-100 rounded-xl py-6 flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-5xl font-extrabold text-cyan-700">₹ {user.balance ?? 0}</div>
                        <div className="text-xl font-bold text-cyan-900">Account Balance</div>
                        <button type="button" onClick={refreshBalance} disabled={loading} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-base px-4 py-2 flex items-center gap-2 disabled:opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            {loading ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                    <button type="button" onClick={() => { nav("/wallet") }} className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-base px-6 py-2.5">Add Money</button>
                </div>
                <div className="pt-2">
                    <span className="bg-blue-100 text-blue-800 text-xl font-semibold px-3 py-1 rounded dark:bg-blue-900 dark:text-blue-300">Account Details</span>
                    <div className="pt-4 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <div className="bg-blue-100 text-blue-800 text-base font-medium px-3 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{user.email ?? ""}</div>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <div className="bg-blue-100 text-blue-800 text-base font-medium px-3 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{user.number ?? ""}</div>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                        <img src={uid} alt="UID" className="w-7 h-7" />
                        <div className="bg-blue-100 text-blue-800 text-base font-medium px-3 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{user.uid ?? ""}</div>
                    </div>
                    {/* <button type="button" className="mt-6 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-base px-6 py-2.5">Update Details</button> */}
                    <div className="mt-6">
                        <div className="grid gap-3 mt-2">
                            <div className="flex items-center gap-3 bg-green-50 border-l-4 border-green-400 rounded-lg px-4 py-2">
                                <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span className="font-medium text-green-800">Pay and receive by UPI Id and Number</span>
                            </div>
                            <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg px-4 py-2">
                                <svg className="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span className="font-medium text-blue-800">No setup or hidden fees</span>
                            </div>
                            <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-400 rounded-lg px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-700">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium text-red-700">Never Share Your Password</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}