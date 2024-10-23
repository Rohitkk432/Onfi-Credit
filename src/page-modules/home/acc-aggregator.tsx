import React, { useState } from "react";
import BottomSheet from "@/components/bottomsheet/bottom-sheet";
import Button from "@/components/button";
import Input from "@/components/input/input";
import AnchorLink from "@/components/links";

// eslint-disable-next-line
interface AccAggregatorProps {
  processComplete: boolean;
  setProcessComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccAggregator: React.FC<AccAggregatorProps> = ({
  processComplete,
  setProcessComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [proteanId, setProteanId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [reqConsentClick, setReqConsentClick] = useState(false);
  const [consentRand, setConsentRand] = useState(0);

  const randConsentHandle = () => {
    setConsentRand(Math.round(Math.random() * 1000000));
  };

  const handleRequestConsent = () => {
    if (proteanId === "") {
      setErrorMsg("Enter Protean ID");
      setReqConsentClick(false);
      return;
    }
    if (!proteanId.endsWith("@protean")) {
      setErrorMsg("Protean ID ends with @protean");
      setReqConsentClick(false);
      return;
    }
    setErrorMsg("");
    randConsentHandle();
    setReqConsentClick(true);
  };

  const handleConsentAccept = () => {
    setProcessComplete(true);
  };

  return (
    <>
      {!processComplete && (
        <div className="w-full rounded-lg border-2 border-gray-200 py-2 px-6 text-neutral-500 font-bold text-lg lg:text-xl flex items-center justify-between">
          <div>Account Aggregator</div>
          <Button onClick={() => setIsOpen(true)}>Connect</Button>
        </div>
      )}
      {processComplete && (
        <div className="w-full rounded-lg border-2 border-gray-200 py-2 px-6 text-neutral-500 flex flex-col gap-2">
          <div className="flex items-center justify-between font-bold text-lg lg:text-xl">
            <div>Account Aggregator</div>
            <div className="text-success-700 uppercase font-bold text-base lg:text-lg tracking-wider">
              Connected
            </div>
          </div>
          <div className="text-base lg:text-lg text-neutral-400">
            ID: {proteanId}
          </div>
        </div>
      )}
      <BottomSheet
        isOpen={processComplete ? false : isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex flex-col gap-3 lg:gap-4 p-4 max-h-[95vh] lg:w-[40vw] overflow-y-scroll">
          <div className="text-xl lg:text-2xl font-bold text-neutral-500">
            Account Aggregator
          </div>
          <div className="flex flex-col gap-2 text-base lg:text-lg text-neutral-500 border-y-2  border-dashed border-gray-300 py-4">
            <div>
              Create account on{" "}
              <AnchorLink
                href="https://proteansurakshaa.in/signup"
                target="_blank"
                className="text-primary-500 font-bold"
              >
                Protean SurakshAA
              </AnchorLink>
            </div>
            <div>
              (formerly known as NSDL E-Governance Account Aggregator Limited)
            </div>
            <div>
              link your respective bank accounts, insurance policies, etc.
            </div>
            <AnchorLink
              href="https://proteansurakshaa.in/signup"
              target="_blank"
              className="w-fit"
            >
              <Button className="w-full sm:w-[15rem] mt-4">Create</Button>
            </AnchorLink>
          </div>
          <div className="flex flex-col gap-2 text-base lg:text-lg text-neutral-500 py-4">
            <div>If Account already exists</div>
            <Input
              placeholder="9999999999@protean"
              label="protean id"
              value={proteanId}
              onChange={(e) => setProteanId(e.target.value)}
            />
            {!reqConsentClick && (
              <>
                {errorMsg !== "" && (
                  <div className="text-error-500 text-sm lg:text-base">
                    {errorMsg}
                  </div>
                )}
                <Button
                  onClick={handleRequestConsent}
                  fullWidth
                  className="mt-4"
                >
                  Request Consent
                </Button>
              </>
            )}
            {reqConsentClick && (
              <div className="flex flex-col gap-2">
                <div className="text-sm lg:text-base text-neutral-500">
                  Consent Name: ICICI-AA-Consent-{consentRand}
                </div>
                <div className="text-sm lg:text-base text-neutral-500">
                  Approve consent on {` `}
                  <AnchorLink
                    href="https://proteansurakshaa.in/login"
                    target="_blank"
                    className="text-primary-500 font-bold"
                  >
                    Protean SurakshAA
                  </AnchorLink>
                  {` `} Dashboard
                </div>
                <div className="flex gap-2 mt-4">
                  <Button fullWidth onClick={handleRequestConsent}>
                    Request New Consent
                  </Button>
                  <Button
                    fullWidth
                    color="blueSolid"
                    onClick={handleConsentAccept}
                  >
                    Check Consent Accept
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* <Button fullWidth>Connect</Button> */}
        </div>
      </BottomSheet>
    </>
  );
};

export default AccAggregator;
