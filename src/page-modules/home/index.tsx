import { useEffect, useState } from "react";
import Dropdown from "@/components/input/dropdown";
import Button from "@/components/button";
import LoanDescription from "./loan-description";
import CibilReport from "./cibil-report";
import CrifReport from "./crif-report";
import Uploader from "@/components/input/uploader";
import AccAggregator from "./acc-aggregator";

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// Define the types for each product's details
interface LoanProductDetails {
  Description: string;
  // eslint-disable-next-line
  [key: string]: any; // Add an index signature for the nested keys
}

// Define the overall structure of loan products
interface LoanProducts {
  [key: string]: LoanProductDetails;
}

import loanProducts from "@/config/loan-products.json" assert { type: "json" };

const Home = () => {
  const loanProductKeys = Object.keys(loanProducts as LoanProducts);
  const [selectedLoanProduct, setSelectedLoanProduct] = useState("");
  const [applyClick1, setApplyClick1] = useState(false);

  const [cibilComplete, setCibilComplete] = useState(false);
  const [crifComplete, setCrifComplete] = useState(false);
  const [accAggComplete, setAccAggComplete] = useState(false);

  const [applyClick2, setApplyClick2] = useState(false);

  // eslint-disable-next-line
  const [propertyReportFile, setProperyReportFile] = useState<File | undefined>(
    undefined,
  );

  useEffect(() => {
    if (applyClick1) {
      setApplyClick1(false);
    }
  }, [selectedLoanProduct]);
  return (
    <div className="w-full bg-white overflow-x-hidden min-h-[90vh] p-6 sm:p-10 flex gap-10">
      <div className="w-full flex sm:rounded-xl overflow-hidden sm:shadow-xl sm:border-2 border-gray-100 gap-4 items-center sm:p-6">
        <div className="w-full lg:w-[50%] h-full flex flex-col gap-4">
          <Dropdown
            options={loanProductKeys}
            selected={selectedLoanProduct}
            setSelected={setSelectedLoanProduct}
            selectPlaceholder={"Select Loan Product"}
            disabled={applyClick2}
          />
          {selectedLoanProduct !== "" &&
            loanProductKeys.includes(selectedLoanProduct) && (
              <div className="w-full lg:hidden h-fit max-h-[70vh] rounded-lg border border-gray-200 overflow-y-scroll overflow-x-hidden">
                <LoanDescription
                  data={
                    loanProducts[
                      selectedLoanProduct as keyof typeof loanProducts
                    ]
                  }
                  title={selectedLoanProduct}
                />
              </div>
            )}
          {selectedLoanProduct === "" && (
            <div className="w-full flex my-auto items-center justify-center text-center">
              Select Loan Product to apply and submit required documents
            </div>
          )}
          {selectedLoanProduct !== "" && !applyClick1 && (
            <div className="w-full hidden lg:flex my-auto items-center justify-center text-center">
              Apply to submit required documents
            </div>
          )}
          {!applyClick1 && (
            <Button
              className="uppercase"
              fullWidth
              color={selectedLoanProduct === "" ? "graySolid" : "primarySolid"}
              disabled={selectedLoanProduct === ""}
              onClick={() => setApplyClick1(true)}
            >
              Apply Loan
            </Button>
          )}

          {applyClick1 && (
            <>
              <AccAggregator
                processComplete={accAggComplete}
                setProcessComplete={setAccAggComplete}
              />
              <div className="w-full rounded-lg border-2 border-gray-200 p-2 text-neutral-500 font-bold text-lg lg:text-xl flex flex-col gap-4">
                <div className="p-2 pb-0">Property Valuation Report</div>
                <Uploader
                  setFile={(file) => {
                    setProperyReportFile(file);
                  }}
                  disabled={applyClick2}
                />
              </div>
              <CibilReport
                processComplete={cibilComplete}
                setProcessComplete={setCibilComplete}
              />
              <CrifReport
                processComplete={crifComplete}
                setProcessComplete={setCrifComplete}
              />
            </>
          )}
          {applyClick1 && !applyClick2 && (
            <Button
              className="uppercase"
              fullWidth
              color={
                propertyReportFile !== undefined &&
                accAggComplete &&
                cibilComplete &&
                crifComplete
                  ? "primarySolid"
                  : "graySolid"
              }
              disabled={
                !(
                  propertyReportFile !== undefined &&
                  accAggComplete &&
                  cibilComplete &&
                  crifComplete
                )
              }
              onClick={() => setApplyClick2(true)}
            >
              Apply Loan
            </Button>
          )}

          {applyClick1 && applyClick2 && (
            <>
              <div className="my-4 text-lg lg:text-xl text-primary-500 uppercase font-bold tracking-widest w-full text-center">
                Application Submitted
              </div>
              <Button
                fullWidth
                color="blueSolid"
                className="flex gap-2 items-center justify-center"
              >
                <div>Generated Loan Application</div>
                <ArrowDownTrayIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <div className="w-full rounded-lg border-2 border-gray-200 py-4 px-6 flex flex-col gap-4 font-semibold text-lg lg:text-xl text-neutral-500">
                <div className="flex items-center gap-2">
                  <div>Chance of Approval -</div>
                  <div>80%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div>Time to Disbursal -</div>
                  <div>3 weeks*</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-[50%] hidden lg:block h-full rounded-lg border border-gray-200 overflow-y-scroll overflow-x-hidden">
          {selectedLoanProduct === "" && (
            <div className="w-full h-full flex items-center justify-center text-center">
              Select Loan Product to view details
            </div>
          )}
          {selectedLoanProduct !== "" &&
            loanProductKeys.includes(selectedLoanProduct) && (
              <LoanDescription
                data={
                  loanProducts[selectedLoanProduct as keyof typeof loanProducts]
                }
                title={selectedLoanProduct}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
