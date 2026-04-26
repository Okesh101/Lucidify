import React, { useReducer } from "react";
import CurrentTabNumber from "../../components/CurrentTabNumber";
import RadioItem from "../../components/RadioItem";
import InputItem from "../../components/InputItem";
import { NavigateBack, NavigateNext } from "../../components/NavigateItem";

type Mode = "business" | "company";
type Action = { type: "business" } | { type: "company" };

function reducer(mode: Mode, action: Action) {
  switch (action.type) {
    case "business":
      return "business";
    case "company":
      return "company";

    default:
      return mode;
  }
}
const Question = () => {
  const [mode, dispatch] = useReducer(reducer, "");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <CurrentTabNumber />
      </div>

      <main className="pt-10">
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
              onClick={() => dispatch({ type: "business" })}
            >
              Business
            </button>
            <button
              className="border outline-gray-600 rounded-lg font-[Nunito] px-3 py-2 text-sm cursor-pointer"
              onClick={() => dispatch({ type: "company" })}
            >
              Private Company Limited
            </button>
          </div>
          {/* </div> */}
          <form className="space-y-8">
            {mode === "" ? (
              <span className="text-gray-700 flex justify-center mx-auto p-5 rounded-lg mt-10 text-shadow-xs text-shadow-black font-[Nunito] text-2xl">
                Please Select Your business type
              </span>
            ) : mode === "company" ? (
              <>
                <InputItem
                  name="rcNumber"
                  type="text"
                  title="RC Number"
                  placeholder="What is your RC Number"
                />
                <InputItem
                  name="company_name"
                  type="text"
                  title="Company Name"
                  placeholder="Your company name"
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
                />
                <InputItem
                  name="proprietor_name"
                  type="text"
                  title="Full Name of proprietor"
                  placeholder="Your company name"
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
                  />
                </fieldset>
                <RadioItem
                  name="question5"
                  type="radio"
                  title_1="Yes"
                  title_2="No"
                  questionTitle="Has the proprietor's residential address changed since last filing?"
                  inputNote="New Residential Address"
                  inputNoteType="text"
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
              <NavigateNext pathname="review" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Question;
