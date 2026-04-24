import { useReducer, useState, } from "react";
import InputItem from "../components/InputItem";
import { motion,AnimatePresence } from "framer-motion";
import {toast} from 'react-hot-toast'


type Mode = "login" | "signup"
type Action = {type: 'login'} | {type: 'signup'}

interface formProp {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

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

  
export default function Auth() {

    const [mode, dispatch] = useReducer(reducer, "login");
   
    const [form, setForm] = useState<formProp>({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    })
    // 
    const [errors, setErrors] = useState<formProp>({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    })

    // HAndle onChnage function for input fields
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;

      setForm((prev) => ({
        ...prev, [name]: value
      }))
    }
    // function to handle validation of fields
    function Validation(name: string, isValidFlag: boolean, fieldName: string){
      let isValid = isValidFlag;
      if (!name.trim()) {
        setErrors(prev => ({ ...prev, [fieldName]: "This field is required" }));
        isValid = false;
      }
      return isValid;
    }

    // Function to hanlde submission if the condition is met
    const handleSubmit = async(tab: string) => {
      let isValid = true;
      
      if (mode === 'signup') {
        isValid = Validation(form.firstName, isValid, 'firstName');
        isValid = Validation(form.lastName, isValid, 'lastName');
      }
      
      isValid = Validation(form.email, isValid, 'email');
      isValid = Validation(form.password, isValid, 'password');
      
      if (isValid) {
        setErrors({ firstName: "", lastName: "", email: "", password: "" });
        try {
          const res = await fetch(`/api/v1/${tab}`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({"AuthDetails": form})
          })
          const data = await res.json()
          console.log(data)

          // condition rendering for the toast(notification) that shows at the top of the page
            if (data.status === "OK") {
              toast(data.message, {
                style: {
                  backgroundColor: "#fff",
                  boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  color: "#000",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontFamily: "DMMono",
                  letterSpacing: 0.8
                },
              });

              // navigate("/dashboard")
            } else{
            toast(data.message, {
                style: {
                  backgroundColor: "red",
                  boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  color: "#000",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontFamily: "DMMono",
                  letterSpacing: 0.8
                },
              });
            }

        } catch (error: unknown) {
          if(error instanceof Error){
            console.log(error.message)
            // Function showing the toast(notification) at the top of the page if an error occurs
            toast("Please try again later", {
              style: {
                backgroundColor: "#fff",
                boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                color: "#000",
                padding: "12px 16px",
                borderRadius: "10px",
                fontFamily: "DMMono",
                letterSpacing: 0.8
              },
            });
          }
        }
      }
    }

  // Function to clear all state when switching through tabs
  const switchMode = (newMode: Mode) => {
    dispatch({ type: newMode });
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }
  return (
    <div className="min-h-screen bg-radial from-[#e2dede85] to-[#cecccc8c] flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        <motion.div 
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl mt-3 mb-3"
          key={mode}
          initial={{ opacity: 0, y: 30, }}
          animate={{ opacity: 1, y: 0,}}
          exit={{ opacity: 0, y: -30, }}
          transition={{ duration: 0.56 }}
        >
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#0B1F3A] font-[Nunito] ">
              {mode === 'login' ? 'Welcome Back' : 'Welcome'}
            </h1>
            <p className="text-gray-500 mt-1 font-[Onest]">
              {mode === 'login' ? "Login to continue your CAC filing" : "Sign Up to get Started"}
            </p>
          </div>

          {/* FORM */}
          <form className="mt-8 space-y-5">
            {/* First name input field for signup page */}
            {mode === 'signup' && (
              <InputItem type="text" name="firstName" placeholder="john" title="First Name" errorMssg={errors.firstName} handleChange={handleChange} value={form.firstName}/>
            )}
            {mode === 'signup' && (
              <InputItem type="text" name="lastName" placeholder="Doe" title="Last Name" errorMssg={errors.lastName} handleChange={handleChange} value={form.lastName}/>
            )}
            {/* EMAIL */}
            <InputItem type="email" name="email" placeholder="johndoe@gmail.com" title="Email" errorMssg={errors.email} handleChange={handleChange} value={form.email}/>
            {/* PASSWORD */}
            <InputItem type="password" name="password" placeholder="••••••••" title="Password" errorMssg={errors.password} handleChange={handleChange} value={form.password}/>

            
            {mode === 'login' ? (
              <button
              type="button"
              className="w-full bg-[#16A34A] text-white h-12 rounded-lg font-medium cursor-pointer" onClick={() => handleSubmit('login')}
            >
             Login
            </button>
            ) : (
              <button
              type="button"
              className="w-full bg-[#16A34A] text-white h-12 rounded-lg font-medium cursor-pointer" onClick={() => handleSubmit('signup')}
            >
              SignUp
            </button>
            )}
            
          </form>


          {mode === 'login' ? (
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <span className="text-[#16A34A] cursor-pointer hover:underline" onClick={() => switchMode('signup')}>
                Sign up
              </span>
            </p>
          ): (
            <p className="text-center text-sm text-gray-500 mt-6">
            I have an account.{" "}
            <span className="text-[#16A34A] cursor-pointer hover:underline" onClick={() => switchMode('login')}>
              Login
            </span>
          </p>
          )}
          
        </motion.div>
      </AnimatePresence>
    </div>
  );
}