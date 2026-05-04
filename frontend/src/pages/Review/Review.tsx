import { useEffect, useState } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface DetailsProp {
  title: string;
  desc: string | boolean;
}

type Page = "review" | "download";
interface ReviewProps {
  // MIni Business props
  business_name: string;
  nature_of_business: string;
  registered_address: string;
  business_type: string;


  // ltd_company props

  company_name: string;
  company_type: string,
  financial_address: string,
  // rc_number: string,
  directors_changed: boolean,
  new_registered_address: string,
  new_share_capital: string,
  small_company: boolean,
  shareholders_changed: boolean
}
interface BusinessLocation{
  postal_code: string,
  lga: string
}

function Details({ title, desc }: DetailsProp) {
  return (
    <div className="flex justify-between gap-20 w-full md:grid md:grid-cols-2 md:gap-10">
      <h1 className="font-[Nunito] text-lg md:text-xl text-gray-800 text-start">
        {title}
      </h1>

      <span className="font-[Onest] text-sm md:text-lg text-gray-700 text-end md:text-left">
        {desc}
      </span>
    </div>
  );
}

const Review = () => {
  const [companyInfo, setCompanyInfo] = useState<ReviewProps | null>(null);
  const [reviewSummary, setReviewSummary] = useState<ReviewProps | null>(null);
  const [businessLocation, setBusinessLocation] = useState<BusinessLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function navigateBack() {
    navigate(`/registration`);
  }

  const regNumber = sessionStorage.getItem("regNumber");

  const [currentPage, setCurrentPage] = useState<Page>("review");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // const entityType = regNumber?.startsWith("BN") ? "ltd_company" : "business_name"
  useEffect(() => {
    const fetchReviewData = async () => {
      const res = await fetch(`/api/v1/review?type=${regNumber?.startsWith('BN') ? "business_name" : "ltd_company"}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setCompanyInfo(data.entity_type === "ltd_company" ? data.data.company_info : data.data.business_info);
      setReviewSummary(data.data.return_summary)
      setBusinessLocation(data.data.return_summary.principal_place_of_business)
      console.log(data);
    };

    fetchReviewData();
  }, []);
  // console.log("This is review data: ", reviewData)

 
  const handleGeneratePdf = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/v1/generate-pdf?regNumber=${regNumber?.startsWith("BN") ? "business_name" : "ltd_company"}`, {
        credentials: "include"
      });

        // if backend returns RAW PDF
        if(res.status === 200) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);

          setPdfBlob(blob);
          setPdfUrl(url);
          setCurrentPage("download")
          console.log(blob)
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



  // const handleDownload = () => {
  //   if (!pdfUrl) return;

  //   // const url = URL.createObjectURL(pdfBlob);

  //   const link = document.createElement("a");
  //   link.href = pdfUrl;
  //   link.download = "my-file.pdf";
  //   link.click();

  //   // URL.revokeObjectURL(url);
  // };
  const handleDownload = () => {
  if (!pdfBlob) return;

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-file.pdf";
  link.click();
  
  // Revoke after a short delay to ensure download starts
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
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
                      {/* <p>Edit</p> */}
                    </header>
                    <div className=" space-y-3">
                      {/* Mini Businessess */}
                     {regNumber?.startsWith("BN") ? (
                      <>
                        <Details title="Company Name" desc={companyInfo?.business_name || "Loading..."} />
                        <Details
                          title={`Your ${regNumber?.startsWith("BN") ? "BN" : "RC"} Number`}
                          desc={regNumber || "Loading..."}
                        />
                        <Details title="Company Type" desc={companyInfo?.business_type || "Loading..."}/>
                        <Details
                          title="Registration Address"
                          desc={companyInfo?.registered_address || "Loading..."}
                        />
                      </>
                     ) : (
                      // Ltd companies
                      <>
                        <Details title="Company Name" desc={companyInfo?.company_name || "Loading..."} />
                        <Details
                          title={`Your ${regNumber?.startsWith("BN") ? "BN" : "RC"} Number`}
                          desc={regNumber || "Loading..."}
                        />
                        <Details title="Company Type" desc={companyInfo?.company_type || "Loading..."}/>
                        <Details
                          title="Registration Address"
                          desc={companyInfo?.financial_address || "Loading..."}
                        />
                      </>
                     )}
                    </div>
                  </section>

                  <section className="space-y-5 bg-white shadow-sm p-4 rounded-xl">
                    <header className="flex items-center justify-between">
                      <h1 className="text-xl tracking-wide font-bold font-[ClashDisplay]">
                        Return Summary
                      </h1>
                      {/* <p>Edit</p> */}
                    </header>
                    <div className=" space-y-3">
                      {regNumber?.startsWith("BN") ? (
                        // Mini BUsinesses
                        <>
                          <Details
                            title="Nature of Business"
                            desc={
                              reviewSummary?.nature_of_business || "Loading..."
                          }
                          />
                          <Details
                            title="Postal Code"
                            desc={
                              businessLocation?.postal_code || "Loading..."
                          }
                          />
                          <Details
                            title="Local Govt Area"
                            desc={
                              businessLocation?.lga || "Loading..."
                          }
                          />
                        </>
                      ) : (
                        <>
                        {/* Ltd companies */}
                          <Details
                            title="Was there a change of Director"
                            desc={
                              `${reviewSummary?.directors_changed === true ? "Yes" : "No" }`
                          }
                          />
                          <Details
                            title="New Registered Address"
                            desc={
                              `${reviewSummary?.new_registered_address === null ? "No" : "Yes"}`
                          }
                          />
                          <Details
                            title="New Share Capital"
                            desc={
                               `${reviewSummary?.new_share_capital === null ? "No" : "Yes"}`
                          }
                          />
                          <Details
                            title="Is your company a small company"
                            desc={
                              `${reviewSummary?.small_company === false ? "No" : 'Yes'}`
                          }
                          />
                          <Details
                            title='Was there a change of Share Holders'
                            desc={
                              `${reviewSummary?.shareholders_changed === false ? "No" : 'Yes'}`
                          }
                          />
                        </>
                      )}
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
