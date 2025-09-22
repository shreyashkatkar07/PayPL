import { useRecoilValue } from "recoil";
import Leftcomp from "./leftcomp";
import Middlecomp from "./middlecomp";
import Rightcomp from "./rightcomp";
import { userinfo } from "../../recoil/atom";

export default function Home() {

    const user: any = useRecoilValue(userinfo);
    const firstName = user.name.split(" ")[0];
    const date = new Date();

    return (
        <div className="min-h-screen bg-sky-700 flex flex-col">
            <header className="flex flex-col items-center justify-center py-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Welcome back, {firstName}</h1>
                <h2 className="text-xl sm:text-2xl font-medium text-blue-100 text-center">{date.toDateString()}</h2>
            </header>
            <main className="flex flex-col md:flex-row items-stretch justify-center gap-8 px-4 pb-12 flex-1">
                <Leftcomp />
                <Middlecomp />
                <Rightcomp />
            </main>
        </div>
    );
}