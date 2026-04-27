import { useLocation } from "react-router-dom";

const steps = [
  {title: "Type", pathname: "/registration"},
  {title: "Verification", pathname: "/verification"},
  {title: "Questions", pathname: "/question"},
  {title: "Review", pathname: "/review"}
];

export default function CurrentTabNumber() {

  const location = useLocation()
  const currentStep = 1;
  return (
  <header className="flex mx-auto w-full max-w-3xl px-4">
  {steps.map((step, index) => (
    <div key={index} className="flex flex-col items-center flex-1">

      {/* STEP */}
      <div className="flex items-center w-full">
        <div
          className={`w-8 h-8 md:w-10 md:h-10 flex font-[Onest] items-center justify-center rounded-full text-sm md:text-lg font-medium
          ${location.pathname === step.pathname
            ? "bg-green-600 text-white" 
            : "bg-gray-200 text-gray-500"}
          `}
        >
          {index + 1}
        </div>

        {/* LINE */}
        {index < steps.length - 1 && (
          <div className="flex-1 h-0.5 mx-2 md:mx-3">
            <div
              className={`h-full bg-gray-200 transition-all ${
                index + 1 < currentStep ? "w-full" : "w-full"
              }`}
            />
          </div>
        )}
      </div>

      <p className="text-xs md:text-sm mt-2 font-[Nunito] font-semibold text-gray-600 text-center">
        {step.title}
      </p>
    </div>
  ))}
</header>
  );
}