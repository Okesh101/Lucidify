import { useState } from "react";

interface ItemProp {
  name: string;
  type: string;
  title_1: string;
  title_2: string;
  errorMssg?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRadioChange?: (value: string) => void;
  questionTitle: string;
  note?: string;
  inputNote?: string;
  inputNoteType?: string;
}
const RadioItem = ({
  name,
  type,
  title_1,
  title_2,
  errorMssg,
  handleChange,
  value,
  onRadioChange,
  questionTitle,
  note,
  inputNote,
  inputNoteType,
}: ItemProp) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>("");

const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const radioValue = e.target.value;

  setSelected(radioValue);
  setShowMessage(radioValue === "yes");
  setShowInput(radioValue === "yes" && Boolean(inputNote));
  
  if(onRadioChange) {
    onRadioChange(radioValue);
  }
};
  return (
    <div className="space-y-2">
      <h1 className="space-x-3 font-[Nunito] text-lg">
        <span>{questionTitle}</span>
      </h1>
      <fieldset className="flex flex-col space-y-3">
        <div className="space-x-2">
          <input
            type={type}
            name={name}
            value="yes"
            onChange={handleRadioChange}
            className="border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
          />
          <label htmlFor={name} className="font-[Onest]">
            {title_1}
          </label>
        </div>

        <div className="space-x-2">
          <input
            type={type}
            name={name}
            value="no"
            onChange={handleRadioChange}
            className="border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
          />
          <label htmlFor={name} className="font-[Onest]">
            {title_2}
          </label>
        </div>
      </fieldset>

      {showMessage ? (
        <span className="font-[Nunito] text-gray-800 mt-2">{note}</span>
      ) : null}

      {showInput ? (
        <div className="flex flex-col">
          <span className="font-[Nunito] text-gray-800 mt-2">{inputNote}</span>
          <input
            type={inputNoteType || "text"}
            className="mt-1 p-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16A34A] font-[Onest]"
            value={value || ""}
            onChange={handleChange}
          />

          {errorMssg && <p className="text-red-500 text-sm mt-1.5 font-[DMMono]">{errorMssg}</p> }
        </div>
      ) : null}
    </div>

    //   {errorMssg && <p className="text-red-500 text-sm mt-1.5 font-[DMMono]">{errorMssg}</p> }
  );
};

export default RadioItem;
