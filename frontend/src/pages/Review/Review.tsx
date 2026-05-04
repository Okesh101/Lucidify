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
interface AgmProp {
  date: string;
  held: boolean;
}
interface ReviewProps {
  company_name: string;
  directors_changed: boolean;
  new_registered_address: string;
  new_share_capital: string;
  rc_number: string;
  registered_address_changed: boolean;
  share_capital_changed: boolean;
  shareholders_changed: boolean;
  small_company: boolean;
  agm_details: AgmProp;
}

function Details({ title, desc }: DetailsProp) {
  return (
    <div className="grid grid-cols-2 gap-10 items-center">
      <h1 className="font-[Nunito] text-lg md:text-xl text-gray-800">
        {title}
      </h1>

      <span className="font-[Onest] text-sm md:text-lg text-gray-700">
        {desc}
      </span>
    </div>
  );
}

const Review = () => {
  const [reviewData, setReviewData] = useState<ReviewProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function navigateBack() {
    navigate(`/registration`);
  }

  const regNumber = sessionStorage.getItem("regNumber");

  const [currentPage, setCurrentPage] = useState<Page>("review");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      const res = await fetch(`/api/v1/review?type=${regNumber?.startsWith('BN') ? "business_name" : "ltd_company"}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setReviewData(data);
      console.log(data);
    };

    fetchReviewData();
  }, []);
  // console.log("This is review data: ", reviewData)

  function base64ToBlob(base64: string) {
  const base64Data = base64.includes(",")
    ? base64.split(",")[1]
    : base64;

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([new Uint8Array(byteNumbers)], {
    type: "application/pdf",
  });
}
 
  const handleGeneratePdf = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/v1/generate-pdf`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          data: reviewData,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to generate PDF");
      }

      const contentType = res.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        const data = await res.json();

        const base64 = data.pdf;

        const blob = base64ToBlob(base64);
        const url = URL.createObjectURL(blob);

        setPdfBlob(blob);
        setPdfUrl(url);

        console.log("PDF ready (base64)", url);
      } else {
        // if backend returns RAW PDF
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        setPdfBlob(blob);
        setPdfUrl(url);

        console.log("PDF ready (blob)", url);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(
          "There was an error trying to generate your pdf. Please try again later",
          {
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleDownload = () => {
    if (!pdfBlob) return;

    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "my-file.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <div className="min-h-screen bg-gray-50 relative">
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
              : `Your ${regNumber?.startsWith("BN") ? 'BN' : "RC"} annual return has been generated successfully`}
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
                      <Details
                        title={`Your ${regNumber?.startsWith("BN") ? "BN" : "RC"} Number`}
                        desc={`Your ${regNumber?.startsWith("BN") ? "BN" : "RC"} Number`}
                      />
                      <Details title="Company Type" desc={`${regNumber?.startsWith("BN") ? "Mini Business" : "Ltd Company"}`}/>
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
                      {/* <Details
                        title="AGM Held"
                        desc={
                          reviewData?.agm_details.held === false
                            ? "No"
                            : reviewData?.agm_details.date
                        }
                      />
                      <Details
                        title="Address Changed"
                        desc={
                          reviewData?.registered_address_changed === false
                            ? "No"
                            : "Yes"
                        }
                      /> */}
                      {/* <Details
                        title="Directors Changed"
                        desc={
                          reviewData?.directors_changed === false ? "No" : "Yes"
                        }
                      />
                      <Details
                        title="Share Capital Changed"
                        desc={
                          reviewData?.shareholders_changed === false
                            ? "No"
                            : "Yes"
                        }
                      />
                      <Details
                        title="Share Issued"
                        desc={
                          reviewData?.shareholders_changed === false
                            ? "No"
                            : "Yes"
                        }
                      />
                      <Details
                        title="Is your company a small company"
                        desc={
                          reviewData?.shareholders_changed === false
                            ? "No"
                            : "Yes"
                        }
                      /> */}
                      {/* <Details title="Share Issued" desc={reviewData?.shareholders_changed === false ? "No" : "Yes"} /> */}
                      {/* <Details title="Other Changes" desc="No" /> */}
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

                  <button className="bg-green-600 text-white gap-2 justify-center rounded-sm px-4 py-2 cursor-pointer font-[Nunito] font-semibold" onClick={handleDownload}>
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

                <button
                  className="bg-green-600 text-white  flex gap-2 items-center rounded-sm px-4 py-2 cursor-pointer font-[Nunito] font-semibold"
                  onClick={handleGeneratePdf}
                >
                  Generate PDF <span>&rarr;</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
       {isLoading && (
        <div className="fixed top-0  bg-[#000000bb] bottom-0 right-0 left-0 flex flex-col items-center justify-center">
          <div className="animate-[spin_2s_linear_infinite] rounded-full h-10 w-10 ">
            <div className="bg-green-700 animate-bounce w-9 h-9"></div>
          </div>
          <p className="font-[Onest] text-xl text-white mt-6">
            Please wait, while you data is processing.
          </p>
        </div>
      )}
    </div>
  );
};

export default Review;
