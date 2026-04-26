import CurrentTabNumber from "../../components/CurrentTabNumber";
import { NavigateBack, NavigateNext } from "../../components/NavigateItem";
interface DetailsProp {
  title: string;
  desc: string;
}

function Details({ title, desc }: DetailsProp) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <h1 className="font-[Nunito] text-xl text-gray-800">{title}</h1>

      <span className="font-[Onest] text-lg text-gray-700">{desc}</span>
    </div>
  );
}

export default function Verification() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <CurrentTabNumber />

        <main className="pt-10">
          <h1 className="text-4xl text-center font-[Nunito] font-semibold text-gray-900">
            Let's verify your company
          </h1>

          <p className="text-gray-500 text-center font-[Onest] mt-2 text-lg">
            We found this company with RC: "number".
          </p>
          <div className="max-w-2xl mx-auto mt-12">
            <section className=" space-y-3">
              <Details title="Company Name" desc="Your company name" />
              <Details title="BN Number" desc="Your BN Number" />
              <Details title="Company Type" desc="Your Company Type" />
              <Details title="Registration Date" desc="Date of registration" />
              <Details title="status" desc="Active" />
              <Details
                title="Registration Address"
                desc="Your Registration address"
              />
            </section>

            <div className="mt-7 flex justify-between items-center">
              <NavigateBack pathname="registration" />
              <NavigateNext pathname="question" />
            </div>

            <div className="flex flex-col text-center mt-10 bg-gray-300 rounded-lg space-y-0.5 p-2 font-[Onest]">
              <span className="underline text-red-800 cursor-pointer">
                Not my Company
              </span>
              <span>Can't find your company?</span>
              <span>Check your BN number and try again.</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
