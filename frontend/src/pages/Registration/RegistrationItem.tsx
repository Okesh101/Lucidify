import {useState, useEffect} from 'react'
import InputItem from '../../components/InputItem'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'


interface CardProps{
    type: string,
    title: string,
    desc: string,
    icon: React.ReactNode,
    selectedCard: string,
    setSelectedCard: (type:string) => void
}
export default function RegistrationItem({type, title, desc, icon, selectedCard, setSelectedCard}: CardProps) {
    const[bnNumber, setBnNumber] = useState<string>("")
    const [error, setError] = useState<string>("")

    const isActive = selectedCard === type 

    useEffect(() => {
        if (!isActive) {
            setError("")
        }
    }, [isActive])

    const handleNext = async() => {
        if(!bnNumber) {
            setError("This Field is Required")
        }
        try {
            const res = await fetch("/api/v1/verify-registration", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({"BN_Number": bnNumber})
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            if(error instanceof Error){
                toast("Failed to verify registration. Please try again later.", {
                     style: {
                backgroundColor: "red",
                boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "10px",
                fontFamily: "DMMono",
                // letterSpacing: 0.8
              },
                })
                console.log(error.message)
            }
        }
        // /api/v1/verify-registration
    }
    
    return(
        <motion.div 
            className={` rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer group overflow-hidden relative 
                ${selectedCard === (type) ? "bg-green-200" : "bg-white"}`} 
                onClick={() => {setSelectedCard(type)}}
                animate={{y: 0, opacity: 1}}
                initial={{y:50, opacity: 0}}
                transition={{type: "spring", bounceStiffness: 100}}
            >

            <div className='p-6 text-center'>
                <input type="radio" name="card" className="absolute top-4 right-6 w-5 h-5" checked={selectedCard === (type)} onChange={() => setSelectedCard(type)} />
                <section className="pt-5">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mx-auto mb-4 group-hover:scale-110 transition">
                        {icon}
                    </div>

                    <h2 className="text-xl font-semibold font-[Onest] text-gray-900">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 font-[Onest] mt-2">
                        {desc}
                    </p>
                </section>
            </div>
            {isActive && (
                <motion.div 
                    className='flex flex-col items-end pb-2'
                    animate={{y:0, opacity: 1}}
                    initial={{y:30, opacity: 0}}
                    transition={{duration: 0.5}}    
                >
                    <InputItem 
                        name='rc_number' 
                        type='text' 
                        placeholder='Please input a valid BN Number' 
                        title='BN Number' 
                        errorMssg={error}
                        value={bnNumber}
                        handleChange={(e:React.ChangeEvent<HTMLInputElement>) => setBnNumber(e.target.value)}
                        fieldsetStyle="bg-white p-4 w-full"
                        labelStyle="w-40 text-gray-600"
                    />
                    <div className='flex bg-green-900 mt-3 mr-8 px-7 py-1.5 rounded-lg cursor-pointer' onClick={handleNext}>
                        <button className='text-white font-[Nunito] cursor-pointer'>
                            Next
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
)
}
