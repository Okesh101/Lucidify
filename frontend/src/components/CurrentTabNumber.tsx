const steps = ["Type", "Questions", "Verification", "Review"];

export default function CurrentTabNumber() {
  const currentStep = 1;

  return (
    <header className="flex mx-auto">
      {steps.map((step, index) => (
        <div key={index} className=" w-full">

          {/* STEP */}
          <div className="flex items-center">
            <div
              className={`w-10 h-10 flex font-[Onest] items-center justify-center rounded-full text-lg font-medium
              ${index + 1 <= currentStep 
                ? "bg-green-600 text-white" 
                : "bg-gray-200 text-gray-500"}`}
            >
              {index + 1}
            </div>


          {/* LINE */}
            {index < steps.length - 1 && (
                <div className="flex-1 w-60 h-0.5 mx-4">
                    <div
                        className={`h-full bg-gray-200 transition-all ${
                        index + 1 < currentStep ? "w-full" : ""
                        }`}
                    />
                </div>
            )}
            
           
          </div>
           <p className="text-sm mt-2 ml-1 font-[Nunito] font-semibold text-gray-600">{step}</p>
        </div>
      ))}
    </header>
  );
}