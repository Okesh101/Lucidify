import { useState, useEffect } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import RadioItem from "../../components/RadioItem";
import { NavigateBack } from "../../components/NavigateItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Mode = "business_name" | "ltd_company" | null;
interface formProp {
  miniBusiness: {
    bnNumber: string;
    proprietor_name: string;
    business_nature: string;
    new_residential_address: string;
    bnQuestion6: string;
  };
  ltd_company: {
    rcNumber: string;
    company_name: string;
    agm_date: string;
    issued_shared_capital: string;
    new_registered_address: string;
    rcQuestion1: string;
    rcQuestion3: string;
    rcQuestion4: string;
  };
}

const Question = () => {
  const regNumber = sessionStorage.getItem("regNumber");
  const [companyType, setCompanyType] = useState<Mode>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (regNumber?.startsWith("BN")) {
      setCompanyType("business_name");
    } else {
      setCompanyType("ltd_company");
    }
  }, [regNumber]);
  const [errors, setErrors] = useState<formProp>({
    miniBusiness: {
      bnNumber: "",
      proprietor_name: "",
      business_nature: "",
      new_residential_address: "",
      bnQuestion6: "",
    },
    ltd_company: {
      rcNumber: "",
      company_name: "",
      agm_date: "",
      issued_shared_capital: "",
      new_registered_address: "",
      rcQuestion1: "",
      rcQuestion3: "",
      rcQuestion4: "",
    },
  });
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<formProp>({
    miniBusiness: {
      bnNumber: "",
      proprietor_name: "",
      business_nature: "",
      new_residential_address: "",
      bnQuestion6: "",
    },
    ltd_company: {
      rcNumber: "",
      company_name: "",
      agm_date: "",
      issued_shared_capital: "",
      new_registered_address: "",
      rcQuestion1: "",
      rcQuestion3: "",
      rcQuestion4: "",
    },
  });
  const [radioSelections, setRadioSelections] = useState<{
    [key: string]: string;
  }>({
    question2: "",
    question5: "",
    question6: "",
  });

  function Validation(
    name: string,
    isValidFlag: boolean,
    fieldName: string,
    category: "miniBusiness" | "ltd_company",
  ) {
    let isValid = isValidFlag;
    if (!name.trim()) {
      setErrors((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [fieldName]: "This Field is required",
        },
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [fieldName]: "",
        },
      }));
    }
    // returning the isValid flag to be used in form submission
    return isValid;
  }

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  const handleNext = async () => {
    let isValid = true;
    if (companyType === "business_name") {
      // isValid =
      //   Validation(questionData.bnNumber, isValid, "bnNumber") && isValid;
      // isValid =
      //   Validation(questionData.proprietor_name, isValid, "proprietor_name") &&
      //   isValid;
      isValid =
        Validation(
          questionData.miniBusiness.business_nature,
          isValid,
          "business_nature",
          companyType === "business_name" ? "miniBusiness" : "ltd_company",
        ) && isValid;

      if (!radioSelections.question5) {
        setErrors((prev) => ({
          ...prev,
          new_residential_address: "This Field is required",
        }));
        isValid = false;
      } else if (radioSelections.question5 === "yes") {
        isValid =
          Validation(
            questionData.miniBusiness.new_residential_address,
            isValid,
            "new_residential_address",
            companyType === "business_name" ? "miniBusiness" : "ltd_company",
          ) && isValid;
      } else {
        setErrors((prev) => ({ ...prev, new_residential_address: "" }));
      }
    } else if (companyType === "ltd_company") {
      // isValid =
      //   Validation(questionData.rcNumber, isValid, "rcNumber") && isValid;
      // isValid =
      //   Validation(questionData.company_name, isValid, "company_name") &&
      //   isValid;
      isValid = Validation(
        questionData.ltd_company.rcQuestion1,
        isValid,
        "rcQuestion1",
        companyType === "ltd_company" ? "ltd_company" : "miniBusiness",
      );

      isValid = Validation(
        questionData.ltd_company.rcQuestion3,
        isValid,
        "rcQuestion3",
        companyType === "ltd_company" ? "ltd_company" : "miniBusiness",
      );

      isValid = Validation(
        questionData.ltd_company.rcQuestion4,
        isValid,
        "rcQuestion4",
        companyType === "ltd_company" ? "ltd_company" : "miniBusiness",      );

      if (!radioSelections.question2) {
        setErrors((prev) => ({ ...prev, agm_date: "This Field is required" }));
        isValid = false;
      } else if (radioSelections.question2 === "yes") {
        isValid =
          Validation(
            questionData.ltd_company.agm_date,
            isValid,
            "agm_date",
            companyType === "ltd_company" ? "ltd_company" : "miniBusiness",
          ) && isValid;
      } else {
        setErrors((prev) => ({ ...prev, agm_date: "" }));
      }

      if (!radioSelections.question5) {
        setErrors((prev) => ({
          ...prev,
          issued_shared_capital: "This Field is required",
        }));
        isValid = false;
      } else if (radioSelections.question5 === "yes") {
        isValid =
          Validation(
            questionData.ltd_company.issued_shared_capital,
            isValid,
            "issued_shared_capital",
            companyType === "ltd_company" ? "ltd_company" : "miniBusiness",
          ) && isValid;

        // setErrors((prev) => ({ ...prev, issued_shared_capital: "" }));
      } else {
        setErrors((prev) => ({ ...prev, issued_shared_capital: "" }));
      }

      if (!radioSelections.question6) {
        setErrors((prev) => ({
          ...prev,
          new_registered_address: "This Field is required",
        }));
        isValid = false;
      } else if (radioSelections.question6 === "yes") {
        isValid =
          Validation(
            questionData.ltd_company.new_registered_address,
            isValid,
            "new_registered_address",
            companyType === "ltd_company" ? "ltd_company" : "miniBusiness",
          ) && isValid;
      } else {
        setErrors((prev) => ({ ...prev, new_registered_address: "" }));
      }
    }

    if (isValid) {
      // Handle form submission for business
      // handleReset()

      try {
        setIsLoading(true);
        const res = await fetch("/api/v1/extract", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            BusinessDetails: {
              entity_type:
                companyType === "business_name"
                  ? "business_name"
                  : "ltd_company",
              answers:
                companyType === "business_name"
                  ? questionData.miniBusiness
                  : questionData.ltd_company,
              registration_number: regNumber,
            },
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === "SUCCESS" || data.code === 200) {
          console.log("Data sent successfully");
          setIsLoading(false);
          toast(data.message, {
            style: {
              backgroundColor: "green",
              boxShadow: "rgba 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "10px",
              fontFamily: "DMMono",
            },
          });
          navigate("/review");
        } else {
          setIsLoading(false);
          toast(data.message, {
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
      } catch (error) {
        if (error instanceof Error) {
          setIsLoading(false);
          toast("Failed to send your data. Please try again later.", {
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
  };
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-4">
        <CurrentTabNumber />
      </div>

      <main className="pt-10 px-5">
        <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
          Tell us about your{" "}
          {companyType === "business_name" ? "business" : "company"}
        </h1>

        <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
          We found this{" "}
          {companyType === "business_name" ? "business" : "company"} with{" "}
          {regNumber}.
        </p>

        <div className="max-w-2xl mx-auto mt-9 space-y-10 pb-5">
          {/* </div> */}
          <form className="space-y-8">
            {companyType === "ltd_company" ? (
              <>
                {/* <InputItem
                  name="rcNumber"
                  type="text"
                  title="RC Number"
                  placeholder="What is your RC Number"
                  value={questionData.rcNumber}
                  handleChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      rcNumber: e.target.value,
                    }))
                  }
                  errorMssg={errors.rcNumber}
                /> */}
                {/* <InputItem
                  name="company_name"
                  type="text"
                  title="Company Name"
                  placeholder="Your company name"
                  value={questionData.company_name}
                  handleChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      company_name: e.target.value,
                    }))
                  }
                  errorMssg={errors.company_name}
                /> */}
                <div className="space-y-4">
                  <RadioItem
                    name="question1"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Is the company a 'Small Company'?"
                    note="This affects specific exemptions under CAMA"
                    errorMssg={errors.ltd_company.rcQuestion1}
                    onRadioChange={(val) => {
                      setQuestionData((prev) => ({
                        ...prev,
                        rcQuestion1: val,
                      }));
                      setErrors((prev) => ({ ...prev, rcQuestion1: "" }));
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <RadioItem
                    name="question2"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Did your company hold an Annual General Meeting(AGM)?"
                    inputNote="If yes, select AGM date"
                    inputNoteType="date"
                    errorMssg={errors.ltd_company.agm_date}
                    value={questionData.ltd_company.agm_date}
                    handleChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        agm_date: e.target.value,
                      }))
                    }
                    onRadioChange={(val) => {
                      setRadioSelections((prev) => ({
                        ...prev,
                        question2: val,
                      }));
                      setErrors((prev) => ({ ...prev, agm_date: "" }));
                    }}
                  />
                </div>

                <div>
                  <RadioItem
                    name="question3"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Have there been any changes in directors during the year?"
                    note="Director/Secretary changes require Form CAC &A. Please update
                  CAC before filing annual return"
                    errorMssg={errors.ltd_company.rcQuestion3}
                    onRadioChange={(val) => {
                      setQuestionData((prev) => ({
                        ...prev,
                        rcQuestion3: val,
                      }));
                      setErrors((prev) => ({ ...prev, rcQuestion3: "" }));
                    }}
                  />
                </div>

                <div>
                  <RadioItem
                    name="question4"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Has the list of shareholders or their shareholdings changed?"
                    note="
                  Shareholding changes require separate filing. Please update
                  CAC before filing annual return"
                    errorMssg={errors.ltd_company.rcQuestion4}
                    onRadioChange={(val) => {
                      setQuestionData((prev) => ({
                        ...prev,
                        rcQuestion4: val,
                      }));
                      setErrors((prev) => ({ ...prev, rcQuestion4: "" }));
                    }}
                  />
                </div>
                <div>
                  <RadioItem
                    name="question5"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Have the issued shared capital changed?"
                    inputNote="New share capital number"
                    inputNoteType="number"
                    errorMssg={errors.ltd_company.issued_shared_capital}
                    value={questionData.ltd_company.issued_shared_capital}
                    handleChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        issued_shared_capital: e.target.value,
                      }))
                    }
                    onRadioChange={(val) => {
                      setRadioSelections((prev) => ({
                        ...prev,
                        question5: val,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        issued_shared_capital: "",
                      }));
                    }}
                  />
                </div>

                <div>
                  <RadioItem
                    name="question6"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Has the company issued any new shares during the year?"
                    inputNote="New registered address"
                    inputNoteType="text"
                    errorMssg={errors.ltd_company.new_registered_address}
                    value={questionData.ltd_company.new_registered_address}
                    handleChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        new_registered_address: e.target.value,
                      }))
                    }
                    onRadioChange={(val) => {
                      setRadioSelections((prev) => ({
                        ...prev,
                        question6: val,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        new_registered_address: "",
                      }));
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {/* <InputItem
                  name="bnNumber"
                  type="text"
                  title="BN Number"
                  placeholder="What is your Business Number"
                  value={questionData.bnNumber}
                  handleChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      bnNumber: e.target.value,
                    }))
                  }
                  errorMssg={errors.bnNumber}
                />
                <InputItem
                  name="proprietor_name"
                  type="text"
                  title="Full Name of Proprietor"
                  placeholder="Your business name"
                  value={questionData.proprietor_name}
                  handleChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      proprietor_name: e.target.value,
                    }))
                  }
                  errorMssg={errors.proprietor_name}
                /> */}
                <fieldset className="flex flex-col space-y-3">
                  <label
                    htmlFor="business_nature"
                    className="text-sm text-gray-600 font-[ClashDisplay] font-bold tracking-wider"
                  >
                    Nature of Business
                  </label>
                  <textarea
                    name="business"
                    placeholder="Brief description of the nature of business"
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16A34A] font-[Onest] resize-none"
                    rows={4}
                    value={questionData.miniBusiness.business_nature}
                    onChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        miniBusiness: {
                          ...prev.miniBusiness,
                          business_nature: e.target.value,
                        },
                      }))
                    }
                  />
                  {/* {errorMssg && */}
                  <p className="text-red-500 text-sm mt-1.5 font-[DMMono]">
                    {errors.miniBusiness.business_nature}
                  </p>
                  {/* } */}
                </fieldset>
                <RadioItem
                  name="question5"
                  type="radio"
                  title_1="Yes"
                  title_2="No"
                  questionTitle="Has the proprietor's residential address changed since last filing?"
                  inputNote="New Residential Address"
                  inputNoteType="text"
                  errorMssg={errors.miniBusiness.new_residential_address}
                  value={questionData.miniBusiness.new_residential_address}
                  handleChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      new_residential_address: e.target.value,
                    }))
                  }
                  onRadioChange={(val) => {
                    setRadioSelections((prev) => ({ ...prev, question5: val }));
                    setErrors((prev) => ({
                      ...prev,
                      new_residential_address: "",
                    }));
                  }}
                />

                <RadioItem
                  name="question6"
                  type="radio"
                  title_1="Yes"
                  title_2="No"
                  questionTitle="Have you made any other changes to business particulars with CAC this year?"
                  note="Please complete updates via CAC portal first. Then return here."
                  errorMssg={errors.miniBusiness.bnQuestion6}
                  onRadioChange={(val) => {
                    setQuestionData((prev) => ({
                      ...prev,
                      bnQuestion6: val,
                    }));
                    setErrors((prev) => ({ ...prev, bnQuestion6: "" }));
                  }}
                />
              </>
            )}

            <div className="mt-7 flex justify-between items-center">
              <NavigateBack pathname="verification" />
              {companyType === null ? (
                <button
                  type="button"
                  className="bg-green-600 text-white flex gap-2 items-center rounded-sm px-4 py-2 opacity-30 cursor-not-allowed"
                >
                  Continue
                  <span>&rarr;</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-green-600 text-white flex gap-2 items-center rounded-sm px-4 py-2 cursor-pointer"
                  onClick={handleNext}
                >
                  Continue
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
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

export default Question;
