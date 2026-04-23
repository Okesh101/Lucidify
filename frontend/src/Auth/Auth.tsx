import { useReducer, useState } from "react";
import AuthItem from "./AuthItem";


type Mode = "login" | "signup"
type Action = {type: 'login'} | {type: 'signup'}
export default function Auth() {

    // const [activeTab, setActiveTab] = useState<"login" | 'signup'>('login')


    const [mode, dispatch] = useReducer(reducer, "login");

    function reducer(state: Mode, action: Action) {
        switch (action.type) {
            case 'signup':
                return "signup";
            case 'login': 
                return "login";
            default:
               return state;
        }
    }

  return (
    <div className="min-h-screen bg-radial from-[#0B1F3A] to-[#062a58] flex items-center justify-center px-6">
      
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl" data-aos="flip-up">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0B1F3A] font-[Nunito] ">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-1 font-[Onest]">
            {mode === 'login' ? "Login to continue your CAC filing" : "Sign Up to get Started"}
          </p>
        </div>

        {/* FORM */}
        <form className="mt-8 space-y-5">
          {/* EMAIL */}
          <AuthItem type="email" name="email" placeholder="johndoe@gmail.com" title="Email"/>
          {/* PASSWORD */}
          <AuthItem type="password" name="password" placeholder="••••••••" title="Password"/>
          <button
            type="submit"
            className="w-full bg-[#16A34A] text-white h-12 rounded-lg font-medium cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-[#16A34A] cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}