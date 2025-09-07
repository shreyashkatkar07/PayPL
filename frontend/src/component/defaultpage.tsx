import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, logined, userinfo } from "../recoil/atom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navtop from './Naviagtion/navtop';

import ph1 from "../assets/ph1.png"
import ph2 from "../assets/ph2.png"
import ph3 from "../assets/ph3.png"
import './styles.css';
import Footr from "./footr/footr.tsx"



export default function defaultpage(){
    return (
      <div className="bg-bg1 bg-center bg-no-repeat min-h-screen flex flex-col">
        <Navtop />
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-b from-blue-900/80 to-transparent">
          <h1 className="text-white text-4xl sm:text-5xl font-bold text-center mb-2 drop-shadow-lg">Create Your Account With Zero Charges!</h1>
          <p className="text-blue-100 text-lg text-center max-w-xl mb-4">Sign up to PayPL and experience seamless payments, loans, and wallet management—all in one place.</p>
        </section>
        {/* Main Content */}
        <main className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 px-4 py-4 flex-1">
          {/* Login Card */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <LoginBox />
          </div>
          {/* Right Box */}
          <div className="w-full max-w-lg mx-auto md:mx-0 flex justify-center">
            <RightBox />
          </div>
        </main>
        <Footr />
      </div>
    );
}

function LoginBox(){

    const navigate = useNavigate()

    const url = useRecoilValue(baseurl);

    const setuser = useSetRecoilState(userinfo);

    const setLogined = useSetRecoilState(logined);

    const [message,setMessage] = useState("");

    const [isloading,setloading] = useState(true);

    function login(fromdata: any){
        setloading(false);
        fromdata.preventDefault();
        const data = {
            email:fromdata.target.email.value,
            password:fromdata.target.password.value,
        }
        axios.post(url + "/auth/login",data)
        .then((res)=>{
            sessionStorage.setItem("token", res.data.token);
            setuser(res.data.resp);
            setLogined(true);
            navigate("/home")
        }).catch((err)=>{
            setMessage(err.response.data.error);
            setloading(true);
        })
    }
    
    return (
      <div className="w-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-6">
        <form className="flex flex-col gap-6" onSubmit={login}>
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign in to our platform</h5>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            <label htmlFor="remember" className="text-base font-medium text-gray-900 dark:text-gray-300">I agree to Terms and Conditions</label>
          </div>
          <Buton isloading={isloading} />
          {message && (
            <div className="self-center text-red-600 text-sm font-medium">{message}</div>
          )}
          <div className="text-base font-medium text-gray-500 dark:text-gray-300 text-center">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => { navigate("/register") }}>Create an account</a>
          </div>
        </form>
      </div>
    );
}

function Buton({isloading}: {isloading: boolean}){
     

    return <button type="submit" className=" flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isloading ? <span className="px-2.5 py-2.5">Login to your account</span> : 
        <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        }
        </button>
}


function RightBox() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Loop through 3 boxes
      }, 2000);
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
  
    return (
      <div className="container flex justify-center items-center sm:h-screen h-64 relative">
        <div className="flex justify-center items-center w-full h-full relative">
          {/* Box 1 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 0
              ? 'z-10 absolute top-1/2 left-1/2  translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 scale-200 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 ' }`}
          >
            <img src={ph1} alt="" />
          </div>
  
          {/* Box 2 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 1
              ? 'z-20 absolute top-1/2 left-1/2  translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 scale-200 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 '}`} 
          >
            <img src={ph2} alt="" />
          </div>
  
          {/* Box 3 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 2
              ? 'z-20 absolute top-1/2 left-1/2 translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 '}`} 
          >
            <img src={ph3} alt="" />
          </div>
        </div>
      </div>
    );
  }