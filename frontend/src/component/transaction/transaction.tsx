import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { baseurl, userinfo } from "../../recoil/atom";
import axios from "axios";
import moment from "moment-timezone";

export default function Transaction(){

    const [transc,setTransc]:any = useState([]);
    const url = useRecoilValue(baseurl);
    const user:any = useRecoilValue(userinfo);

    const f = ()=>{
        if(transc.length === 0){
            const h = sessionStorage.getItem("token");
        axios.post(url + "/transaction/get", { _id:user._id }, { headers: { Authorization: h } })
        .then((res)=>{
            setTransc(res.data.resp);
        }).catch((err)=>{
            console.log(err.response.data.error);
        })}}
    
   useEffect(f,[]);

    return (
        <div className="min-h-screen w-full bg-sky-700 flex flex-col items-center py-8 px-2 overflow-auto">
            <div className="w-full max-w-5xl mx-auto">
                <h1 className="font-bold text-4xl sm:text-5xl text-white mb-8 drop-shadow-lg text-center">Transaction History</h1>
                <div className="flex justify-center w-full">
                    {transc.length === 0 ? (
                        <div className="bg-white/80 rounded-xl shadow-lg p-10 text-center text-2xl text-gray-700 font-semibold animate-fade-in">
                            <svg className="mx-auto mb-4" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#3b82f6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            No Transactions Yet
                        </div>
                    ) : (
                        <TransactionHistory transc={transc} />
                    )}
                </div>
            </div>
        </div>
    );
}

function TransactionHistory(props:any){

    const user:any = useRecoilValue(userinfo);

    function convertUTCDateToIST(date: Date) {
        return moment(date).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm:ss A');
    }

    return (
        <div className="bg-blue-100/60 w-full max-w-5xl mx-auto rounded-2xl shadow-2xl p-2 sm:p-8 animate-fade-in">
            <table className="w-full text-left border-separate" style={{ borderSpacing: "0 1.5rem" }}>
                <thead>
                    <tr className="text-2xl font-bold text-blue-900">
                        <th className="px-8 py-4 border-r border-gray-300">Transaction ID</th>
                        <th className="px-8 py-4 border-r border-gray-300">Sender & Receiver</th>
                        <th className="px-8 py-4 border-r border-gray-300">Amount</th>
                        <th className="px-8 py-4">Date & Time (IST)</th>
                    </tr>
                    <tr>
                        <td colSpan={4} className="border-b border-gray-300"></td>
                    </tr>
                </thead>
                <tbody>
                    {props.transc.map((item:any, idx:number) => (
                        <tr key={item.id + idx} className="rounded-2xl bg-white/80 shadow-sm transition-all duration-200 hover:bg-blue-50">
                            <td className="px-8 py-6 border-r border-gray-300">
                                <span className="bg-blue-200 text-blue-800 text-xl font-semibold px-7 py-3 rounded-full shadow inline-block">{item.id}</span>
                            </td>
                            <td className="px-8 py-6 border-r border-gray-300">
                                <span className="font-medium text-lg text-gray-900">
                                    {(item.sender === user._id) ? "You" : item.senderName}
                                </span>
                                <span className="inline-block mx-2 align-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2563eb" className="inline w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                                <span className="font-medium text-lg text-gray-900">
                                    {(item.receiver === user._id) ? "You" : item.receiverName}
                                </span>
                            </td>
                            <td className="px-8 py-6 border-r border-gray-300">
                                <span className={((item.sender === user._id) ? "text-red-600" : "text-green-600") + " text-xl font-bold"}>
                                    {(item.sender === user._id) ? "-" : "+"} ₹ {item.amount}
                                </span>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-xl font-medium text-gray-800">
                                    {convertUTCDateToIST(item.date)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}