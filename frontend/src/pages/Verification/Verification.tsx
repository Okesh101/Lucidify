import { useEffect, useState } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import { NavigateBack, NavigateNext } from "../../components/NavigateItem";
import toast from "react-hot-toast";
interface DetailsProp {
  title: string;
  desc: string;
}

interface BVerificationProps { // For business
  bn_number: string;
  business_name: string;
  business_nature: string;
  registered_address: string;
  status: string;
}

interface CVerificationProps { // For company
  rc_number: string;
  company_name: string;
  company_type: string;
  registered_address: string;
  registration_date: string;
  status: string;
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

 const [verificationBData, setVerificationBData] =
   useState<BVerificationProps | null>(null);
 const [verificationCData, setVerificationCData] =
   useState<CVerificationProps | null>(null);
  const regNumber = sessionStorage.getItem("regNumber")
  const business = regNumber?.includes("BN");
  useEffect(() => {
    const fetchCompanyDetails = async() => {
      try {
        const res = await fetch(`/api/v1/verify-registration?regNumber=${regNumber}`,{
          method: "GET",
          credentials: 'include'
        })
        const data = await res.json()
        const dataType = data.entity_type === "business_name";
        if (dataType) {
          setVerificationBData(data.data)
        } else {
          setVerificationCData(data.data)
        }
        
        // console.log(data.data)
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
  }, [regNumber])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-2 md:px-4">
        <CurrentTabNumber />

        <main className="pt-10">
          <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
            Let's verify your {business ? "business" : "company"}
          </h1>
          <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
            We found this {business ? "business" : "company"} with{" "}
            {business
              ? verificationBData?.bn_number
              : verificationCData?.rc_number}
            .
          </p>
          <div className="max-w-3xl mx-auto mt-12">
            {business ? (
              <section className=" space-y-3">
                <Details
                  title={business ? "Business Name" : "Company Name"}
                  desc={verificationBData?.business_name || "Loading..."}
                />
                <Details
                  title={business ? "BN Number" : "RC Number"}
                  desc={verificationBData?.bn_number || "Loading..."}
                />
                <Details
                  title={business ? "Business Nature" : "Company Type"}
                  desc={verificationBData?.business_nature || "Loading..."}
                />
                {/* This was commented out because there is no data from the backend recognized as registration date */}
                {/* <Details
                  title="Registration Date"
                  desc={verificationBData?.registered_address || "Loading..."}
                /> */}
                <Details
                  title="Status"
                  desc={verificationBData?.status || "Loading..."}
                />
                <Details
                  title="Registration Address"
                  desc={verificationBData?.registered_address || "Loading..."}
                />
              </section>
            ) : (
              <section className=" space-y-3">
                <Details
                  title={business ? "Business Name" : "Company Name"}
                  desc={verificationCData?.company_name || "Loading..."}
                />
                <Details
                  title={business ? "BN Number" : "RC Number"}
                  desc={verificationCData?.rc_number || "Loading..."}
                />
                <Details
                  title={business ? "Business Nature" : "Company Type"}
                  desc={verificationCData?.company_type || "Loading..."}
                />
                <Details
                  title="Registration Date"
                  desc={verificationCData?.registration_date || "Loading..."}
                />
                <Details
                  title="Status"
                  desc={verificationCData?.status || "Loading..."}
                />
                <Details
                  title="Registration Address"
                  desc={verificationCData?.registered_address || "Loading..."}
                />
              </section>
            )}

            <div className="mt-7 flex justify-between items-center">
              <NavigateBack pathname="registration" />
              <NavigateNext pathname="question" />
            </div>

            <div className="flex flex-col text-center mt-10 bg-gray-300 rounded-lg space-y-0.5 p-2 font-[Onest]">
              <span className="underline text-red-800 cursor-pointer">
                Not my {business ? "Business" : "Company"}
              </span>
              <span>Can't find your {business ? "business" : "company"}?</span>
              <span>
                Check your {business ? "BN" : "RC"} number and try again.
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
