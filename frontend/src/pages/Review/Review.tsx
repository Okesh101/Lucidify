import { useEffect, useState } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface DetailsProp {
  title: string;
  desc: string;
}

type Page = "review" | "download";

function Details({ title, desc }: DetailsProp) {
  return (
    <div className="grid grid-cols-2 gap-10 items-center">
      <h1 className="font-[Nunito] text-lg md:text-xl text-gray-800">{title}</h1>

      <span className="font-[Onest] text-sm md:text-lg text-gray-700">{desc}</span>
    </div>
  );
}

const Review = () => {
  
  const navigate = useNavigate();
  function navigateBack() {
    navigate(`/registration`);
  }

  const regNumber = sessionStorage.getItem("regNumber")

  const [currentPage, setCurrentPage] = useState<Page>("review");
  
  const handleGeneratePdf = async() => {
    try {
      const res = await fetch("/api/v1/generate-pdf",{
        method: "POST",
        credentials: 'include'
      })
      // const data = await res.json()
      // console.log(data)
      setCurrentPage("download")
    } catch (error) {
      if(error instanceof Error){
        toast("There was an error trying to generate your pdf. Please try again later", {
          style: {
              backgroundColor: "red",
            boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "10px",
            fontFamily: "DMMono",
          },
        });
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-4">
        <CurrentTabNumber />
        <main className="pt-10">
          <h1
            className={`text-4xl text-center font-[Nunito] font-semibold text-gray-900 ${currentPage === "download" ? "flex flex-col items-center gap-2" : ""}`}
          >
            {currentPage === "review" ? (
              "Review Your Annual Return"
            ) : (
              <>
                <span className="bg-green-700 p-3 rounded-full">
                  <FiCheck size={80} color="white" />
                </span>
                <span>Your Annual Return is Ready!</span>
              </>
            )}
          </h1>
          <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
            {currentPage === "review"
              ? "Please review all information before generating your PDF."
              : "Your BN/06 annual return has been generated successfully"}
          </p>

          <div className="max-w-3xl mx-auto ">
            {currentPage === "review" ? (
              <div className=" gap-10 flex flex-col md:flex-row items-start justify-between mt-12">
                <div className="space-y-4 w-full">
                  <section className="space-y-5 bg-white shadow-sm p-4 rounded-xl">
                    <header className="flex items-center justify-between">
                      <h1 className="text-xl tracking-wide font-bold font-[ClashDisplay]">
                        Company Information
                      </h1>
                      <p>Edit</p>
                    </header>
                    <div className=" space-y-3">
                      <Details title="Company Name" desc="Your company name" />
                      <Details title="BN Number" desc={`Your ${regNumber?.startsWith("BN") ? "BN": "RC"} Number`} />
                      <Details title="Company Type" desc="Your Company Type" />
                      <Details
                        title="Registration Date"
                        desc="Date of registration"
                      />
                      <Details title="status" desc="Active" />
                      <Details
                        title="Registration Address"
                        desc="Your Registration address"
                      />
                    </div>
                  </section>

                  <section className="space-y-5 bg-white shadow-sm p-4 rounded-xl">
                    <header className="flex items-center justify-between">
                      <h1 className="text-xl tracking-wide font-bold font-[ClashDisplay]">
                        Return Summary
                      </h1>
                      <p>Edit</p>
                    </header>
                    <div className=" space-y-3">
                      <Details title="AGM Held" desc="Yes(Feb 2026)" />
                      <Details title="Address Changed" desc="No" />
                      <Details title="Directors Changed" desc="No" />
                      <Details title="Share Issued" desc="No" />
                      <Details title="Other Changes" desc="No" />
                    </div>
                  </section>
                </div>

                <section className="space-y-5 md:max-w-55 w-full bg-white shadow-sm p-4 rounded-xl">
                  <h1 className="text-xl tracking-wide font-bold font-[ClashDisplay]">
                    Validation Status
                  </h1>
                  <div className=" space-y-3">
                    <h1 className="flex items-center text-green-600 gap-1">
                      <FiCheck size={20} /> Verified with CAC
                    </h1>
                    <p>No discrepancies found</p>
                    <p>All required fields completed</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-8">
                <div className=" rounded-full p-4 bg-white shadow-sm">
                    {/* <PiFilePdfDuotone size={200} color="white"/> */}
                    <img src="./pdf.png" alt="pdf image " className="w-35 " />
                </div>
                <div className="mt-7 flex flex-col gap-3 ">
                  <button
                    type="button"
                    className="outline outline-gray-500 rounded-sm px-4 py-2 cursor-pointer font-[Nunito] font-semibold"
                    onClick={navigateBack}
                  >
                    Start Another Return
                  </button>

                  <button className="bg-green-600 text-white gap-2 justify-center rounded-sm px-4 py-2 cursor-pointer font-[Nunito] font-semibold">
                    Download PDF
                  </button>
                </div>
              </div>
            )}
            {currentPage === "review" && (
              <div className="mt-7 flex justify-between w-full items-center">
                <button
                  type="button"
                  className="flex gap-2 items-center outline outline-gray-500 rounded-sm px-4 py-1 cursor-pointer font-[Nunito] font-semibold"
                  onClick={() => navigate(`/question`)}
                >
                  <span>&larr;</span>
                  Back
                </button>

                <button className="bg-green-600 text-white  flex gap-2 items-center rounded-sm px-4 py-2 cursor-pointer font-[Nunito] font-semibold" onClick={handleGeneratePdf}>
                  Generate PDF <span>&rarr;</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Review;
