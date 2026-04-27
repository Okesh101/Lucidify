import  { useReducer, useState } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import RadioItem from "../../components/RadioItem";
import InputItem from "../../components/InputItem";
import { HandleNavigateNext, NavigateBack } from "../../components/NavigateItem";
import toast from "react-hot-toast";

type Mode = "business" | "company" | "none";
type Action = { type: "business" } | { type: "company" } | { type: "none" };
interface formProp {
  bnNumber: string;
  proprietor_name: string;
  business_nature: string;
  new_residential_address: string;
  rcNumber: string;
  company_name: string;
  agm_date: string;
  issued_shared_capital: string;
  new_registered_address: string
}

function reducer(mode: Mode, action: Action) {
  switch (action.type) {
    case "business":
      return "business";
    case "company":
      return "company";
    case "none":
      return "none";
    default:
      return mode;
  }
}

const Question = () => {
  const [mode, dispatch] = useReducer(reducer, "none");
  const [errors, setErrors ] = useState<formProp>({
    bnNumber: "",
    proprietor_name: "",
    business_nature: "",
    new_residential_address: "",
    rcNumber: "",
    company_name: "",
    agm_date: "",
    issued_shared_capital: "",
    new_registered_address: ""
  })
  const [questionData, setQuestionData ] = useState<formProp>({
    bnNumber: "",
    proprietor_name: "",
    business_nature: "",
    new_residential_address: "",
    rcNumber: "",
    company_name: "",
    agm_date: "",
    issued_shared_capital: "",
    new_registered_address: ""
  })
  const [radioSelections, setRadioSelections] = useState<{[key: string]: string}>({
    question2: "",
    question5: "",
    question6: ""
  })

  function Validation(name: string, isValidFlag: boolean, fieldName: string){
    let isValid = isValidFlag;
    if(!name.trim()){
      setErrors(prev => ({...prev, [fieldName]: "This Field is required"}))
      isValid = false
    } else {
      setErrors(prev => ({...prev, [fieldName]: ""}))
    }
    // returning the isValid flag to be used in form submission
    return isValid;
  }

  const handleNext= async() => {
    let isValid = true;
    if(mode === 'business'){
      isValid = Validation(questionData.bnNumber, isValid, 'bnNumber') && isValid
      isValid = Validation(questionData.proprietor_name, isValid, 'proprietor_name') && isValid
      isValid = Validation(questionData.business_nature, isValid, 'business_nature') && isValid
      if(radioSelections.question5 === 'yes') {
        isValid = Validation(questionData.new_residential_address, isValid, 'new_residential_address') && isValid
      }
    } else if(mode === 'company') {
      isValid = Validation(questionData.rcNumber, isValid, 'rcNumber') && isValid
      isValid = Validation(questionData.company_name, isValid, 'company_name') && isValid
      if(radioSelections.question2 === 'yes') {
        isValid = Validation(questionData.agm_date, isValid, 'agm_date') && isValid
      }
      if(radioSelections.question5 === 'yes') {
        isValid = Validation(questionData.issued_shared_capital, isValid, 'issued_shared_capital') && isValid
      }
      if(radioSelections.question6 === 'yes') {
        isValid = Validation(questionData.new_registered_address, isValid, 'new_registered_address') && isValid
      }
    }

    if(isValid){
      // Handle form submission for business
      handleReset()

      try {
        const res = await fetch("/api/v1/extract", {
          method:'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"BusinessDetails": questionData})
        })
        const data = await res.json()
        console.log(data)
        HandleNavigateNext({pathname: "review"})
      } catch (error) {
        if (error instanceof Error) {
        toast("Failed to send your data. Please try again later.", {
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
  }

  function handleReset() {
    setErrors({
      bnNumber: "",
      proprietor_name: "",
      business_nature: "",
      new_residential_address: "",
      rcNumber: "",
      company_name: "",
      agm_date: "",
      issued_shared_capital: "",
      new_registered_address: ""
    })
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10 px-4">
        <CurrentTabNumber />
      </div>

      <main className="pt-10 px-5">
        <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
          Tell us about your company
        </h1>

        <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
          We found this company with RC: "number".
        </p>

        <div className="max-w-2xl mx-auto mt-12 space-y-10 pb-5">
          <div className="flex gap-3 ">
            <button
              className="bg-green-600 rounded-lg font-[Nunito] text-white px-3 py-2 text-sm cursor-pointer"
              onClick={() => {dispatch({ type: "business" }); handleReset()}}
            >
              Business
            </button>
            <button
              className="border outline-gray-600 rounded-lg font-[Nunito] px-3 py-2 text-sm cursor-pointer"
              onClick={() => {dispatch({ type: "company" }); handleReset()}}
            >
              Private Company Limited
            </button>
          </div>
          {/* </div> */}
          <form className="space-y-8">
            {mode === "none" ? (
              <span className="text-gray-700 flex justify-center mx-auto md:p-5 rounded-lg mt-10 text-shadow-xs text-shadow-black font-[Nunito] text-lg md:text-2xl">
                Please Select Your business type
              </span>
            ) : mode === "company" ? (
              <>
                <InputItem
                  name="rcNumber"
                  type="text"
                  title="RC Number"
                  placeholder="What is your RC Number"
                  value={questionData.rcNumber}
                  handleChange={(e) => setQuestionData(prev => ({...prev, rcNumber: e.target.value}))}
                  errorMssg={errors.rcNumber}
                />
                <InputItem
                  name="company_name"
                  type="text"
                  title="Company Name"
                  placeholder="Your company name"
                  value={questionData.company_name}
                  handleChange={(e) => setQuestionData(prev => ({...prev, company_name: e.target.value}))}
                  errorMssg={errors.company_name}
                />
                <div className="space-y-4">
                  <RadioItem
                    name="question1"
                    type="radio"
                    title_1="Yes"
                    title_2="No"
                    questionTitle="Is the company a 'Small Company'?"
                    note="This affects specific exemptions under CAMA"
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
                    errorMssg={errors.agm_date}
                    value={questionData.agm_date}
                    handleChange={(e) => setQuestionData(prev => ({...prev, agm_date: e.target.value}))}
                    onRadioChange={(val) => setRadioSelections(prev => ({...prev, question2: val}))}
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
                    errorMssg={errors.issued_shared_capital}
                    value={questionData.issued_shared_capital}
                    handleChange={(e) => setQuestionData(prev => ({...prev, issued_shared_capital: e.target.value}))}
                    onRadioChange={(val) => setRadioSelections(prev => ({...prev, question5: val}))}
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
                    errorMssg={errors.new_registered_address}
                    value={questionData.new_registered_address}
                    handleChange={(e) => setQuestionData(prev => ({...prev, new_registered_address: e.target.value}))}
                    onRadioChange={(val) => setRadioSelections(prev => ({...prev, question6: val}))}
                  />
                </div>
              </>
            ) : (
              <>
                <InputItem
                  name="bnNumber"
                  type="text"
                  title="BN Number"
                  placeholder="What is your Business Number"
                  value={questionData.bnNumber}
                  handleChange={(e) => setQuestionData(prev => ({...prev, bnNumber: e.target.value}))}
                  errorMssg={errors.bnNumber}
                />
                <InputItem
                  name="proprietor_name"
                  type="text"
                  title="Full Name of proprietor"
                  placeholder="Your company name"
                  value={questionData.proprietor_name}
                  handleChange={(e) => setQuestionData(prev => ({...prev, proprietor_name: e.target.value}))}
                  errorMssg={errors.proprietor_name}
                />
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
                    value={questionData.business_nature}
                    onChange={(e) => setQuestionData(prev => ({...prev, business_nature: e.target.value}))}
                  />
                   {/* {errorMssg && */}
                    <p className="text-red-500 text-sm mt-1.5 font-[DMMono]">{errors.business_nature}</p> 
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
                  errorMssg={errors.new_residential_address}
                  value={questionData.new_residential_address}
                  handleChange={(e) => setQuestionData(prev => ({...prev, new_residential_address: e.target.value}))}
                  onRadioChange={(val) => setRadioSelections(prev => ({...prev, question5: val}))}
                />

                <RadioItem
                  name="question6"
                  type="radio"
                  title_1="Yes"
                  title_2="No"
                  questionTitle="Have you made any other changes to business particulars with CAC this year?"
                  note="Please complete updates via CAC portal first. Then return here."
                />
              </>
            )}

            <div className="mt-7 flex justify-between items-center">
              <NavigateBack pathname="verification" />
              {mode === 'none' ? (
                <button
                  type="button"
                  className='bg-green-600 text-white flex gap-2 items-center rounded-sm px-4 py-2 cursor-not-allowed'
                >
                  Continue
                  <span>&rarr;</span>
                </button>
              ) : (
                <button
                  type="button"
                  className='bg-green-600 text-white flex gap-2 items-center rounded-sm px-4 py-2 cursor-pointer'
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
    </div>
  );
};

export default Question;
