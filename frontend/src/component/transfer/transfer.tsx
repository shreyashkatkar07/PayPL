import { useState } from "react";
import Send from "./send";
import { useSetRecoilState } from "recoil";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navatom } from "../../recoil/atom";

export default function Transfer(){
    const set = useSetRecoilState(navatom);
    set(4);

    const location = useLocation();
    const navigate = useNavigate();
    // Determine flag from route
    const [flag, setFlag] = useState(location.pathname.includes("request"));

    // Sync flag with route changes
    React.useEffect(() => {
        setFlag(location.pathname.includes("request"));
    }, [location.pathname]);

    // Handlers for tab click
    const handleSendClick = () => {
        navigate("/transfer/send");
    };
    const handleRequestClick = () => {
        navigate("/transfer/request");
    };

    return (
        <div className="pl-2 pr-2 sm:pl-14 sm:pr-14 pb-1 pt-8 bg-sky-700 h-full sm:h-screen">
            <div className="font-bold text-white text-4xl mb-6">Transfer</div>
            <div className="flex justify-around h-20 pb-2 text-white">
                <div onClick={handleSendClick} className={(!flag ? "bg-cyan-300 rounded-lg shadow-md " : " ") + " w-full flex flex-col items-center justify-center font-semibold text-xl hover:text-2xl transition-all cursor-pointer "}>
                    <div>Send Money</div>
                </div>
                <div onClick={handleRequestClick} className={(flag ? "bg-cyan-300 rounded-lg shadow-md " : " ") + " w-full flex flex-col items-center justify-center font-semibold text-xl hover:text-2xl transition-all cursor-pointer "}>
                    <div>Request Money</div>
                </div>
            </div>
            <Send text={!flag ? "Send" : "Request"} flag={flag} />
        </div>
    );
}

