import { useNavigate } from "react-router-dom";

type ItemProp = {
  pathname: string;
};

// JSX component for the navigation of the back button
export const NavigateBack = ({ pathname }: ItemProp) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex gap-2 items-center border border-gray-500 rounded-sm px-4 py-1 cursor-pointer"
      onClick={() => navigate(`/${pathname}`)}
    >
      <span>&larr;</span>
      Back
    </button>
  );
};

// JSX component for the navigation of the next button
export const NavigateNext = ({ pathname }: ItemProp) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="bg-green-600 text-white flex gap-2 items-center rounded-sm px-4 py-2 cursor-pointer"
      onClick={() => navigate(`/${pathname}`)}
    >
      Continue
      <span>&rarr;</span>
    </button>
  );
};

// Function to handle navigation for the next button without JSX
export function HandleNavigateNext({ pathname }: ItemProp) {
  // Using the useNavigate hook to programmatically navigate to the specified pathname
  const navigate = useNavigate();
  
  navigate(`/${pathname}`)
};

// export default [{"NavigateBack":NavigateBack}, NavigateNext]
