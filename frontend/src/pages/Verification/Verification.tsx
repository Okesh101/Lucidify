import { useEffect } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import { NavigateBack, NavigateNext } from "../../components/NavigateItem";
import toast from "react-hot-toast";
interface DetailsProp {
  title: string;
  desc: string;
}

function Details({ title, desc }: DetailsProp) {
  return (
    <div className="grid grid-cols-2 gap-10 md:gap-40 items-center ">
      <h1 className="font-[Nunito] text-lg md:text-xl text-gray-800">{title}</h1>

      <span className="font-[Onest] text-sm md:text-lg text-gray-700">{desc}</span>
    </div>
  );
}

export default function Verification() {

  useEffect(() => {
    const fetchCompanyDetails = async() => {
      try {
        const res = await fetch("/api/v1/verify-registration",{
          method: "GET",
          credentials: 'include'
        })
        console.log(res)
      } catch (error) {
        if (error instanceof Error) {
          toast("Failed to retrive your data. Please try again later.", {
            style: {
              backgroundColor: "red",
              boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "10px",
              fontFamily: "DMMono",
            },
           })
        }
      }
    }
    fetchCompanyDetails()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-2 md:px-4">
        <CurrentTabNumber />

        <main className="pt-10">
          <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
            Let's verify your company
          </h1>

          <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
            We found this company with RC: "number".
          </p>
          <div className="max-w-3xl mx-auto mt-12">
            <section className=" space-y-3">
              <Details title="Company Name" desc="Your company name" />
              <Details title="BN Number" desc="Your BN Number" />
              <Details title="Company Type" desc="Your Company Type" />
              <Details title="Registration Date" desc="Date of registration" />
              <Details title="status" desc="Active" />
              <Details
                title="Registration Address"
                desc="Your Registration address"
              />
            </section>

            <div className="mt-7 flex justify-between items-center">
              <NavigateBack pathname="registration" />
              <NavigateNext pathname="question" />
            </div>

            <div className="flex flex-col text-center mt-10 bg-gray-300 rounded-lg space-y-0.5 p-2 font-[Onest]">
              <span className="underline text-red-800 cursor-pointer">
                Not my Company
              </span>
              <span>Can't find your company?</span>
              <span>Check your BN number and try again.</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
