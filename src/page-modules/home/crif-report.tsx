import React, { useState } from "react";
import BottomSheet from "@/components/bottomsheet/bottom-sheet";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Dropdown from "@/components/input/dropdown";
import AnchorLink from "@/components/links";

interface CrifReportProps {
  processComplete: boolean;
  setProcessComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const namePrefixes = ["Mr", "Mrs", "Miss"];
const idTypes = [
  "PAN",
  "VoterID",
  "Passport",
  "Driving License",
  "Ration Card",
];

const CrifReport: React.FC<CrifReportProps> = ({
  processComplete,
  setProcessComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [namePrefix, setNamePrefix] = useState("Mr");
  const [idType, setIdType] = useState("PAN");
  const [idValue, setIdValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [tncCheck, setTncCheck] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [fetchClick, setFetchClick] = useState(false);

  const [otpVal, setOtpVal] = useState("");

  const ValidateForm = () => {
    if (
      name === "" ||
      idValue === "" ||
      mobileNumber === "" ||
      emailId === "" ||
      !tncCheck
    )
      return false;
    if (isNaN(Number(mobileNumber))) return false;
    return true;
  };

  const handleFetch = () => {
    if (!ValidateForm()) {
      setErrorMsg("All fields are required!");
      setFetchClick(false);
      setProcessComplete(false);
      return;
    }
    setErrorMsg("");
    setFetchClick(true);
  };

  const handleOtpSubmit = () => {
    setProcessComplete(true);
  };

  return (
    <>
      {!processComplete && (
        <div className="w-full rounded-lg border-2 border-gray-200 py-2 px-6 text-neutral-500 font-bold text-lg lg:text-xl flex items-center justify-between">
          <div>CRIF Report</div>
          <Button onClick={() => setIsOpen(true)}>Fetch</Button>
        </div>
      )}
      {processComplete && (
        <div className="w-full rounded-lg border-2 border-gray-200 py-2 px-6 text-neutral-500 flex flex-col gap-2">
          <div className="flex items-center justify-between font-bold text-lg lg:text-xl">
            <div>CRIF Report</div>
            <div className="text-neutral-500 uppercase font-bold text-base lg:text-lg tracking-wider">
              SCORE: <span className="text-green-600">650</span>{" "}
            </div>
          </div>
          <AnchorLink
            href="#"
            className="text-primary-500 text-base lg:text-lg"
          >
            Report-{name.replace(" ", "_").replace(".", "_")}
          </AnchorLink>
        </div>
      )}
      <BottomSheet
        isOpen={processComplete ? false : isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex flex-col gap-1 lg:gap-3 p-4 max-h-[95vh] lg:w-[40vw] overflow-y-scroll">
          <div className="text-xl lg:text-2xl font-bold text-neutral-500 mb-4 pb-2 border-gray-300 border-b-2 border-dashed">
            Fetch CRIF Report
          </div>

          {!fetchClick && (
            <>
              {/* name feild */}
              <div className="text-sm lg:text-base text-neutral-400">
                Full Name* (Legal name)
              </div>
              <div className="flex items-center gap-4 w-full">
                <Dropdown
                  className="text-base lg:text-base 3xl:text-base w-[8rem]"
                  selected={namePrefix}
                  setSelected={setNamePrefix}
                  options={namePrefixes}
                  dropdownHeight="fit-content"
                />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name here"
                  inputClassName="!h-full"
                  className="flex-grow"
                />
              </div>

              {/* id type feild */}
              <div className="text-sm lg:text-base text-neutral-400">
                ID Type*
              </div>
              <Dropdown
                className="text-base lg:text-base 3xl:text-base w-[15rem]"
                selected={idType}
                setSelected={setIdType}
                options={idTypes}
                dropdownHeight="fit-content"
              />

              {/* id value feild */}
              <div className="text-sm lg:text-base text-neutral-400">
                ID Value*
              </div>
              <Input
                value={idValue}
                onChange={(e) => setIdValue(e.target.value)}
                placeholder="Enter your ID value here"
                inputClassName="!h-full"
                className="w-full"
              />

              {/* mobile number feild */}
              <div className="text-sm lg:text-base text-neutral-400">
                Mobile Number*
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="text-lg lg:text-xl text-neutral-400">+91</div>
                <Input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder=""
                  inputClassName="!h-full"
                  className="w-full"
                />
              </div>

              {/* email feild */}
              <div className="text-sm lg:text-base text-neutral-400">
                E-Mail ID*
              </div>
              <Input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email id here"
                inputClassName="!h-full"
                className="w-full"
              />

              {/* terms and conditions */}
              <div
                className="flex disable-text-select items-center text-lg lg:text-xl gap-2 w-full py-4 cursor-pointer"
                onClick={() => setTncCheck(!tncCheck)}
              >
                <Input
                  type="checkbox"
                  inputClassName="!w-4 !h-4 lg:!w-5 lg:!h-5 !rounded-sm lg:!rounded-md accent-primary-500"
                  checked={tncCheck}
                  onChange={() => {}}
                />
                <div className="ml-2">I agree to</div>
                <div className="text-primary-500 hover:underline">
                  Terms & Conditions
                </div>
                *
              </div>

              {errorMsg !== "" && (
                <div className="text-error-500 text-sm lg:text-base">
                  {errorMsg}
                </div>
              )}
              <Button onClick={handleFetch} fullWidth>
                Fetch
              </Button>
            </>
          )}
          {fetchClick && (
            <div className="flex flex-col gap-3">
              <div className="text-base lg:text-lg text-neutral-500">
                OTP sent on mobile number (+91 {mobileNumber}) /email ({emailId}
                )
              </div>
              <Input
                value={otpVal}
                onChange={(e) => setOtpVal(e.target.value)}
                placeholder=""
                inputClassName="!h-full"
                className="w-full"
              />
              <Button onClick={handleOtpSubmit} fullWidth>
                Submit
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
};

export default CrifReport;
