
import { useEffect, useState } from "react";

import moment from "moment-timezone";

export default function WalletTransc(props: React.PropsWithRef<any>) {

    const [n, setN] = useState(0);

    const transc = props.trx;
    useEffect(() => {
        if (transc.length === 0 && n === 0) {
            setN(1);
            props.f();
        }
    }, [transc])

    return (
        <div className="h-auto w-full max-w-3xl mx-auto">
            {transc.length === 0 ? (
                <div className="text-center text-2xl font-bold text-gray-400 py-12">No Transactions</div>
            ) : (
                <Show data={transc} />
            )}
        </div>
    );
}

function Show(prop: React.PropsWithRef<any>) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl h-full">
                <div className="hidden sm:grid grid-cols-3 w-full border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="py-3 font-bold text-lg text-center">Transaction ID</div>
                    <div className="py-3 font-bold text-lg text-center">Amount</div>
                    <div className="py-3 font-bold text-lg text-center">Date & Time</div>
                </div>
                <div className="h-96 overflow-y-scroll divide-y divide-gray-100">
                    {prop.data.map((item: any, idx: number) => (
                        <Tranx key={item.id || idx} data={item} />
                    ))}
                </div>
        </div>
    );
}

function Tranx(prop: React.PropsWithRef<any>) {

    function convertUTCDateToIST(date: Date) {
        return moment(date).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm:ss A (z)');
    }


    return (
        <div className="sm:grid sm:grid-cols-3 w-full items-center">
            <div className="p-3 text-lg text-gray-800 break-all"><span className="sm:hidden font-bold">TxiD: </span>{prop.data.id}</div>
            <div className="p-3 text-green-600 text-lg font-semibold text-center">+ ₹{prop.data.amount}</div>
            <div className="p-3 text-lg text-gray-700 text-center">{convertUTCDateToIST(new Date(prop.data.date))}</div>
        </div>
    );
}

