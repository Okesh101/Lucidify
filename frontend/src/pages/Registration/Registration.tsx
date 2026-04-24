import CurrentTabNumber from "../../components/CurrentTabNumber"
import {  Store } from "lucide-react"
import { VscOrganization } from "react-icons/vsc"
import RegistrationItem from "./RegistrationItem"
import { useState } from "react"


export default function Registration() {
    const [cardSelected, setCardSelected]= useState<string>('')
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-10 px-4">

            <CurrentTabNumber />

            <main className="pt-12">
                <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
                    What type of company are you filing for?
                </h1>

                <p className="text-gray-500 text-center font-[Onest] mt-3 text-lg">
                    Select the option that best describes your business.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-12">

                    <RegistrationItem 
                        type="company"
                        title="Limited Liability Company"
                        desc="Private / Public Limited. Includes companies limited by shares or guarantee."
                        icon={<VscOrganization className="text-green-700" size={40} />}
                        selectedCard={cardSelected}
                        setSelectedCard={setCardSelected}
                    />

                    <RegistrationItem 
                        type="miniBusiness"
                        title=" Small Business / Business Name"
                        desc=" Sole proprietorships and registered business names."
                        icon={<Store className="text-green-700" size={40} />}
                        selectedCard={cardSelected}
                        setSelectedCard={setCardSelected}
                    />
                </div>
            </main>
        </div>
    </div>
  )
}