import uid from "../../assets/uid.svg"


export default function LeftComp(props: React.PropsWithRef<any>) {

    const user = props.user;
    const updateuser = props.updateuser;


    return (
        <div className="sm:w-1/3 w-full h-full flex justify-center items-start">
            <div className="w-full max-w-md mx-auto">
                <div className="pl-5 text-4xl font-extrabold text-white mb-2">Wallet</div>
                <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center mb-2">
                                <span className="text-cyan-600 text-7xl font-extrabold mr-2">₹</span>
                                <span className="text-cyan-600 text-6xl font-extrabold">{user.balance}</span>
                            </div>
                            <div className="bg-blue-100 text-blue-800 text-2xl font-bold px-8 py-2 rounded-full mb-4">Account Balance</div>
                            <button
                                type="button"
                                onClick={updateuser}
                                className="mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-base px-4 py-2 flex items-center gap-2 disabled:opacity-60"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                Refresh
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="bg-blue-100 text-blue-800 text-2xl font-bold px-8 py-2 rounded-full mb-4">Account Details</div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <div className="bg-blue-50 text-blue-700 text-lg font-semibold px-4 py-2 rounded-lg border border-blue-300 shadow w-full text-center">{user.email}</div>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <div className="bg-blue-50 text-blue-700 text-lg font-semibold px-4 py-2 rounded-lg border border-blue-300 shadow w-full text-center">{user.number}</div>
                            </div>
                            <div className="flex items-center">
                                <img src={uid} alt="UID" className="w-6 h-6 mr-2" />
                                <div className="bg-blue-50 text-blue-700 text-lg font-semibold px-4 py-2 rounded-lg border border-blue-300 shadow w-full text-center">{user.uid}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex justify-center pt-3">
                        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-bold rounded-xl text-xl px-8 py-3 text-center w-full max-w-xs">Reset Wallet Pin</button>
                    </div> */}
                </div>
            </div>
        </div>
    );

}