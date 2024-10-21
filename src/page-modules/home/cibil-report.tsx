import React, { useState } from "react";
import BottomSheet from "@/components/bottomsheet/bottom-sheet";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Dropdown from "@/components/input/dropdown";

// eslint-disable-next-line
interface CibilReportProps {}

const namePrefixes = ["Mr", "Mrs", "Miss"];
const idTypes = [
  "PAN",
  "VoterID",
  "Passport",
  "Driving License",
  "Ration Card",
];

const CibilReport: React.FC<CibilReportProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [namePrefix, setNamePrefix] = useState("Mr");
  const [idType, setIdType] = useState("PAN");
  const [idValue, setIdValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [tncCheck, setTncCheck] = useState(false);

  return (
    <>
      <div className="w-full rounded-lg border-2 border-gray-200 py-2 px-6 text-neutral-500 font-bold text-lg lg:text-xl flex items-center justify-between">
        <div>CIBIL Report</div>
        <Button onClick={() => setIsOpen(true)}>Generate</Button>
      </div>
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col gap-1 lg:gap-3 p-4 max-h-[95vh] lg:w-[40vw] overflow-y-scroll">
          <div className="text-xl lg:text-2xl font-bold text-neutral-500 mb-4">
            Generate CIBIL Report
          </div>

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
          <div className="text-sm lg:text-base text-neutral-400">ID Type*</div>
          <Dropdown
            className="text-base lg:text-base 3xl:text-base w-[15rem]"
            selected={idType}
            setSelected={setIdType}
            options={idTypes}
            dropdownHeight="fit-content"
          />

          {/* id value feild */}
          <div className="text-sm lg:text-base text-neutral-400">ID Value*</div>
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
          </div>

          <Button fullWidth>Generate</Button>
        </div>
      </BottomSheet>
    </>
  );
};

export default CibilReport;
