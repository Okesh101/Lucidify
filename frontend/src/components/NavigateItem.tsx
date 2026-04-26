import { useNavigate } from "react-router-dom";

type ItemProp = {
  pathname: string;
};

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

// export default [{"NavigateBack":NavigateBack}, NavigateNext]
